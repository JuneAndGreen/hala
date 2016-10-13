'use strict';

/**
 * 文件预览中间件
 * @author: june_01
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mime = require('mime');

const _ = require('./util');

// 预览文件模板
const tpl = fs.readFileSync(path.join(__dirname, './tpl/folder.html'), 'utf8');
const render = ejs.compile(tpl);

// 预览图片模板
const imgTpl = fs.readFileSync(path.join(__dirname, './tpl/imager.html'), 'utf8');
const imgRender = ejs.compile(imgTpl);

module.exports = function(obj) {
  return function*(next) {
    let webroot = obj.webroot;
    let port = obj.port;

    let pathname = this.path;
    let query = this.query;
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
      let images = [];
      // let video = [];
      let folders = [];

      let subs = fs.readdirSync(wholePath);

      subs.forEach((file) => {
        let filePath = path.join(wholePath, file);
        if(fs.statSync(filePath).isFile()) {
          // 文件
          files.push(file);

          if(/image/.test(mime.lookup(file))) {
            let imgPath = pathname[pathname.length - 1] === '/' ? `${pathname}${file}` : `${pathname}/${file}`
            images.push({
              name: file,
              path: imgPath
            });
          }
        }
        if(fs.statSync(filePath).isDirectory()) {
          // 文件夹
          folders.push(file);
        }
      });

      // 修复某些版本的node读取不了query.hasOwnProperty的问题
      query = Object.assign({}, query||{});
      
      let body = '';
      if(query.hasOwnProperty('img')) {
        // 图片预览
        let locals = {
          join: path.join,
          images,
          prevpath,
          pathname,
          port,
          wholePath
        };
        // 渲染页面
        body = imgRender(locals);
      } else {
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
      }

      // 返回页面
      this.set('Content-Type', 'text/html');
      this.set('Content-Length', Buffer.byteLength(body));
      this.body = body;
    }
  }
};
