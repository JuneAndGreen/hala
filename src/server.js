'use strict';

/**
 * 包装koa服务器
 * @author: june_01
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-body');
const staticDir = require('koa-static');
const render = require('koa-ejs');
const WebSocket = require('faye-websocket');

const wrapRouter = require('./router');
const folder = require('./folder');
const _ = require('./util');

class Server {
  constructor(config) {
    config = config || {};
    this.connection = [];

    this.config(config);
    this.init();
  }
  /**
   * 配置设置
   */
  config(config) {
    this.webroot = config.webroot || process.cwd();
    this.viewroot = path.join(this.webroot, config.viewroot || './');
    this.resroot = path.join(this.webroot, config.resroot || './');
    this.uploadroot = path.join(this.webroot, config.uploadroot || './');
    this.viewroot = path.join(this.webroot, config.viewroot || './');

    this.routes = config.routes || {};
    this.port = parseInt(config.port || 8000);
    this.launch = typeof config.launch === 'boolean' ? config.launch : true;

    this.https = !!config.https;
    this.ws = config.ws; // websocket
  }
  /**
   * 初始化
   */
  init() {
    this.app = koa();

    // 默认模板引擎是ejs
    render(this.app, {
      root: this.viewroot,
      layout: false,
      viewExt: 'ejs',
      cache: true,
      debug: false
    });

    // session 
    this.app.keys = ['june_01'];
    this.app.use(session(this.app));

    // 静态资源目录
    this.app.use(staticDir(this.resroot, {index: 'THIS_IS_THE_DEFAULT_FILE_NAME'}));

    // 请求参数解析
    let bodyOpt = {strict: false};
    let uploadDir = this.uploadroot;
    if(uploadDir) {
      // 存在文件上传的情况
      try {
        fs.accessSync(uploadDir);
      } catch(ex) {
        fs.mkdirSync(uploadDir);
      }

      bodyOpt = Object.assign({
        multipart: true,
        formidable:{uploadDir}
      }, bodyOpt);
    }
    this.app.use(bodyParser(bodyOpt));

    // 访问路由时产生的异常捕获
    let self = this;
    this.app.use(function*(next) {
      try {
        yield next;
      } catch(err) {
        this.onerror.call(self, err, this);
      }
    });

    // 路由
    if(typeof this.routes === 'object') {
      let route = wrapRouter.dealWithRouter(this.routes);
      this.app
        .use(route.routes())
        .use(route.allowedMethods());
    }

    // 没有对应路由时，返回当前文件夹
    this.app.use(folder({webroot: this.webroot, port: this.port}));

    // 异常捕获
    this.app.on('error', (err, ctx) => this.onerror(err, ctx));
  }
  /**
   * 监听
   */
  listen() {
    let server;

    if(this.https) {
      server = https.createServer({
        key: fs.readFileSync(path.join(__dirname, './config/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, './config/certificate.pem'), 'utf8')
      }, this.app.callback());
    } else {
      server = http.createServer(this.app.callback());
    }
    return server.listen.apply(server, arguments);
  }
  /**
   * 启动
   */
  start() {
    let port = this.port;
    console.log(`监听端口：${port}...`);
    this.server = this.listen(port);

    this.__reseting = false; // 重置完成

    // 异常捕获
    this.server.on('error', (err, ctx) => this.onerror(err, ctx));

    this.server.on('listening', () => {
      let url = `${this.https ? 'https' : 'http'}://localhost:${this.port}`;
      console.log(`代理服务器已成功启动，当前根路径为 ${url}`);
      // 自动打开浏览器
      if(this.launch) _.openBrowser(url);
    });

    this.server.on('close', (err) => {
      if(this.__isReset && !this.__reseting) {
        // 重置服务
        this.__isReset = false;

        if(err) {
          console.error('代理服务器重置失败，请使用ctrl+c关闭并重启')
          return process.exit(0);
        }

        console.log('正准备重置代理服务器...');
        this.__reseting = true;
        this.init();
        this.start();
      }
    });

    this.server.on('connection', (socket) => {
      this.connection.push(socket);
    });

    // websocket
    if(this.ws) {
      this.server.on('upgrade', (req, socket, body) => {
        if(!WebSocket.isWebSocket(req)) return;

        console.log('接收到来自客户端的WebSocket连接');

        if(typeof this.ws === 'string') {
          // 走代理的方式
          wrapRouter.dealWithWs(req, socket, body, this.ws);
        } else if(typeof this.ws === 'object') {
          let ws = new WebSocket(req, socket, body);

          ws.on('open', () => {this.ws.open&&this.ws.open.call(null, ws)});

          ws.on('message', (evt) => {this.ws.message&&this.ws.message.call(null, evt.data)});

          ws.on('close', (evt) => {
            this.ws.close&&this.ws.close.call(null, evt);
            ws = null;
          });
        }
      });
    }
  }
  /**
   * 重置
   */
  reset(config) {
    let socket;
    while(socket = this.connection.pop()) {
      socket.destroy();
    }

    this.__isReset = true;
    this.config(config);
    this.launch = false;

    if(this.server) this.server.close();
  }
  /**
   * 异常捕捉
   */
  onerror(err, ctx) {
    if(err.code === 'EADDRINUSE') {
      // 接口已被使用，尝试接口加一
      console.log(`端口 ${this.port} 已被占用，尝试新端口 ${++this.port}`);
      setTimeout(this.start.bind(this), 1000);
    } else {
      console.error(err.stack || err);
    }
  }
}

module.exports = Server;
