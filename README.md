[![Build Status](https://travis-ci.org/dnode/drequest.svg?branch=master)](https://travis-ci.org/dnode/drequest)
[![Dependency Status](https://david-dm.org/dnode/drequest/status.svg)](https://david-dm.org/dnode/drequest)
[![devDependency Status](https://david-dm.org/dnode/drequest/dev-status.svg)](https://david-dm.org/dnode/drequest?type=dev)

# Installation

`npm i --save drequest`


# Examples

## Simplest usage

```javascript
const Request = require('drequest').Request;

const response = 
  await new Request()
    .get('http://google.de');
```


## Set options for a request by a name

```javascript
const RequestBuilder = require('drequest').RequestBuilder;

const requestBuilder =
  new RequestBuilder()
    .setOptions('google', {
      url: 'http://google.de',
    });

const response = 
  await RequestBuilder.request('google')
    .send();
```


## Set options for all requests

```javascript
const RequestBuilder = require('drequest').RequestBuilder;

const google =
  new RequestBuilder({
    url: 'http://google.de',
  });

const response = 
  await google.request()
    .send();
```

## Define and use a class for more complex options

```javascript
const RequestBuilder = require('drequest').RequestBuilder;

const google =
  new RequestBuilder({
    url: 'http://google.de',
  });
    
class SearchOptions {
  constructor(q) {
    this.q = q;
  }
  
  toRequestOptions() {
    return {
      url: {
        path: '/search',
        query: {
          q: this.q,  
        },
      },
    };
  }
}

const response = 
  await google.request()
    .addOptions(new SearchOptions('how to use google search'))
    .send();
```
