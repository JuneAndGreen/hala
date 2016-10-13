'use strict';

/**
* 包装并生成路由
* @author: june_01
*/

const Router = require('koa-router');

const proxy = require('./proxy');

const methodMap = {
	get: ['get'],
	post: ['post'],
	put: ['put'],
	delete: ['del'],
	patch: ['patch'],
	head: ['head'],
	all: ['get', 'post', 'put', 'del', 'patch', 'head']
};

// 获取url中的协议
const r = /(http|https)\:/g;
function getProtocol(url) {
	let arr = url.match(r);
	
	return arr&&arr[0];
}

module.exports = function getRouter(map) {
	let router = Router();
	let urls = Object.keys(map);
	for(let url of urls) {
		let func = map[url];

		const tmp = url.split(/\s+/);
		let realMethod = 'all';
		let realUrl = url;
		if(tmp.length >= 2) {
			realMethod = tmp[0].toLowerCase();
			realUrl = tmp[1];
		}

		let methods = methodMap[realMethod];

		for(let method of methods) {
			// 注册路由
			
			if(typeof func === 'string') {
				// 代理到其他服务器
				let host = func;
				func = function*(next) {
					this.respond = false;
					let protocol = getProtocol(host); // 获取host中已经带有的协议名

					if(this.protocol === 'http') {
						proxy.http(this.req, this.res, {
		          target: protocol ? host : `http://${host}`
		        });
					} else if(this.protocol === 'https') {
						proxy.https(this.req, this.res, {
		          target: protocol ? host : `https://${host}`
		        });
					}

				};
			}

			router[method](realUrl, function*(next) {
				let method = this.method.toUpperCase();
	      let url = this.url;

	      console.log(`访问了路由：${method} ${url}`);

				yield next;
			}, func);
		}
	}

	return router;
};
