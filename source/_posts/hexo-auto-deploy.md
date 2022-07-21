---
title: Hexo 自动部署至 Github
date: 2022-07-21 07:38:26
categories: 技术
tags:
  - 博客
---
通过 Github Actions 实现自动更新博客。
<!-- more -->

## 配置密钥

### 在本地生成密钥对

```bash
ssh-keygen -f github-deploy-key -C "HEXO CI"
```

### 上传密钥

#### 将公钥（id_rsa.pub）上传至 xxx.github.io 对应的仓库，即放有网页文件的仓库。

打开**网页文件仓库**的 Settings 页面，点击左侧 Security 中的 Deploy keys，再点击 Add deploy key，将第一步生成的公钥（id_rsa.pub）内容放入 Key 中，设置 Title 为 `HEXO_DEPLOY_PUB` 便于管理。

![add-pubkey](./img/hexo-auto-deploy/add-pubkey.png)

#### 将私钥（id_rsa）上传至放有博客源码的仓库。

打开**博客源码仓库**的 Settings 页面，点击左侧 Security 中的 Secrets 中的 Actions，再点击 New repository secret，将第一步生成的私钥（id_rsa）内容放入 Value 中，设置 Name 为 `HEXO_DEPLOY_PRI`，后面会用到。

![add-prikey](./img/hexo-auto-deploy/add-prikey.png)

## 配置 hexo-deployer-git

将**博客源码仓库**克隆到本地，添加 hexo-deployer-git 模块。

```bash
npm install hexo-deployer-git --save
```

编辑 `_config.yml`。

```yml
deploy:
  type: git
  repo: <repository url> # 网页文件仓库的 url，如 https://github.com/username/username.github.io
  branch: <branch> # 网页文件仓库的 branch，如 main、master
```

## 配置 Github Action

打开**博客源码仓库**的 Actions 页面，点击 New Workflow。

![new-action](./img/hexo-auto-deploy/new-action.png)

再点击 `set up a workflow yourself`

![set-up-workflow](./img/hexo-auto-deploy/set-up-workflow.png)

将以下代码复制到网页的编辑器中并将 `blog_source_branch`、`username`、`username@email.address` 替换成自己的。

完成后点击 Start commit，保存修改。

```yml
name: HEXO CI

on:
  push:
    branches:
    - <blog_source_branch>

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v1

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}

      - name: Configuration environment
        env:
          HEXO_DEPLOY_PRI: ${{secrets.HEXO_DEPLOY_PRI}}
        run: |
          mkdir -p ~/.ssh/
          echo "$HEXO_DEPLOY_PRI" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          git config --global user.name "<username>"
          git config --global user.email "<username@email.address>"
      - name: Install dependencies
        run: |
          npm i -g hexo-cli
          npm i
      - name: Deploy hexo
        run: |
          hexo clean && hexo generate && hexo deploy
```

## 结束

每次 push 后 Github Action 会自动生成网页文件到对应仓库，生成状态可在**博客源码仓库**的 Actions 中查看。

![view-status](./img/hexo-auto-deploy/view-status.png)