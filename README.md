### 本项目需要结合migu-api一起使用
[migu-api传送门](https://github.com/bigzjk/miguMusic-api/)
```
   下载咪咕api
   $ git clone https://github.com/bigzjk/miguMusic-api.git
```
### 启动步骤
```js
1. 运行migu-api,启动server服务，拿到接口数据
    cd miguMusic-api
    $ yarn 
    $ yarn run nodedev
2. 运行当前项目
    cd MMusic
    $ yarn
    $ yarn run dev
    
```
### 项目介绍

![首页](https://imgsa.baidu.com/forum/w%3D580%3B/sign=bb339ae5202eb938ec6d7afae5598435/9d82d158ccbf6c816fdeb5ecb33eb13532fa40cd.jpg)
![歌单详情](https://imgsa.baidu.com/forum/w%3D580/sign=2a6c56d9a464034f0fcdc20e9fc27980/c7433efbfbedab6462d8d5c4f836afc378311edc.jpg)
![搜索](https://imgsa.baidu.com/forum/w%3D580/sign=0f94b8fa39d3d539c13d0fcb0a86e927/38f9bcea15ce36d313471b3435f33a87e850b1c4.jpg)

```js
├── dist
├── node_modules
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   └── pages
│       ├── home
│       └── main
│       └── index.jsx
│       └── common.scss
│   └── utils
│       └── connect.ts
│       └── request.ts
├── package.json
├── webpack.config.dev.js
├── webpack.config.prod.js
 
手动搭建的webpack.config配置，坑多慢慢改🤣

使用了react的class组件和hooks组件
    
用到的技术大概有
webpack4
typescript
react16+
react-router
redux
react-redux
antd-mobile

```

### 目的
练习hooks和ts
