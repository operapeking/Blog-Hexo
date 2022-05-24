---
title: 最小生成树
date: 2021-10-04 15:58:08
categories:
  - 算法
tags:
  - 数据结构
  - 最小生成树
---
## 介绍

我们定义无向连通图的 **最小生成树**（Minimum Spanning Tree，MST）为边权和最小的生成树。

注意：只有连通图才有生成树，而对于非连通图，只存在生成森林。

以有线电视电缆的架设为例，若只能沿着街道布线，则以街道为边，而路口为顶点，其中必然有一最小生成树能使布线成本最低。

{% note warning %}
本文中的无向连通图均为 `n` 个点，`m` 条无向边。
{% endnote %}

## 例题

[P3366 【模板】最小生成树](https://www.luogu.com.cn/problem/P3366)

给出一个无向图，求出最小生成树，如果该图不连通，则输出 `orz`。

### 求法

### Prim 算法

Prim算法的基本思想是找到还没有在生成树中出现的、到树的距离最短的点，将其加入树中，再更新剩余点到树的距离，重复执行，直到所有点都加入到生成树中。答案即为每次加的点到树的距离之和。

时间复杂度为 $\Theta(n^2)$。

```cpp
int prim()
{
    memset(dis, 0x3f, sizeof(dis)); // 初始状态所有点到生成树的距离为正无穷
    int res = 0;                    // 答案
    for (int i = 0; i < n; i++)     // 枚举所有的点
    {
        int x = 0;
        for (int j = 1; j <= n; j++) // 找到当前还没有在生成树中出现的、到树的距离最短的点 x
            if (!vis[j] && (x == 0 || dis[j] < dis[x]))
                x = j;
        if (i && dis[x] == INF) // 无相图不连通
            return -1;
        vis[x] = true; // 将 x 加入生成树中
        if (i)
            res += dis[x]; // 将 x 到生成树的距离加入答案
        for (int j = head[x]; j; j = nxt[j]) // 更新所有和 x 相连的点的 dis 数组
        {
            int y = ver[j];
            dis[y] = min(dis[y], edge[j]);
        }
    }
    return res;
}
```

因为 Prim 算法每次都要找到到树距离最短的点，我们可以用二叉堆存下点到树的距离，优化这一过程。

时间复杂度为 $\Theta((n+m)\log n)$。

```cpp
int prim()
{
    memset(dis, 0x3f, sizeof(dis));                   // 初始状态所有点到生成树的距离为正无穷
    priority_queue<PII, vector<PII>, greater<PII>> Q; // 优先队列存未在生成树中的点到树的距离
    int res = 0;                                      // 答案
    dis[1] = 0;                                       // 先将一个点加入树中
    Q.push(make_pair(0, 1));
    int cnt = 0;
    while (!Q.empty() && cnt < n) // 枚举所有的点。!Q.empty()：当未在生成树中的点都无法到达树，无向图不连通
    {
        int d = Q.top().first, x = Q.top().second; // 当前到树的距离最小的点
        Q.pop();
        if (vis[x]) // 当前点已在树中
            continue;
        cnt++;
        vis[x] = true; // 将 x 加入树
        res += d;
        for (int j = head[x]; j; j = nxt[j]) // 更新所有和 x 相连的点到树的距离
        {
            int y = ver[j];
            if (edge[j] < dis[y])
                dis[y] = edge[j], Q.push(make_pair(dis[y], y));
        }
    }
    if (cnt < n)
        return -1;
    return res;
}
```



### Kruskal 算法

Kruskal 算法比 Prim 算法更容易理解。该算法的基本思想是从小到大加入边，是个贪心算法。

时间复杂度为 $\Theta(m \log m)$。

```cpp
struct edges
{
    int a, b, w;
    bool operator<(const edges &b) const
    {
        return w < b.w;
    }
} edge[M];
int find(int x) // 并查集
{
    if (x == fa[x])
        return x;
    return fa[x] = find(fa[x]); // 返回 fa[x] 的祖先，并用其更新 fa[x]
}
void kruskal(int x)
{
    for (int i = 1; i <= n; i++) // 并查集初始化
        fa[i] = i;
    sort(edge + 1, edge + 1 + m); // 按照边权从小到大对所有边排序
    int res = 0, cnt = 0;         // cnt 为生成树中已有的点数
    for (int i = 1; i <= m; i++)
    {
        int x = edge[i].a, y = edge[i].b, d = edge[i].w;
        x = find(x), y = find(y);
        if (x != y) // 两个点所在的图不连通
        {
            res += d; // 增加一条边，使得两点联通
            cnt++;
            fa[x] = y;
        }
    }
    if (cnt < n - 1)
        cout << "orz";
    else
        cout << res;
    return;
}
```