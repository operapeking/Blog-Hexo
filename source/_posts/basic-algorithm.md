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
## 题目

### [Cipele](https://www.luogu.com.cn/problem/P7305)

Tag：二分

**使最大值最小且答案明显具有单调性，考虑二分。**

在答案的值域上二分，每次检查是否满足条件，是则进入左区间，否则进入右区间。

考虑 `check` 函数写法，首先升序排序 $L[i], R[i]$，然后双指针扫描，如下所示：

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

### [田忌赛马](https://www.luogu.com.cn/problem/P1650)

Tag：贪心

假设齐王从强到弱派出马，易知田忌每次的最优策略必然从当前最强的或是最弱的之中产生。

首先将田忌和齐王的马分别排序。

于是考虑四个指针，分别指向当前序列的头部和尾部，每次选择都移动两个指针。

将当前最大值分类讨论：

```cpp
int work()
{
    int *tMin = a + 1, *tMax = a + n, *qMin = b + 1, *qMax = b + n, res = 0;
    for (int i = 1; i <= n; i++)
    {
        if (*tMax > *qMax) // 能赢就赢
            Max(tMax), Max(qMax), res += 200;
        else if (*tMax < *qMax) // 不能赢就用最劣换最优
            Min(tMin), Max(qMax), res -= 200;
        else if (*tMax == *qMax) // 能平（等价于：用最劣输最优，用最优赢其他一匹马）
            if (*tMin > *qMin) // 最劣能赢最劣
                Min(tMin), Min(qMin), res += 200;
            else if (*tMin < *qMax) // 最劣输最优
                Min(tMin), Max(qMax), res -= 200;
            else // 可能最后的时候tMin == tMax == qMin == qMax;
                Min(tMin), Max(qMax);
    }
    return res;
}
```

### [Above the Median G](https://www.luogu.com.cn/problem/P3031)

Tag：逆序对

**中位数题目技巧**。将大于等于 $x$ 的数赋值为1，小于 $x$ 的数赋值为0，转化为计算前缀和求解。

此时问题转化为有多少个区间 $[l,r]$ 满足 $s[r]-s[l-1]\ge 0$

上式等价于：总子区间数目减去 $s[r]\le s[l-1], 0\le l-1<r\le n$ 的个数，相当于求解逆序对数目。

归并排序：时间复杂度 $O(N\log{N})$
