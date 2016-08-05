#!/usr/bin/env node

'use strict';

if(process.version < 'v4.2.1') {
  console.log('node 版本太低！');
  process.exit(1);
}

const commander = require('commander');

commander
	.version(require('../package.json').version)

	.option('-p, --port <port>', '代理服务器端口，默认为8000', parseInt)
	.option('-c, --config [path]', '配置文件路径，默认取当前路径下的hala.js')
	.option('-w, --webroot [path]', '代理服务器的根目录，默认是process.cwd()')
	.option('-v, --viewroot [path]', '代理服务器的视图目录，默认是webroot的值')
	.option('-r, --resroot [path]', '代理服务器的资源目录，默认是webroot的值')
	.option('--no-launch', '是否要停止自动打开浏览器')

	.parse(process.argv)

	.once('done', () => {

	});