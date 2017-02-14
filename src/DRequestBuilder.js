'use strict';

const DRequest = require('./DRequest');

class DRequestBuilder {
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
    const request = new DRequest();
    for (const name of this._names.concat(names)) {
      console.log(name);
      request.options(this._options[name]);
    }
    return request;
  }
}

module.exports = DRequestBuilder;
