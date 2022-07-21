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

## 公式

设 $n = \prod_{i=1}^{s}p_i^{k_i}$，其中 $p_i$ 是质数，有
$$
\varphi(n) = n \times \prod_{i = 1}^s{\frac{p_i - 1}{p_i}}
$$

### 证明

设 $p$ 是 $n$ 的质因子，$1 \sim n$ 中 $p$ 的倍数有 $p, 2p, 3p, \dots, \lfloor \frac{n}{p} \rfloor \times p$ 共 $\lfloor \frac{n}{p} \rfloor$ 个。

同理，若 $q$ 也是 $n$ 的质因子，则 $1 \sim n$ 中 $q$ 的倍数有 $\lfloor \frac{n}{q} \rfloor$ 个。

如果把 $p$ 和 $q$ 的倍数去掉， $p \times q$ 的倍数就被算了两次，应再加回 $\lfloor \frac{n}{p \times q} \rfloor$。

对于有两个质因子的正整数 $n$
$$
\varphi(n) = n - \frac{n}{p} - \frac{n}{q} + \frac{n}{p \times q} = n \times (1 - \frac{1}{p}) \times (1 - \frac{1}{q})
$$

同理，对于任意正整数 $n$
$$
\varphi(n) = n \times \prod_{i = 1}^s{\frac{p_i - 1}{p_i}}
$$

## 性质

1. 当 $n$ 为质数时，$\varphi(n)=n-1$。
2. 对于任意 $n > 1$ 的整数，$1 \sim n$ 中与 $n$ 互质的数的和为 $\frac{n}{2} \times \varphi(n)$
3. 欧拉函数是积性函数，即若 $a$ 与 $b$ 互质，则 $\varphi(ab) = \varphi(a) \times \varphi(b)$。

### 证明

对于性质一，因为 $n$ 为质数，所以 $1 \sim n - 1$ 与 $n$ 都互质。

对于性质二，因为 $\gcd(n, x) = \gcd(n, n - x)$ 所以与 $n$ 互质的数成对出现，每对数的平均值为 $\frac{n}{2}$，共有 $\varphi(n)$ 个数。

对于性质三，可以通过计算公式看出。

## 计算

对于单个数，根据计算公式计算即可。

```cpp
int GetPhi(int x) {
  int res = x;
  for (int i = 2; i <= std::sqrt(x); i++) {
    if (x % i == 0) {  // i 是 x 的因数
      res = res / i * (i - 1);
      while (x % i == 0) x /= i;
    }
  }
  if (x > 1)  // n 是质数
    res = res / x * (x - 1);
}
```

对于求 $1 \sim n$ 的数的欧拉函数值，因为欧拉函数为积性函数，所以使用线性筛可以在 $O(n)$ 解决问题。

```cpp
int prime[N], phi[N];
bool v[N];

int GetPhi(int n) {
  memset(v, 0, sizeof(v));
  int cnt = 0;
  phi[1] = 1;
  for (int i = 2; i <= n; i++) {
    if (!v[i])  // i 为质数
      prime[++cnt] = i, phi[i] = i - 1;
    for (int j = 1; j <= cnt && prime[j] * i <= n; j++) {
      int now = prime[j] * i;
      v[now] = true;  // now 为合数
      if (i % prime[j] == 0) {
        phi[now] = phi[i] * prime[j];
        break;
      }
      phi[now] = phi[i] * (prime[j] - 1);
    }
  }
}
```