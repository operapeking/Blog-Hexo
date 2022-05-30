---
title: 单调队列
date: 2021-10-02 15:47:49
categories:
  - 算法
tags:
  - 数据结构
  - 队列
---
单调队列即满足单调性的队列结构。
<!-- more -->
## 介绍

顾名思义，单调队列即满足单调性的队列结构。

为了描述方便，以下举例以维护一个整数的单调递增队列为例。

### 使用

#### 插入

将一个元素插入单调队列时，为了维护队列的单调性，需要在保证将该元素插入到队尾后整个队列满足单调性的前提下弹出最少的元素。

例如，原数组中的元素为 `1 3 -1 -3 5 3 6 7` ，我们以此构造一个单调队列。

| 操作                                        | 队列状态     |
| :------------------------------------------ | :----------- |
| 1 入队                                      | `{1}`        |
| 3 比 1 大，3 入队                           | `{1 3}`      |
| -1 比队列中所有元素小，所以清空队列 -1 入队 | `{-1}`       |
| -3 比队列中所有元素小，所以清空队列 -3 入队 | `{-3}`       |
| 5 比 -3 大，直接入队                        | `{-3 5}`     |
| 3 比 5 小，5 出队，3 入队                   | `{-3 3}`     |
| 6 比 3 大，6 入队                           | `{-3 3 6}`   |
| 7 比 6 大，7 入队                           | `{-3 3 6 7}` |

#### 查询

自然就是从队列头读出来一个元素，该元素满足单调性的某一端。

举例中取出的即队列中的最小值。

## 应用

### [**P1886 滑动窗口 /【模板】单调队列**](https://www.luogu.com.cn/problem/P1886)

有一个长为 $n$ 的序列 $a$，以及一个大小为 $k$ 的窗口。现在这个窗口从左边开始向右滑动，每次滑动一个单位，求出每次滑动后窗口中的最大值和最小值。

#### 题解

对于最小值，我们维护一个单调递增的单调队列 `Qmin`，`Qmin` 存的是 $a$ 的下标。在遇到 $a_i$ 大于第 `Qmin.back()` 个数时就将 `Qmin.back()` 弹出。重复执行此操作，直到 $ a_{Qmin.back()} < a_i$ ，再 `Qmin.push_back(i)`。

注意，如果 `Qmin` 中存储的下标已经不在窗口内，就应该弹出超出窗口的部分。

因此，每个以 $a_i$ 为最右端的窗口的最小值为当时 `Qmin` 队列中的最小值，既第 `Qmin.front()` 个数。

同理，对于最大值，只需再维护一个单调递减的单调队列 `Qmax` 就可以了。

Tips: 若队列为空，查询队列中的元素会发生段错误，因此要在查询之前判断非空。

```cpp
#include <iostream>
#include <deque>
using namespace std;
const int N = 1000010;
int n, k, a[N], Min[N], Max[N];
deque<int> Qmin;
deque<int> Qmax;
int main()
{
    ios::sync_with_stdio(false);
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];

        if (!Qmin.empty())
        {
            if (i - Qmin.front() + 1 > k)
                Qmin.pop_front();
            while (!Qmin.empty() && a[Qmin.back()] > a[i])
                Qmin.pop_back();
        }
        Qmin.push_back(i);
        Min[i] = a[Qmin.front()];

        if (!Qmax.empty())
        {
            if (i - Qmax.front() + 1 > k)
                Qmax.pop_front();
            while (!Qmax.empty() && a[Qmax.back()] < a[i])
                Qmax.pop_back();
        }
        Qmax.push_back(i);
        Max[i] = a[Qmax.front()];
    }
    for (int i = k; i <= n; i++)
        cout << Min[i] << " ";
    cout << "\n";
    for (int i = k; i <= n; i++)
        cout << Max[i] << " ";
    return 0;
}
```
