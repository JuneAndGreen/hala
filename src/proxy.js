'use strict';

const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

proxy.on('error', function(err, req, res) {
  // 处理代理错误信息
  if(err) {
    console.log(`代理请求错误，url为${req.url}`);
    console.log(err.stack);
  }
});

proxy.on('proxyReq', function(proxyReq) {
  // 追加头信息
  proxyReq.setHeader('X-Special-Proxy-Header', 'HALA');
});

module.exports = function(req, res, options) {
  options = options || {};  
  
  return proxy.web(req, res, options);
};
