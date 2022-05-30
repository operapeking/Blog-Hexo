---
title: 线性基
date: 2021-10-01 15:45:31
categories:
  - 算法
tags:
  - 数学
  - 线性基
---
线性基是一种特殊的基，它通常会在异或运算中出现。
<!-- more -->
## 介绍

线性基是一种特殊的基，它通常会在异或运算中出现，它的意义是：通过原集合 $S$ 的某一个最小子集 $S1$ 使得 $S1$ 内元素相互 **异或** 得到的值域与原集合 $S$ 相互 **异或** 得到的值域相同。

<p align="right">——百度百科</p>

### 性质

1. 线性基的元素能相互异或得到原集合的元素的所有相互异或得到的值。（定义）
2. 线性基是满足性质 1 的最小的集合。
3. 线性基没有异或和为 $0$ 的子集。
4. 线性基中每个元素的异或方案唯一。也就是说，线性基中不同的异或组合异或出的数都是不一样的。
5. 线性基中每个元素的二进制最高位互不相同。

### 实现

对一个集合求线性基，将原集合的每个数 `a` 转为二进制，从高位向低位扫，对于第 `i` 位是 $1$ 的，如果 `p[i]` 不存在，那么令 `p[i] = a` 并结束扫描，如果存在，令 `a = a xor p[i]`，继续扫描下一位 。

```cpp
void Insert(long long x)
{
    for (int i = 50; i >= 0; i--) // i 为数的二进制位数
    {
        if (!(x >> i)) // 注意优先级
            continue;
        if (!p[i])
        {
            p[i] = x;
            return;
        }
        x ^= p[i]; // 相当于删除可被已有的线性基算出的位数
    }
    return;
}
```

## 应用

根据性质 1，查询原集合内任意几个元素 `xor` 的最大值，就可以用线性基解决。

将线性基从高位向低位扫，若 `ans` 异或上当前扫到的 `p[i]` 答案变大，就把答案异或上 `p[i]`。

{% note success %}
为什么能行呢？因为从高往低位扫，若当前扫到第 i 位，意味着可以保证答案的第 `i` 位为 `1`，且后面没有机会改变这一位。
{% endnote %}

### [【模板】线性基](https://www.luogu.com.cn/problem/P3812)

```cpp
#include <iostream>
using namespace std;
const int N = 55;
int n;
long long a[N], p[N], ans;

void Insert(long long x)
{
    for (int i = 50; i >= 0; i--)
    {
        if (!(x >> i))
            continue;
        if (!p[i])
        {
            p[i] = x;
            return;
        }
        x ^= p[i];
    }
    return;
}

int main()
{
    ios::sync_with_stdio(false);
    cin >> n;
    for (int i = 1; i <= n; i++)
        cin >> a[i], Insert(a[i]);
    for (int i = 50; i >= 0; i--)
        if (ans < (ans ^ p[i]))
            ans ^= p[i];
    cout << ans;
    return 0;
}
```

## 他山之石

[线性基学习笔记](https://oi.men.ci/linear-basis-notes/)
