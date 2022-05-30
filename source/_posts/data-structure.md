---
title: 数据结构
author: Mike
date: 2022-05-29 14:27:27
categories:
  - 算法
tags:
  - 数据结构
---
数据结构总结
<!-- more -->
## 分块

### 思考

大段维护，局部朴素。

能解决的问题：

- 区间加减操作（[一个简单的整数问题](https://www.acwing.com/problem/content/244/)）
- 区间查询众数（[蒲公英](https://www.luogu.com.cn/problem/P4168)）
- 对于特殊的题目（[磁力块](https://www.acwing.com/problem/content/252/)），可以采用分块思想：
    块与块之间按照一定规则排序，
    块内元素按照另一种规则排序，方便查找。

### 题目

#### [一个简单的整数问题](https://www.acwing.com/problem/content/244/)

分块模板题。
注意 `add[i]` 和 `sum[i]` 中只要有一个改变，另外一个必定改变。

#### [蒲公英](https://www.luogu.com.cn/problem/P4168)

题意：维护区间众数

思路：

分 $T$ 块元素，处理每两块元素之间的众数。
对于每一个询问 $l, r$ ，因为 $[L, R]$ 之间元素已经被预处理，暴力搜索 $[l, L]$ 和 $[R, r]$ 即可。

#### [磁力块](https://www.acwing.com/problem/content/252/)

思路：
整体按照距离排序，块内按照质量排序。
`bfs`，每次取出队头元素 $H$，找到一个位置 $k$ 使得 $[1, k - 1]$ 块元素距离均满足条件，$[k - 1, T]$ 块元素距离均不满足条件，将满足条件的元素入队，更新块头坐标（防止重复扫描），均摊复杂度 $O(1)$。

对于第 $k$ 块，暴力扫描即可。

#### [小z的袜子](https://www.luogu.com.cn/problem/P1494)

思路：
对询问分块（莫队算法），分成 $\sqrt{M}$ 块，块与块之间按照左端点升序排序，块内元素按照右端点升序排序。

考虑区间 $[l, r]$ 的总方案数为 $C_{r - l + 1}^{2}=(r - l + 1)\times (r - l)$ ，对于选中两只颜色为 $c$ 的袜子，方案数为 $C_{num[i]}^{2} = (num[i] - 1) \times num[i] \div 2$

故每次朴素处理块内第一个询问，以上一个询问为基础，移动指针 $[l,r]$ 即可。

## 线段树

### 思考

理解线段树修改和查询本质，根据需要维护的数据的性质，想方法直接或间接（思考其可以如何推到而来）维护。

或是换种角度思考，建立值域线段树维护。

### 题目

#### [你能回答这些问题吗](https://www.acwing.com/problem/content/description/246/)

题意：
求区间最大子段和，支持修改和查询操作。

思路：
维护 `dat, lx, rx, sum` 数组分别保存区间最大子段和，区间左侧最大子段和，区间右侧最大子段和，区间和。

`t[p].dat = max(t[lson].lx, t[rson].rx, t[lson].rx + t[rson].lx)`

`t[p].lx = max(t[lson].lx, t[lson].sum + t[rson].lx)`

`t[p].rx = max(t[rson].rx, t[rson].sum + t[lson].rx)`

#### [Hotel](https://www.acwing.com/problem/content/263/)

思路：
类似于最大子段和，也可以使用上题方法维护。

维护区间以左端为起点的最长空段的长度，以右端为起点的最长空段的长度。

最后用上二者更新区间最长空段即可。
