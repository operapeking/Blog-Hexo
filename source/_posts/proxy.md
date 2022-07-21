---
title: 为 git、npm、yarn 设置代理
date: 2022-05-24 22:56:32
categories:
  - 技术
tags:
  - git
  - nodejs
---
本文介绍了如何为 git、npm、yarn 设置代理。
<!-- more -->
## 添加代理

git
```bash
git config --global https.proxy 'http://127.0.0.1:10809'
git config --global https.proxy 'https://127.0.0.1:10809'
```

npm
```bash
# 设置代理
npm config set proxy="http://127.0.0.1:10809"
npm config set https-proxy="http://127.0.0.1:10809"

# 设置镜像源
npm config set registry "https://registry.npm.taobao.org/"
npm config set registry "https://registry.npmjs.org/"

```

yarn
```bash
# 设置代理
yarn config set proxy "http://127.0.0.1:10809"
yarn config set https-proxy "http://127.0.0.1:10809"

# 设置镜像源
yarn config set registry "https://registry.npm.taobao.org/"
yarn config set registry "https://registry.npmjs.org/"
```

## 查看代理

git
```bash
git config --list
```

npm
```bash
npm config get proxy
npm config get https-proxy
```

yarn
```bash
yarn config list
```

## 取消代理

git
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

npm
```bash
npm config delete proxy 
npm config delete https-proxy
```

yarn
```bash
yarn config delete proxy  
yarn config delete https-proxy
```