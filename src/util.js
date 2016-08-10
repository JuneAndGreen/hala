'use strict';

/**
 * 工具包
 * @author: june_01
 */

const exec = require('child_process').exec;
const os = require('os');
const qrcode = require('qrcode-npm');

const _ = module.exports = {
  /**
   * 打开浏览器
   */
  openBrowser: function(url) {
    let map = {
      darwin: 'open',
      win32: 'start'
    };
    let opener = map[process.platform] || 'xdg-open';
    return exec(`${opener} ${url}`);
  },
  /**
   * 获取本地ip列表
   */
  getIPs: function() {
    let ifaces = os.networkInterfaces();
    let ips = [];
    for(let dev in ifaces) {
      ifaces[dev].forEach((details) => {
        if(details.family === 'IPv4' && details.address !== '127.0.0.1') {
          ips.push(details.address)
        }
      });
    }
    return ips;
  },
  /**
   * 获取二维码
   */
  getQRCode: function(content, start){
    let qr;
    if(!start) start = 2;
    try {
      qr = qrcode.qrcode(start, 'L');
      qr.addData(content || '');
      qr.make();
      return qr;
    } catch(err) {
      if(start > 8) {
        throw err;
      } else {
        return _.getQRCode(content, start + 2);
      }
    }
  },
  /**
   * 获取完整路径，针对koa
   */
  getFullUrl: function(ctx){
    return `${ctx.protocol}://${ctx.host}${ctx.url}`;
  }
};
