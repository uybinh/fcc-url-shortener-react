import React, { Component } from 'react';
import './app.css';

const OutputElement = (props) => {
  const { href } = window.location;
  const { output } = props;
  const shortUrl = output.short_url;
  const url = `${href}api/shorturl/${shortUrl}`;
  if (shortUrl) {
    return (
      <div id="output-result">
        <p>Shorten URL</p>
        <a href={url} alt={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </div>
    );
  }
  return <div id="output-result">Bad Request</div>;
};

export default class App extends Component {
  state = {
    input: '',
    output: null
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    const data = `url=${encodeURIComponent(input)}`;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'same-origin',
      body: data
    };
    fetch('/api/shorturl/new', fetchOptions)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          input: '',
          output: json
        });
      })
      .catch(err => console.log(err));
  };

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  };

  render() {
    const { input } = this.state;
    const { output } = this.state;
    return (
      <div className="container">
        <h2>API Project: URL Shortener Microservice</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="url">
            <p>Enter your url below</p>
            <input
              onChange={this.handleInputChange}
              type="text"
              name="url"
              id="url"
              value={input}
              required
            />
          </label>
          <button type="submit">Create link</button>
        </form>
        {output && <OutputElement output={output} />}
      </div>
    );
  }
}
