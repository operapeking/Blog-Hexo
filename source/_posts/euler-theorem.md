---
title: 欧拉定理
date: 2022-07-23 08:29:09
categories: 算法
tags:
  - 数学
---
欧拉定理的证明与应用。
<!--more-->

## 欧拉定理

若 $a$ 与 $n$ 互质，则 $a^{\varphi(n)} \equiv 1 \pmod n$，其中 $\varphi(n)$ 为关于 $n$ 的[欧拉函数](/2022/05/24/euler-totient-function/)，这就是**欧拉定理**。

若 $n$ 为质数，则 $a$ 与 $n$ 互质，根据上式得到： $a^{n - 1} \equiv 1 \pmod n$，也可以写成 $a^n \equiv a \pmod n$，这就是**费马小定理**。

## 证明

设 $r_1, r_2, \dots, r_{\varphi(p)}$ 为模 $p$ 意义下的一个[简化剩余系](/2022/07/23/congruence-modulo/#简化剩余系)，
因为 $a$ 与 $p$ 互质，根据简化剩余系的乘法封闭性

$$
r_1 r_2 \dots r_{\varphi(p)} \pmod p \newline
\equiv ar_1 ar_2 \dots ar_{\varphi(p)} \pmod p \newline
\equiv a^{\varphi(p)} r_1 r_2 \dots r_{\varphi(p)} \pmod p
$$

因此

$$
a^{\varphi(n)} \equiv 1 \pmod n
$$