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

![MMusic](https://upload-images.jianshu.io/upload_images/10622208-3ddb1dc86bcf64df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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
