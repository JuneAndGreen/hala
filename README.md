# hala

## 简介

不同于jtr，这是使用基于ES6和koa框架实现的一个通用本地模拟服务器，帮你快速生成一个简单易用的服务器。

## 安装

```
npm install -g hala
```

或

```
npm install hala
```

## 使用

### 命令行使用

全局安装完毕后，直接在命令行敲入`hala`即可开启一个当前以当前工作目录为根目录的简单服务器，更复杂的配置参数如下：

```
-p, --port <port>, 代理服务器端口，默认为8000
-c, --config [path], 配置文件路径，默认取当前工作路径下的hala.js，此配置文件里的配置项优先级最高
-w, --webroot [path], 代理服务器的根目录，默认是process.cwd()
-v, --viewroot [path], 代理服务器的视图目录，默认是webroot的值
-r, --resroot [path], 代理服务器的资源目录，默认是webroot的值
-u, --uploadroot [path], 代理服务器的文件上传暂存目录，默认是webroot的值
--no-launch, 是否要停止自动打开浏览器，默认为false
```

### 直接依赖使用

当使用非全局安装的话，通常是安装在`node_modules`目录下，你只需要通过`require('hala')`即可引入工具，具体使用方式如下：

```javascript
const Hala = require('hala');

new Hala(options);
```

或者

```javascript
const Hala = require('hala');

new Hala('./options.js'); // 配置文件路径，默认取当前工作路径下的hala.js，此配置文件里的配置项优先级最高
```

### 配置项

```javascript
module.exports = {
    port: 8000, // 代理服务器端口，默认为8000
    webroot: './', // 代理服务器的根目录，默认是process.cwd()
    viewroot: './views/', // 代理服务器的视图目录，默认是webroot的值
    resroot: './res/', // 代理服务器的资源目录，默认是webroot的值
    uploadroot: './uploads/', // 代理服务器的文件上传暂存目录，默认是webroot的值
    launch: true,  // 是否要自动打开浏览器，默认为true
    routes: {
        // 路由
        'GET /xxx/xxx': function*(next) {},
        'ALL /vvv/vvv': function*(next) {}
    }
};
```

关于路由函数可参阅[这里](https://github.com/guo-yu/koa-guide#应用上下文context)

## 协议

MIT