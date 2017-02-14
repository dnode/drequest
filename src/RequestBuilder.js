'use strict';

const Request = require('./Request');

class RequestBuilder {
  constructor() {
    this._names = [];
    this._options = {};
  }

  names(names) {
    this._names = this._names.concat(names);
    return this;
  }

  options(name, options) {
    this._options[name] = options;
    return this;
  }

  request(names = []) {
    const request = new Request();
    for (const name of this._names.concat(names)) {
      request.options(this._options[name]);
    }
    return request;
  }
}

module.exports = RequestBuilder;
