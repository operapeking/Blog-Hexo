---
title: 二项式定理
date: 2022-07-23 08:33:25
categories: 算法
tags:
  - 数学
---
二项式定理。
<!--more-->

一般地

$$
(x + y)^n = {n \choose 0} x^n y^0 + {n \choose 1} x^{n - 1} y^1 + \dots + {n \choose n} x^0 y^n \newline
= \sum_{k = 0}^n {n \choose k} x^k y^{n - k} 
$$

特殊地

$$
(1 + x)^n = \sum_{k = 0}^n {n \choose k} x^k
$$

其中

$$
{n \choose k} = \frac{n!}{k! (n - k)!}
$$