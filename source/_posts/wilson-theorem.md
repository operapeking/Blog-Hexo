---
title: 威尔逊定理
date: 2022-07-23 14:28:58
categories: 算法
tags:
  - 数学
---
威尔逊定理的证明。
<!--more-->

在初等数论中，威尔逊定理给出了判定一个自然数是否为质数的充分必要条件。即：当且仅当 $p$ 为质数时：

$$
(p - 1)! \equiv -1 \pmod p
$$

## 证明

### 充分性

若 $p$ 不为质数，在 $1 \sim p - 1$ 一定能找到两个数乘积为 $p$，因此 $(p - 1)! \equiv 0 \pmod p$，所以对于任意合数，定理均不成立。

### 必要性

若 $p$ 为质数，$p$ 的[简化剩余系](/2022/07/23/congruence-modulo/#简化剩余系)为 $A = \{1, 2, \dots, p - 1\}$。对于 $\forall i, j \in A$，有 $i \times j \equiv 1 \pmod p$（$i, j$ 互为逆元）。

只有 $x^2 \equiv 1 \pmod p$ 是例外，此时 $x$ 解得 $1$ 或 $p - 1$。

因此

$$
(p - 1)! \equiv 1 \times (p - 1) \equiv p - 1 \equiv -1 \pmod p
$$