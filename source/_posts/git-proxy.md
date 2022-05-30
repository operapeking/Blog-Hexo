---
title: Git 添加代理
date: 2022-05-24 22:56:32
categories:
  - 技术
tags:
  - git
---
本文介绍了如何给 Git 添加代理。
<!-- more -->
## 添加代理

```bash
git config --global https.proxy 'http://127.0.0.1:10809'
git config --global https.proxy 'https://127.0.0.1:10809'
```

```bash
git config --global http.proxy 'socks5://127.0.0.1:10808'
git config --global https.proxy 'socks5://127.0.0.1:10808'
```

## 查看代理

```bash
git config --list
```

## 取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```
