---
title: 最大公因数
date: 2022-07-21 14:22:48
categories: 算法
tags:
- 数学
---

关于最大公因数的性质与求法。

<!--more-->

## 更相减损术

对于任意的整数 $a,b$ 并且 $a \ge b$，有 $\gcd(a, b) = \gcd(b, a - b) = \gcd(a, a - b)$。

相比于欧几里得算法，更相减损术可以方便的解决高精度最大公因数问题。

### 证明

对于 $a,b$ 的任意公因数 $d$，有 $d \mid a, d \mid b$，则 $d \mid (a - b)$。所以 $a, b$ 公因数的集合与 $a, a - b$ 公因数的集合相同，即 $\gcd(a, b) = \gcd(a, a - b)$。

## 欧几里得算法

对于任意的整数 $a$ 和不为 $0$ 的整数 $b$，有 $\gcd(a, b) = \gcd(b, a \bmod b)$

相比于更相减损术，欧几里得算法速度更快。

### 证明

若 $a < b$，则 $a = a \bmod b$，即 $\gcd(a, b) = \gcd(b, a)$。

若 $a \ge b$，令 $a = k \times b + r$，其中 $r \in [0, b)$。即 $r = a - k \times b = a \bmod b$。对于 $a,b$ 的任意公因数 $d$，有 $d \mid a, d \mid k \times b$，所以 $d \mid (a - k \times b)$，故 $d \mid r$，即 $d \mid a \bmod b$。所以 $a, b$ 公因数的集合与 $a, a \bmod b$ 公因数的集合相同，即 $\gcd(a, b) = \gcd(b, a \bmod b)$。

写成代码为

```cpp
int Gcd(int a, int b) {
  if (b == 0)
    return a;
  return Gcd(b, a % b);
}
```

## 裴蜀定理（Bezout）

设 $a, b$ 是不全为零的整数，则存在整数 $x, y$，使得 $a \times x + b \times y = \gcd(a, b)$。

### 证明

当 $b = 0$ 时，$a \times x + b \times 0 = a = \gcd(a, b)$。

当 $b \neq 0$ 时，因为 $\gcd(a, b) = \gcd(a, -b)$，不妨设 $b > 0$。假设存在一对整数 $x, y$，满足 $b \times x + (a \bmod b) \times y = \gcd(b, a \bmod b)$。因为 $b \times x + (a \bmod b) \times y = b \times x + (a - b \times \lfloor \frac{a}{b} \rfloor) \times y = a \times y + b \times (x - y \times \lfloor \frac{a}{b} \rfloor)$，令 $x' = y, y' = x - y \times \lfloor \frac{a}{b} \rfloor$，则有 $a \times x' + b \times y' = \gcd(a, b)$。

### 推论

- $a, b$ 互质的充分必要条件是存在整数 $x, y$，使得 $a \times x + b \times y = 1$ 。
- $a \times x + b \times y = c$ 有解的充分必要条件为 $\gcd(a, b) \mid c$。
- 设 $a_1, a_2, a_3, \dots, a_n$ 为 $n$ 个整数，$d$ 是它们的最大公因数，则存在 $x_1, x_2, x_3, \dots, x_n$，使得 $x_1 \times a_1 + x_2 \times a_2 + x_3 \times a_3 + \dots + x_n \times a_n = d$。

## 扩展欧几里得算法

根据裴蜀定理，可知

$$
\begin{cases}
  x'= y \newline
  y'= x - y \times \lfloor \frac{a}{b} \rfloor
\end{cases}
$$

写成代码为

```cpp
int ExGcd(int a, int b, int &x, int &y) {
  if (b == 0) {
    x = 1, y = 0;
    return a;
  }
  int gcd = Exgcd(b, a % b, x, y), tmp = x;
  x = y, y = tmp - y * (a / b);
}
```

也可以写成

```cpp
int ExGcd(int a, int b, int &x, int &y) {
  if (b == 0) {
    x = 1, y = 0;
    return a;
  }
  int gcd = Exgcd(b, a % b, y, x);
  y -= x * (a / b);
  return gcd;
}
```