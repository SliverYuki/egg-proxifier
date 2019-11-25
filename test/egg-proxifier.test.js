const mock = require('egg-mock')
const express = require('express')

function startProxyServer() {
  const app = express()

  app.get('/proxy1', (req, res) => {
    res.send('from proxy1')
  })

  const server = app.listen(3000)

  return server
}

describe('test/http-proxy.test.js', () => {
  let app
  let server

  before(() => {
    server = startProxyServer()
    app = mock.app({ baseDir: 'egg-proxy-test' })
    return app.ready()
  })

  after(() => {
    app.close()
    server.close()
  })

  afterEach(mock.restore)

  it('should target proxy1 with path rewrite', () => app.httpRequest()
    .get('/api/proxy1')
    .expect(200, 'from proxy1'))

  it('should proxy2 get 500', () => app.httpRequest()
    .get('/proxy2')
    .expect(404))
})
