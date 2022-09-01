---
title: 主定理
date: 2022-09-01 16:24:34
categories: 算法
tags:
  - 数学
---
在演算法分析中，主定理（英语：master theorem）提供了用渐近符号（大O符号）表示许多由分治法得到的递推关系式的方法。
<!--more-->

假设有递推关系式

$$
T(n) = aT(\frac{n}{b}) + f(n^d)
$$

有

$$
T(n) =
\begin{cases}
O(n^d) && if \quad d > \log_ba
\\\\ O(n^d \log n) && if \quad d = \log_ba
\\\\ O(n^{\log_ba}) && if \quad d < \log_ba
\end{cases}
$$

其中，$n$ 为问题规模，$a$ 为递归的子问题数量，$\frac{n}{b}$ 为每个子问题的规模（假设每个子问题的规模基本一样），$f(n)$ 为递归以外进行的计算工作。