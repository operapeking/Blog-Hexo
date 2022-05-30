---
title: 欧拉函数
date: 2022-05-24 20:30:03
categories:
  - 算法
tags:
  - 数学
---
欧拉函数（Euler's totient function），表示的是小于等于 n 和 n 互质的数的个数。
<!-- more -->
## 介绍

欧拉函数，即 $\varphi(n)$，表示的是小于等于 $n$ 和 $n$ 互质的数的个数。

比如说 $\varphi(1)=1$。

### 公式

设 $n = \prod_{i=1}^{s}p_i^{k_i}$，其中 $p_i$ 是质数，有
$$
\varphi(n) = n \times \prod_{i = 1}^s{\dfrac{p_i - 1}{p_i}}
$$

### 性质

* 当 $n$ 为质数时，$\varphi(n)=n-1$。
* 欧拉函数是积性函数。
