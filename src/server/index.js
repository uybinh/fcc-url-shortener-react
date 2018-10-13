require('dotenv').config();
require('./components/database');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator');
const ShortenUrlModel = require('./models/shortenurl');
const Rand = require('./components/random');

const PORT = process.env.PORT || 8080;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app
  .use(express.static(path.resolve(__dirname, '../../dist')))
  .listen(PORT, () => console.log(`App is listening on port ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/shorturl/new', urlencodedParser, async (req, res) => {
  const { url } = req.body;
  if (!validator.isURL(url)) {
    res.json({ error: 'invalid URL' });
    return;
  }
  const lastUrl = await ShortenUrlModel.getLastUrl();
  const key = lastUrl ? lastUrl.key + Rand(3) : Rand(3);
  const shortenUrl = await ShortenUrlModel.createNewUrlAndSave(key, url);
  res.status(201).json({
    original_url: shortenUrl.url,
    short_url: shortenUrl.hash
  });
});

app.get('/api/shorturl/:hash', async (req, res) => {
  const { hash } = req.params;
  const { url } = await ShortenUrlModel.getUrlByHash(hash);
  const redirectUrl = url.indexOf('http') === -1 ? `http://${url}` : url;
  res.status(302).redirect(redirectUrl);
});

app.get('/api/listallurls', async (req, res) => {
  res.json(await ShortenUrlModel.findAllUrls());
});

// respond status 404 with 'Not found' on other paths weren't catched by above routes
app.use((req, res) => {
  res
    .status(404)
    .type('text')
    .send('Not found');
});
