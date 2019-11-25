const proxy = require('../../../../../index')

module.exports = () => proxy('/api', {
  target: 'http://localhost:3000',
  changeOrigin: true,
  rewrite: path => path.replace('/api', ''),
})
