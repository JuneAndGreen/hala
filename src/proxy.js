'use strict';

const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');

const httpsOptions = {
  ssl: {
  	key: fs.readFileSync(path.join(__dirname, './config/key.pem'), 'utf8'),
  	cert: fs.readFileSync(path.join(__dirname, './config/certificate.pem'), 'utf8')
  },
  secure: false // 为了使用自签名证书
};
const wsOptions = {
  ws: true
};
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

module.exports = {
	http(req, res, options) {
		options = options || {};  

		return proxy.web(req, res, options);
	},

	https(req, res, options) {
		options = Object.assign(options || {}, httpsOptions);  

		return proxy.web(req, res, options);
	},

  ws(req, socket, body, options) {
    options = Object.assign(options || {}, wsOptions); 

    return proxy.ws(req, socket, body, options); 
  },

  wss(req, socket, body, options) {
    options = Object.assign(options || {}, wsOptions, httpsOptions); 

    return proxy.ws(req, socket, body, options); 
  }
};
