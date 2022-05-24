---
title: 单调栈
date: 2021-10-03 11:17:18
categories: 算法
tags:
  - 数据结构
  - 栈
---
单调栈即满足单调性的栈结构。
<!-- more -->
## 介绍

顾名思义，单调栈即满足单调性的栈结构。与单调队列相比，其只在一端进行进出。

为了描述方便，以下举例以维护一个整数的单调递增栈为例。

### 使用

#### 插入

将一个元素插入单调栈时，为了维护栈的单调性，需要在保证将该元素插入到栈顶后整个栈满足单调性的前提下弹出最少的元素。

例如，栈中自顶向下的元素为 $\{ 0,11,45,81 \} $ 。

![下压](https://oi-wiki.org/ds/images/monotonous-stack-before.svg)

插入元素 $14$ 时为了保证单调性需要依次弹出元素 $0,11$ ，操作后栈变为 $\{ 14,45,81 \} $ 。

![弹出](https://oi-wiki.org/ds/images/monotonous-stack-after.svg)

#### 查询

自然就是从栈顶读出来一个元素，该元素满足单调性的某一端。

例如举例中取出的即栈中的最小值。

## 应用

### [P5788 【模板】单调栈](https://www.luogu.com.cn/problem/P5788)

#### 题目简述

给出项数为 $n$ 的整数数列 $a_{1 \dots n}$，求数列中第 $i$ 个元素之后第一个大于 $a_i$ 的元素的**下标**，若不存在，则输出 $0$。

#### 题解

我们只需维护一个单调递减的单调栈 `S`，`S` 存的是 $a$ 的下标。在遇到 $a_i$ 大于第 `S.top()` 个数时就将 `S.top()` 弹出，此时第 `S.top()` 个数的答案就为 $i$。重复执行此操作，直到 $ S.top() > a_i$ ，再 `S.push(i)`。

```cpp
#include <iostream>
#include <stack>
using namespace std;
const int N = 3000010;
int n, a[N], f[N];
stack<int> S;
int main()
{
    ios::sync_with_stdio(false);
    a[0] = __INT_MAX__;
    S.push(0);
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        while (a[S.top()] < a[i])
        {
            f[S.top()] = i;
            S.pop();
        }
        S.push(i);
    }
    for (int i = 1; i <= n; i++)
        cout << f[i] << " ";
    return 0;
}
```