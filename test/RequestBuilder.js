'use strict';

/* eslint-env mocha */

const assert = require('assert');
const RequestBuilder = require('../src/RequestBuilder');

const defaultOptions = { timeout: 3000 };

describe('RequestBuilder.js', () => {
  it('should be empty if nothing is set', () => {
    const requestBuilder = new RequestBuilder();

    const actualA = requestBuilder.request().getOptions();
    const expectedA = {};
    assert.deepEqual(actualA, Object.assign({}, defaultOptions, expectedA));

    const actualB = requestBuilder.request().getOptions();
    const expectedB = {};
    assert.deepEqual(actualB, Object.assign({}, defaultOptions, expectedB));
  });

  it('should be able to handle options by name for one request', () => {
    const requestBuilder = new RequestBuilder().setOptions('google', {
      url: 'http://google.de',
    });

    const actualA = requestBuilder.request('google').getOptions();
    const expectedA = {
      url: 'http://google.de',
    };
    assert.deepEqual(actualA, Object.assign({}, defaultOptions, expectedA));

    const actualB = requestBuilder.request().getOptions();
    const expectedB = {};
    assert.deepEqual(actualB, Object.assign({}, defaultOptions, expectedB));
  });

  it('should be able to handle options set as default for all requests', () => {
    const requestBuilder = new RequestBuilder({
      url: 'http://google.de',
    });

    const actualA = requestBuilder.request().getOptions();
    const expectedA = {
      url: 'http://google.de',
    };
    assert.deepEqual(actualA, Object.assign({}, defaultOptions, expectedA));

    const actualB = requestBuilder.request().getOptions();
    const expectedB = {
      url: 'http://google.de',
    };
    assert.deepEqual(actualB, Object.assign({}, defaultOptions, expectedB));
  });
});
