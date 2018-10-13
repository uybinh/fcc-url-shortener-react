const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const base62 = require("../components/base62");

const urlSchema = mongoose.Schema({
  key: Number,
  hash: String,
  url: { type: String, unique: true },
  createdAt: Date,
  updatedAt: Date
});

urlSchema.pre("save", function(next) {
  const now = Date.now();

  this.updatedAt = now;
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now;
  }
  // Call the next function in the pre-save chain
  next();
});

urlSchema.statics.getLastUrl = function() {
  return this.findOne({}).sort({ createdAt: -1 });
};

urlSchema.statics.getUrlByHash = async function(hash) {
  return this.findOne({ hash: hash })
    .then(doc => doc)
    .catch(err => console.log(err));
};

urlSchema.statics.createNewUrlAndSave = async function(key, url) {
  return this.findOne({ url: url }).then(urlInDatabase => {
    if (urlInDatabase) {
      return urlInDatabase;
    } else {
      const shortenUrl = new this({
        key: key,
        hash: base62.encode(key),
        url: url
      });
      return shortenUrl.save();
    }
  });
};

urlSchema.statics.findAllUrls = async function() {
  return this.find({});
};

module.exports = mongoose.model("ShortenUrl", urlSchema);
