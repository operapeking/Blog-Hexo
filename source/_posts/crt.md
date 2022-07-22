---
title: 中国剩余定理
date: 2022-07-22 07:47:20
categories: 算法
tags:
  - 数学
---
中国剩余定理 (Chinese Remainder Theorem, CRT) 的相关内容。
<!--more-->

设 $m_1, m_2, \dots, m_n$ 是两两互质的整数，$m = \prod_{i = 1}^n p_i, M_i = \frac{m}{p_i}$，$t_i$ 是同余方程 $M_i t_i \equiv 1 \pmod {p_i}$ 的一个解。

对于任意的 $n$ 个整数 $a_1, a_2, \dots, a_n$，方程组

$$
\begin{cases}
x &\equiv a_1 \pmod {p_1} \newline
x &\equiv a_2 \pmod {p_2} \newline
  &\vdots \newline
x &\equiv a_n \pmod {p_n} \newline
\end{cases}
$$

有整数解，为 $x = \sum_{i = 1}^n a_iM_it_i$。

## 证明

因为 $M_i t_i \equiv 1 \pmod {p_i}$，所以 $a_i M_i t_i \equiv a_i \pmod {p_i}$。设 $j \in [1, n],j \neq i$，因为 $M_i = \frac{m}{p_i}$，所以 $M_i \equiv 0 \pmod {p_j}$，即最后答案对所有方程组成立。

## 实现

$m, M_i$ 都可以直接算出，而 $t_i$ 是同余方程的解。

因为 $p$ 两两互质，所以 $M_i$ 与 $p_i$ 互质。由[裴蜀定理](/2022/07/21/gcd/#裴蜀定理（Bezout）)得

$$
M_ix + p_iy = \gcd(M_i, p_i) = 1
$$

即

$$
M_ix \equiv 1 \pmod {p_i} 
$$


因此只需通过[扩展欧几里得算法](/2022/07/21/gcd/#扩展欧几里得算法)求出 $x$。$x$ 即为 $t_i$ 的一个解。


[洛谷 P1495【模板】中国剩余定理（CRT）/ 曹冲养猪](https://www.luogu.com.cn/problem/P1495)
```cpp
#include <cstdio>

typedef long long ll;

const int N = 13;
ll n, p[N], a[N];
ll m = 1, M[N], t[N];
ll ans;

int main() {
  scanf("%lld", &n);
  for (int i = 1; i <= n; i++) {
    scanf("%lld %lld", &p[i], &a[i]);
    m *= p[i];
  }
  for (int i = 1; i <= n; i++) {
    M[i] = m / p[i];
    ll x, y;
    ExGcd(M[i], p[i], x, y);
    t[i] = x < 0 ? x + p[i] : x;
    ans += a[i] * M[i] * t[i];
  }
  printf("%lld\n", ans % m);
  return 0;
}
```