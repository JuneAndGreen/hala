#!/usr/bin/env node

'use strict';

/**
 * 命令行工具
 * @author: june_01
 */

const Hala = require('../index');

if(process.version < 'v4.4.0') {
  console.log('node版本太低，建议提升node版本到v4.4.0以上');
  process.exit(1);
}

const commander = require('commander');

commander
	.version(require('../package.json').version)

	.option('-p, --port <port>', '代理服务器端口，默认为8000', parseInt)
	.option('-c, --config [path]', '配置文件路径，默认取当前工作路径下的hala.js，此配置文件里的配置项优先级最高')
	.option('-w, --webroot [path]', '代理服务器的根目录，默认是process.cwd()')
	.option('-v, --viewroot [path]', '代理服务器的视图目录，默认是webroot的值')
	.option('-r, --resroot [path]', '代理服务器的资源目录，默认是webroot的值')
	.option('-u, --uploadroot [path]', '代理服务器的文件上传暂存目录，默认是webroot的值')
	.option('--no-launch', '是否要停止自动打开浏览器，默认为false')

	.parse(process.argv)

	.once('done', () => {
		let options = commander.config ? commander.config : commander;
		options.launch = !options.noLaunch;
		new Hala(options);
	});