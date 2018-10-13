import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  componentDidMount() {
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({}));
  }

  render() {
    return (
      <div className="container">
        <h2>API Project: URL Shortener Microservice</h2>
        <form action="/api/shorturl/new" method="post">
          <label htmlFor="url">
            Enter url
            <input type="text" name="url" id="url" />
          </label>
          <input type="submit" value="Create link" />
        </form>
      </div>
    );
  }
}
