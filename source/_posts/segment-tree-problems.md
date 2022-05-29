---
title: 线段树杂题
author: Mike
date: 2022-05-29 14:29:52
categories:
  - 算法
tags:
  - 数据结构
  - 线段树
---
一些线段树的题目，题目有“你能回答这些问题吗”、“Hotel”。
<!-- more -->
## 思考

理解线段树修改和查询本质，根据需要维护的数据的性质，想方法直接或间接（思考其可以如何推到而来）维护。

或是换种角度思考，建立值域线段树维护。

## 题目

### [你能回答这些问题吗](https://www.acwing.com/problem/content/description/246/)

题意：
求区间最大子段和，支持修改和查询操作。

思路：
维护 `dat, lx, rx, sum` 数组分别保存区间最大子段和，区间左侧最大子段和，区间右侧最大子段和，区间和。

`t[p].dat = max(t[lson].lx, t[rson].rx, t[lson].rx + t[rson].lx)`

`t[p].lx = max(t[lson].lx, t[lson].sum + t[rson].lx)`

`t[p].rx = max(t[rson].rx, t[rson].sum + t[lson].rx)`

### [Hotel](https://www.acwing.com/problem/content/263/)

思路：
类似于最大子段和，也可以维护上述变量。