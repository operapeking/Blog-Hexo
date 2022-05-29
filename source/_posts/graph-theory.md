---
title: 图论总结
date: 2022-05-29 17:46:00
categories: 算法
tags:
  - 图论
author: Mike
---
图论题目总结，
<!-- more -->

## 题目

[连续攻击游戏](https://www.luogu.com.cn/problem/P1640)
Tag：匈牙利算法

考虑匈牙利算法过程，从属性到装备连边，挨个枚举属性直到不能匹配为止，正确性显然。

[Cleaning Shifts S](https://www.luogu.com.cn/problem/P4644)
Tag：最短路算法

巧妙的建图。

将工作视为从开始时间到结束时间的边权为钱数的边，并将 $\forall i\in [M, E]$, $i$ 和 $i - 1$ 之间连上一条边权为 $0$ 的边。

然后跑一遍 `dijkstra` 就行了。
