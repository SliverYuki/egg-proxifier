const httpProxy = require('http-proxy')
const pathMatch = require('path-match')

const proxy = httpProxy.createProxyServer()
const route = pathMatch({
  sensitive: false,
  strict: false,
  end: false,
})
const logger = ctx => {
  ctx.app.logger('%s - %s %s with headers %s', new Date().toLocaleString(), ctx.req.method, ctx.req.url, ctx.req.headers)
}

let eventRegistered = false

/**
 * @param {string} path - 匹配路径
 * @param {Object} options - 配置项，参考 https://github.com/http-party/node-http-proxy/blob/master/README.md#options
 * @param {function} options.rewrite - 参数为 path，用于对 path 进行操作
 * @param {Object}  options.events - proxy 事件，key 值为事件名,参考 https://github.com/http-party/node-http-proxy/blob/master/README.md#listening-for-proxy-events
 * @param {boolean} options.log - 是否开启日志打印
 */
module.exports = (path, options) => (ctx, next) => {
  const match = route(path)
  if (!match(ctx.path)) return next()

  let opts = { ...options }
  if (typeof options === 'function') {
    const params = match(ctx.path)
    opts = options.call(options, params)
  }

  const { log, rewrite, events } = opts

  if (log) logger(ctx)

  const httpProxyOpts = Object.keys(opts)
    .filter(n => ['rewrite', 'events'].indexOf(n) < 0)
    .reduce((prev, cur) => {
      prev[cur] = opts[cur]
      return prev
    }, {})

  return new Promise((resolve, reject) => {
    ctx.req.oldPath = ctx.req.url

    if (typeof rewrite === 'function') {
      ctx.req.url = rewrite(ctx.req.url, ctx)
    }

    if (events && typeof events === 'object' && !eventRegistered) {
      Object.entries(events).forEach(([event, handler]) => {
        proxy.on(event, handler)
      })
      eventRegistered = true
    }

    /**
     * 这里有一个 BUG (或许是文档错误) callback 实际上应该是 errorHandler
     * 在这里做了一点处理以让 promise 在 proxy.web 之后能正确的 resolve
     * https://github.com/nodejitsu/node-http-proxy/issues/951#issuecomment-179904134
     */
    ctx.res.on('close', () => {
      reject(new Error(`Http response closed while proxying ${ctx.req.oldPath}`))
    })

    ctx.res.on('finish', () => {
      resolve()
    })

    proxy.web(ctx.req, ctx.res, httpProxyOpts, e => {
      const status = {
        ECONNREFUSED: 503,
        ETIMEOUT: 504,
      }[e.code]
      ctx.status = status || 500
      resolve()
    })
  })
}

module.exports.proxy = proxy
