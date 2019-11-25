# Egg Proxifier

> [egg@2.x/next](https://github.com/eggjs/egg) middlware for http proxy

Powered by [`http-proxy`](https://github.com/nodejitsu/node-http-proxy).

Style Guide [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript).

## Installation

```bash
$ npm install koa-proxies --save
```

## Options

Supports all of [http-proxy options](https://github.com/http-party/node-http-proxy/blob/master/README.md#options)

**NOTE:**
`options.rewrite` - function, rewrite the `path`

### http-proxy events
Supports all of [http-proxy events](https://github.com/http-party/node-http-proxy/blob/master/README.md#listening-for-proxy-events)

```js
options.events = {
  error(err, req, res) { },
  proxyReq(proxyReq, req, res) { },
  proxyRes(proxyRes, req, res) { }
}
```

## Usage

```js
// middleware/http_proxy.js
const proxy = require('egg-proxifier')

module.exports = (options, app) => proxy('/proxy', {
  target: app.config.host,
  changeOrigin: true,
  rewrite: path => path.replace('/proxy', ''),
  events: {
    error(err, req, res) { },
    proxyReq(proxyReq, req, res) { },
    proxyRes(proxyRes, req, res) { }
  },
})
```

```js
// app.js
module.exports = app => {
  app.config.coreMiddleware.unshift('httpProxy')
  // ...
}
```
