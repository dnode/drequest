'use strict';

const Request = require('./Request');

class RequestBuilder {
  constructor() {
    this.names = [];
    this.options = {};
  }

  addNames(names) {
    this.names = this.names.concat(names);
    return this;
  }

  setOptions(name, options) {
    this.options[name] = options;
    return this;
  }

  request(names = []) {
    const request = new Request();
    for (const name of this.names.concat(names)) {
      request.addOptions(this.options[name]);
    }
    return request;
  }
}

module.exports = RequestBuilder;
