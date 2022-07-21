---
title: 质数
date: 2022-07-21 16:57:07
categories: 算法
tags:
- 数学
---
关于质数的性质与求法。
<!--more-->
## 定义

若以个正整数无法被除了 $1$ 和它自身之外的任何自然数整除，则称该数为质数。

[维基百科](https://zh.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0%E8%AE%A1%E6%95%B0%E5%87%BD%E6%95%B0)：在整个自然数集合中，质数的数量不多，分布比较稀疏，对于一个足够大的整数 $N$，不超过 $N$ 的质数大约有 $N / \ln N$ 个，即每 $\ln N$ 个数中大约有 $1$ 个质数。

## 筛法

给定一个整数 $N$，求出 $1 \sim N$ 中的所有质数。

### 埃氏筛（Eratosthnes）

从 $2$ 开始，从小到大扫描每个数 $x$。若 $x$ 是质数（即未被标记），把它的倍数 $2x, 3x, \dots, \lfloor N / x \rfloor \times x$ 标记为合数。当扫描到一个数时，若它尚未标记，则它是质数。

时间复杂度为 $O(N \log \log N)$。

```cpp
bool vis[N];  // 合数标记

void GetPrime(int n) {
  memset(vis, 0, sizeof(vis));
  for (int i = 2; i <= n; i++) {
    if (vis[i]) continue;  // i 是合数
    for (int j = i; i * j <= n; j++) vis[i * j] = true;
  }
}
```

### 线性筛

埃氏筛会重复标记质数，如 $12$ 会被 $2 \times 6$ 和 $3 \times 4$ 标记。

线性筛通过“从大到小累计质因子”标记每个合数，如 $12$ 只会被 $3 \times 2 \times 2$ 标记。

令数组 `v` 记录每个数的最小质因子。

1. 依次考虑 $2 \sim N$ 之间的每个数 $i$
2. 若 $v[i] = i$，则说明 $i$ 为质数，把 $i$ 存下来
3. 扫描不大于 $v[i]$ 的每个质数 $p$，让 $v[v[i] * p] = p$。

时间复杂度为 $O(N)$

```cpp
int v[N], prime[N];

int GetPrime(int n) {
  int cnt = 0;  // 质数个数
  for (int i = 1; i <= n; i++) v[i] = i;
  for (int i = 2; i <= n; i++) {
    if (v[i] == i)  // 质数
      prime[++cnt] = i;
    for (int j = 1; j <= cnt && prime[j] <= v[i] && prime[j] * i <= n; j++)
      v[i * prime[j]] = prime[j];
  }
  return cnt;
}
```