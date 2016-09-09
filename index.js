'use strict';

/**
 * 模块入口文件
 * @author: june_01
 */


const fs = require('fs');
const path = require('path');
const Server = require('./src/server');

class Hala {
  constructor(config) {
    this.config = config;
    this.canChange = true; // 是否触发重置服务操作

    this.init();
  }
  /**
   * 初始化
   */
  init() {
    let config = this.config;
    let configFilePath;

    // 传配置文件
    try {
      if(typeof config === 'string') {
        // 传配置文件路径
        configFilePath = config;
      } else if(config && typeof config.config === 'string') {
        // 取配置项中的config字段作为配置文件路径，用于命令行参数
        configFilePath = config.config;
      } else {
        // 如果没有配置项，直接找当前目录下的hala.js
        configFilePath = path.join(process.cwd(), './hala.js');
      } 

      let readConfig = require(configFilePath);
      config = typeof config === 'object' ? config : {};
      config = Object.assign(config, readConfig);
      delete require.cache[require.resolve(configFilePath)]; // 删掉配置缓存

      this.watch(configFilePath); // 监听配置文件的变化
    } catch(err) {
      console.log(err.stack);
      console.error('缺少相关配置文件，请确保当前目录下有hala.js文件，或者通过参数传入配置文件路径');
      process.exit(1);
    }

    this.server = new Server(config);
    this.server.start();
  }
  /**
   * 监听配置文件变化
   */
  watch(configFilePath) {
    try {
      console.log(`开始监听配置文件：${configFilePath}`);

      fs.watch(configFilePath, (event) => {
        if(event === 'change' && this.server && this.canChange) {
          console.log(`配置文件变化：${configFilePath}`);

          // 节流
          this.canChange = false;
          this.resetCanChange();

          var config = require(configFilePath);
          delete require.cache[require.resolve(configFilePath)]; // 删掉配置缓存

          this.server.reset(config);
        }
      });
    } catch(err) {
      console.error('监听配置文件变化异常，请查看配置文件是否正确');
    }
  }
  /**
   * 重置canChange标志变量
   */
  resetCanChange() {
    setTimeout(() => {
      this.canChange = true;
    }, 1000);
  }
}

module.exports = Hala;
