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
--https, 是否要切换成https服务，默认为false
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
    https: true, // 是否开启https服务器，默认为false
    routes: {
        // 路由
        'GET /xxx/xxx': function*(next) {},
        'ALL /vvv/vvv': function*(next) {},

        // 代理到其他服务器，默认代理地址协议和请求协议相同，如需要从https代理到http，请特别指明协议名
        'GET /yyy/yyy1': '1.1.1.1:8888',
        'GET /yyy/yyy2': 'yyy.com',
        'GET /yyy/yyy3': 'http://yyy.com'
    },
    ws: {
        open: (ws) => { 
            /* 建立连接，
               - ws为一个websocket对象实例
               - 调用ws.send(data)可发送消息给客户端
               - 调用ws.close(code, reason)可关闭连接 */ 
        },
        message: (data) => { 
            /* 接收到客户端发来的消息 */ 
        },
        close: (evt) => { 
            /* 连接关闭，
               - evt.code 状态码
               - event.reason是关闭原因 */ 
        }
    },
    //如果需要代理websocket，可直接传一个代理地址的string串进来。支持ws和wss协议，使用方式类似路由代理
    // ws: 'localhost:8888', 
};
```

关于路由函数可参阅[这里](https://github.com/guo-yu/koa-guide#应用上下文context)

## 协议

MIT