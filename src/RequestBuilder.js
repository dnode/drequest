'use strict';

const Request = require('./Request');

class RequestBuilder {
  constructor(defaultOptions) {
    this.defaultOptions = defaultOptions;
    this.options = {};
  }

  setOptions(name, options) {
    this.options[name] = options;
    return this;
  }

  request(names = []) {
    if (!Array.isArray(names)) {
      names = [names];
    }
    const request = new Request(this.defaultOptions);
    for (const name of names) {
      request.addOptions(this.options[name]);
    }
    return request;
  }
}

module.exports = RequestBuilder;
