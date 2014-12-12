# flux-dispatcher

A Flux dispatcher ready for action.

[![Dependency Status](https://david-dm.org/jedireza/flux-dispatcher.svg?theme=shields.io)](https://david-dm.org/jedireza/flux-dispatcher)
[![devDependency Status](https://david-dm.org/jedireza/flux-dispatcher/dev-status.svg?theme=shields.io)](https://david-dm.org/jedireza/flux-dispatcher#info=devDependencies)
[![Build Status](https://travis-ci.org/jedireza/flux-dispatcher.svg?branch=master)](https://travis-ci.org/jedireza/flux-dispatcher)


## Install

```js
$ npm install flux-dispatcher
```

Note: Your project should have it's own `flux` dependency installed. We depend
on `flux` via `peerDependencies`.

## Usage

```js
var myDispatcher = require('flux-dispatcher'); // that's us, such meta
var Constants = require('./Constants');
var ApiUtil = require('./ApiUtil');


var VIEW_ACTION = Constants.PayloadSources.VIEW_ACTION;
var SERVER_ACTION = Constants.PayloadSources.SERVER_ACTION;
var ActionTypes = Constants.ActionTypes;
var dispatch = myDispatcher.handleAction;


var Actions = {
    sendRequest: function (data) {

        dispatch(VIEW_ACTION, ActionTypes.SEND_REQUEST, data);

        var request = {
            method: 'POST',
            url: '/api/endpoint',
            data: data
        };

        ApiUtil(request, function (err, response) {

            dispatch(SERVER_ACTION, ActionTypes.RECEIVE_RESPONSE, response);
        });
    }
};


module.exports = Actions;
```


## API

#### `handleAction(source, type, data)`

This builds a payload and dispatches it. The payload will look like this:

```js
{
    source: source,
    action: {
      type: type,
      data: data
    }
}
```

#### `handleAction(type, data)`

If you don't pass a `source` argument, the payload will look like this:

```js
{
    action: {
      type: type,
      data: data
    }
}
```


## License

MIT


## Don't forget

What you create with `flux-dispatcher` is more important than `flux-dispatcher`.
