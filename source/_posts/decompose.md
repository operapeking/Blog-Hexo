---
title: 分块
author: Mike
date: 2022-05-29 14:27:27
categories:
  - 算法
tags:
  - 数据结构
  - 分块
---
分块介绍。
<!-- more -->
## 思考

大段维护，局部朴素。

能解决的问题：

- 区间加减操作（[一个简单的整数问题](https://www.acwing.com/problem/content/244/)）
- 区间查询众数（[蒲公英](https://www.luogu.com.cn/problem/P4168)）
- 对于特殊的题目（[磁力块](https://www.acwing.com/problem/content/252/)），可以采用分块思想：
    块与块之间按照一定规则排序，
    块内元素按照另一种规则排序，方便查找。

## 题目

### [一个简单的整数问题](https://www.acwing.com/problem/content/244/)

### [蒲公英](https://www.luogu.com.cn/problem/P4168)

题意：维护区间众数

思路：

分 $T$ 块元素，处理每两块元素之间的众数。
对于每一个询问 $l, r$ ，因为 $[L, R]$ 之间元素已经被预处理，暴力搜索 $[l, L]$ 和 $[R, r]$ 即可。

### [磁力块](https://www.acwing.com/problem/content/252/)

思路：
整体按照距离排序，块内按照质量排序。
`bfs`，每次取出队头元素 $H$，找到一个位置 $k$ 使得 $[1, k - 1]$ 块元素距离均满足条件，$[k - 1, T]$ 块元素距离均不满足条件，将满足条件的元素入队，更新块头坐标（防止重复扫描），均摊复杂度 $O(1)$。

对于第 $k$ 块，暴力扫描即可。

### [小z的袜子](https://www.luogu.com.cn/problem/P1494)

思路：
对询问分块（莫队算法），分成 $\sqrt{M}$ 块，块与块之间按照左端点升序排序，块内元素按照右端点升序排序。

考虑区间 $[l, r]$ 的总方案数为 $C_{r - l + 1}^{2}=(r - l + 1)\times (r - l)$ ，对于选中两只颜色为 $c$ 的袜子，方案数为 $C_{num[i]}^{2} = (num[i] - 1) \times num[i] \div 2$

故每次朴素处理块内第一个询问，以上一个询问为基础，移动指针 $[l,r]$ 即可。