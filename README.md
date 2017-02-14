[![Dependency Status](https://david-dm.org/dnode/drequest/status.svg)](https://david-dm.org/dnode/drequest)
[![devDependency Status](https://david-dm.org/dnode/drequest/dev-status.svg)](https://david-dm.org/dnode/drequest?type=dev)

# Installation

`npm i --save drequest`


# Examples

## Simplest usage

```
const Request = require('drequest').Request;

const response = 
  await new Request()
    .options({
      url: 'http://google.de',
    })
    .send();
```


## Set options for a request by a name

```
const { Request, RequestBuilder } = require('drequest');

const requestBuilder =
  new RequestBuilder()
    .options('google', {
      url: 'http://google.de',
    });

const response = 
  await RequestBuilder.request('google')
    .send();
```


## Set options for all requests

```
const { Request, RequestBuilder } = require('drequest');

const requestBuilder =
  new RequestBuilder()
    .names('google')
    .options('google', {
      url: 'http://google.de',
    });

const response = 
  await RequestBuilder.request()
    .send();
```

## Define and use a class for more complex options

```
const { Request, RequestBuilder } = require('drequest');

const requestBuilder =
  new RequestBuilder()
    .names('google')
    .options('google', {
      url: {
        hostname: 'google.de',
        protocol: 'http',
      },
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
  await RequestBuilder.request()
    .options(new SearchOptions('how to use google search'))
    .send();
```
