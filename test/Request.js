'use strict';

/* eslint-env mocha */

const assert = require('assert');
const Request = require('../src/Request');

describe('Request.js', () => {
  it('should be empty if nothing is set', () => {
    const actual =
      new Request()
        .get();
    const expected = {};
    assert.deepEqual(expected, actual);
  });

  it('should be able to handle one simple options', () => {
    const actual =
      new Request()
        .options({
          url: 'http://google.de',
        })
        .get();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(expected, actual);
  });

  it('should be able to handle url object options', () => {
    const actual =
      new Request()
        .options({
          url: {
            hostname: 'google.de',
            protocol: 'http',
          },
        })
        .get();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(expected, actual);
  });

  it('should be able to handle object options', () => {
    const actual =
      new Request()
        .options({
          toRequestOptions: () => ({
            url: 'http://google.de',
          }),
        })
        .get();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(expected, actual);
  });

  it('should merge options with different attributes', () => {
    const actual =
      new Request()
        .options({
          method: 'post',
        })
        .options({
          url: 'http://google.de',
        })
        .get();
    const expected = { method: 'post', url: 'http://google.de' };
    assert.deepEqual(expected, actual);
  });

  it('should overwrite options with the same attributes and number values', () => {
    const actual =
      new Request()
        .options({
          number: 1,
        })
        .options({
          number: 2,
        })
        .get();
    const expected = { number: 2 };
    assert.deepEqual(expected, actual);
  });

  it('should overwrite options with the same attributes and string values', () => {
    const actual =
      new Request()
        .options({
          string: 'a',
        })
        .options({
          string: 'b',
        })
        .get();
    const expected = { string: 'b' };
    assert.deepEqual(expected, actual);
  });

  it('should concatenate options with the same attributes and array values', () => {
    const actual =
      new Request()
        .options({})
        .options({
          array: ['a'],
        })
        .options({
          array: ['b'],
        })
        .get();
    const expected = { array: ['a', 'b'] };
    assert.deepEqual(expected, actual);
  });
});
