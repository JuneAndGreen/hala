'use strict';

const httpProxy = require('http-proxy');

module.exports = function(req, res, options) {
  options = options || {};

  let server = httpProxy.createServer();
  server.on('error', function(err, req, res) {
    // 处理代理错误信息
    if(err && err.code === 'ECONNRESET') return res.send('end');
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('代理请求错误，url为' + req.url);
    }
  });
  server.on('proxyReq', function(proxyReq) {
    // 追加头信息
    proxyReq.setHeader('X-Special-Proxy-Header', 'HALA');
  });

  return server.web(req, res, options);
};
