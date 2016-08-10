'use strict';

/**
* 包装并生成路由
* @author: june_01
*/

const Router = require('koa-router');

const methodMap = {
	get: ['get'],
	post: ['post'],
	put: ['put'],
	delete: ['del'],
	patch: ['patch'],
	head: ['head'],
	all: ['get', 'post', 'put', 'del', 'patch', 'head']
};

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
