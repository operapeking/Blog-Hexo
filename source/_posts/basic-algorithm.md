---
title: 基础算法
author: Mike
date: 2022-05-29 15:22:30
categories:
  - 算法
tags:
  - 基础算法
---
基础算法，二分，倍增，贪心题目总结
<!-- more -->
## 二分

二分适用于答案具有单调性的区间。
简单来讲，就是二分时，答案只可能出现在其中一个区间。

应用：最大值最小，最小值最大。

## 题目

[Cipele](https://www.luogu.com.cn/problem/P7305)

Tag：二分

使最大值最小且答案明显具有单调性，考虑二分。

在答案的值域上二分，每次检查是否满足条件，是则进入左区间，否则进入右区间。

考虑 `check` 函数写法，首先升序排序 $L[i], R[i]$，否则然后双指针扫描，如下所示：

```cpp
bool check(int x)
{
    int p = 1, q = 1, cnt = 0;
    while (p <= n && q <= m)
        if (abs(L[p] - R[q]) <= x)
            p++, q++, cnt++;
        else if (n > m) p++;
        else q++;
    return cnt == len;
}
```

正确性：

证明`L` 配对的 `R` 一定单调，即一定是最优匹配。

$L: \dots a\ b\dots \newline R:\dots c\ d\ e\dots (1\le a\le b, 1\le c\le d\le e)$

设 $a$ 与 $d$ 配对，即已知 $|a - d|\le x\ and\ |a - c|>x$，需要证明$|b - c|>x$

只有两种情况使得上述情况成立。

1. $c\le a\le d, a\le b$
2. $c\le d\le a, a\le b$

显然这两种情况都有 $|b - c| > x$

QED.
