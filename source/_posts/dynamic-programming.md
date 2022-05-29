---
title: 动态规划 Dynamic Programming
date: 2022-05-29 17:41:00
categories: 算法
tags:
  - 动态规划
author: Mike
---
动态规划总结
<!-- more -->

## 线性dp

### 思考

推解转移方程时的两种思路：

1. 如何计算出一个状态。
2. 当前状态可以更新后续哪些状态。

### 例题

#### [Mr's Young's Picture Permutation](https://www.acwing.com/problem/content/273/)

##### 思路

考虑将人按身高降序安排。

状态表示：$f[a_1][a_2][a_3][a_4][a_5]$ 表示第 `i` 排有 $a_i$ 个人。

状态转移：

$if (a_i < a_{i - 1}\ and\ a_i < N_i): $
$\ \ \ f[a_1]\dots f[a_i + 1]\dots f[a_5]+=f[a_1][a_2][a_3][a_4][a_5]$

初始化：
$f[0][0][0][0][0] = 1$

#### [LCIS](https://www.acwing.com/problem/content/274/)

思路：

综合 `LCS` 和 `LIS` 可以得出：

状态表示：`f[i][j]` 表示 $A[1 \sim i]$ 和以 $B[j]$ 结尾的 `LCIS`

转移方程：
$if (A[i] = B[j]) f[i][j] = \max_{1\le k\le j - 1,B_k < A_k}{\{f[i - 1][k]\}}$
$if (A[i] \neq B[j]) f[i][j] = f[i - 1][j]$

考虑到每次进行决策时 `i - 1` 始终不改变，造成了很多重复比较。

那么可以维护一个 `val` 当 $f[i][j] \to f[i][j + 1]$ 更新 `val` 的值。

时间复杂度：$O(N^2)$

#### [Making the Grade](https://www.acwing.com/problem/content/275/)
