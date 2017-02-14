'use strict';

const _ = require('lodash');
const rp = require('request-promise');
const URI = require('urijs');

class DRequest {
  constructor() {
    this._options = {};
  }

  options(options) {
    if (options.toDRequestOptions) {
      options = options.toDRequestOptions(this._options);
    }
    _.mergeWith(this._options, options, (to, from) => {
      if (_.isArray(from)) {
        if (!to) {
          to = [];
        }
        return to.concat(from);
      }
    });
    return this;
  }

  send() {
    const options = _.cloneDeep(this._options);
    if (typeof options.url === 'object') {
      const url = new URI(options.url);
      if (typeof options.url.query === 'object') {
        url.query(options.url.query);
      }
      if (typeof options.url.search === 'object') {
        url.search(options.url.search);
      }
      options.url = url.toString();
    }
    return rp(options);
  }
}

module.exports = DRequest;
