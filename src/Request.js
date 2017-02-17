'use strict';

const _ = require('lodash');
const rp = require('request-promise');
const URI = require('urijs');

class Request {
  constructor() {
    this.options = {};
  }

  addOptions(options) {
    if (options.toRequestOptions) {
      options = options.toRequestOptions(this.options);
    }
    _.mergeWith(this.options, options, (to, from) => {
      if (_.isArray(from)) {
        if (!to) {
          to = [];
        }
        return to.concat(from);
      }
    });
    return this;
  }

  getOptions() {
    const options = _.cloneDeep(this.options);
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
    return options;
  }

  send(path, options) {
    if (typeof path === 'object') {
      options = path;
      path = undefined;
    }
    if (options) {
      this.addOptions(options);
    }
    if (path) {
      this.addOptions({ url: { path } });
    }
    return rp(this.getOptions());
  }

  delete(path, options) {
    this.addOptions({ method: 'delete' });
    return this.send(path, options);
  }

  get(path, options) {
    this.addOptions({ method: 'get' });
    return this.send(path, options);
  }

  post(path, body, options) {
    this.addOptions({ method: 'post' });
    if (body) {
      this.addOptions({ body });
    }
    return this.send(path, options);
  }

  put(path, body, options) {
    this.addOptions({ method: 'put' });
    if (body) {
      this.addOptions({ body });
    }
    return this.send(path, options);
  }
}

module.exports = Request;
