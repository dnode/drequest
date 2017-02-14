[![Dependency Status](https://david-dm.org/dnode/drequest/status.svg)](https://david-dm.org/dnode/drequest)
[![devDependency Status](https://david-dm.org/dnode/drequest/dev-status.svg)](https://david-dm.org/dnode/drequest?type=dev)

# Installation

`npm i --save drequest`


# Examples

## Simplest usage

```
const DRequest = require('drequest').DRequest;

const response = 
  await new DRequest()
    .options({
      url: 'http://google.de',
    })
    .send();
```


## Set options for a request by a name

```
const { DRequest, DRequestBuilder } = require('drequest');

const dRequestBuilder =
  new DRequestBuilder()
    .options('google', {
      url: 'http://google.de',
    });

const response = 
  await DRequestBuilder.request('google')
    .send();
```


## Set options for all requests

```
const { DRequest, DRequestBuilder } = require('drequest');

const dRequestBuilder =
  new DRequestBuilder()
    .names('google')
    .options('google', {
      url: 'http://google.de',
    });

const response = 
  await DRequestBuilder.request()
    .send();
```

## Define and use a class for more complex options

```
const { DRequest, DRequestBuilder } = require('drequest');

const dRequestBuilder =
  new DRequestBuilder()
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
  
  toDRequestOptions() {
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
  await DRequestBuilder.request()
    .options(new SearchOptions('how to use google search'))
    .send();
```
