'use strict';

/**
 * 文件预览中间件
 * @author: june_01
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const _ = require('./util');

// 预览文件模板
const tpl = fs.readFileSync(path.join(__dirname, './tpl/folder.html'), 'utf8');
const render = ejs.compile(tpl);

module.exports = function(obj) {
  return function*(next) {
    let webroot = obj.webroot;
    let port = obj.port;

    let pathname = decodeURIComponent(this.path);
    let wholePath = path.join(webroot, pathname);
    let prevpath;

    if(pathname !== '/'){
      prevpath = pathname.replace(/\/[^\/]*\/?$/, '');
      prevpath = prevpath ? prevpath : '/';
    }

    let stat = fs.statSync(wholePath);
    if(!stat.isDirectory()) {
      // 非文件夹
      yield next;
    } else {
      // 访问文件夹
      console.log(`访问了文件夹：${wholePath}`);
      let files = [];
      let folders = [];

      let subs = fs.readdirSync(wholePath);

      subs.forEach((file) => {
        let filePath = path.join(wholePath, file);
        if(fs.statSync(filePath).isFile()) {
          // 文件
          files.push(file);
        }
        if(fs.statSync(filePath).isDirectory()) {
          // 文件夹
          folders.push(file);
        }
      });

      // 路径二维码
      var qrcode;
      try {
        qrcode = _.getQRCode(_.getFullUrl(this), 2).createImgTag(4);
      } catch(err) {
        qrcode = '';
      }
      
      let body = '';
      
      let locals = {
        join: path.join,
        files,
        folders,
        prevpath,
        pathname,
        port,
        wholePath,
        ips: _.getIPs(),
        qrcode: _.getQRCode(_.getFullUrl(this), 2).createImgTag(4)
      };
      // 渲染页面
      body = render(locals);

      // 返回页面
      this.set('Content-Type', 'text/html');
      this.set('Content-Length', Buffer.byteLength(body));
      this.body = body;
    }
  }
};
