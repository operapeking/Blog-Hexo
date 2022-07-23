---
title: 同余
date: 2022-07-23 09:32:24
categories: 算法
tags:
  - 数学
---
同余中的一些定义。
<!--more-->

## 同余

若整数 $a,b$ 除以正整数 $m$ 的余数相等，则称 $a,b$ 模 $m$ 同余，记作 $a \equiv b \pmod m$。

## 同余类

对于 $\forall a \in [0, m - 1]$，集合 ${a + km} (k \in Z)$ 的所有数模 $m$ 同余，余数为 $a$。该集合称作一个模 $m$ 的同余类，记作 $\overline a$。

## 剩余系

### 完全剩余系

模 $m$ 的同余类一共有 $m$ 个，分别为 $\overline 0, \overline 1, \dots, \overline{m - 1}$。它们构成 $m$ 的完全剩余系。

### 简化剩余系

$1 \sim m$ 中与 $m$ 互质的数所代表的同余类有 $\varphi(m)$ 个（见[欧拉函数](/2022/05/24/euler-totient-function/)），它们构成 $m$ 的简化剩余系。

#### 乘法封闭

简化剩余系关于模 $m$ 乘法封闭。因为若 $a, b (a \le m, b \le m)$ 与 $m$ 互质，则 $a \times b$ 与 $m$ 互质，即 $a \times b \bmod m$ 与 $m$ 互质。

因此 $a, b, a \times b \bmod m$ 都属于 $m$ 的简化剩余系。