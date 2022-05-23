---
title: 字典树
date: 2021-05-23 16:13:10
categories:
tags:
---
## 介绍

先放一张图：

![trie](./img/trie/trie.png)

可以发现，这棵字典树用边来代表字母，而从根结点到树上某一结点的路径就代表了一个字符串。举个例子，$1\to4\to 8\to 12$ 表示的就是字符串 `caa`。

Trie 的结构非常好懂，我们用 $\delta(u,c)$ 表示结点 $u$ 的 $c$ 字符指向的下一个结点，或着说是结点 $u$ 代表的字符串后面添加一个字符 $c$ 形成的字符串的结点。（$c$ 的取值范围和字符集大小有关，不一定是 $0\sim 26$。）

有时需要标记插入进 Trie 的是哪些字符串，每次插入完成时在这个字符串所代表的节点处打上标记即可。

不难看出，Trie 是典型的用空间来换时间的做法。

## 代码实现

放一个结构体封装的模板：

```cpp
struct trie {
  int nex[100000][26], cnt;
  bool exist[100000];  // 该结点结尾的字符串是否存在

  void insert(char *s, int l) {  // 插入字符串
    int p = 0;
    for (int i = 0; i < l; i++) {
      int c = s[i] - 'a';
      if (!nex[p][c]) nex[p][c] = ++cnt;  // 如果没有，就添加结点
      p = nex[p][c];
    }
    exist[p] = 1;
  }
  bool find(char *s, int l) {  // 查找字符串
    int p = 0;
    for (int i = 0; i < l; i++) {
      int c = s[i] - 'a';
      if (!nex[p][c]) return 0;
      p = nex[p][c];
    }
    return exist[p];
  }
};
```

## 应用

### 检索字符串

字典树最基础的应用——查找一个字符串是否在“字典”中出现过。

#### [于是他错误的点名开始了](https://www.luogu.com.cn/problem/P2580)

给你 $n$ 个名字串，然后进行 $m$ 次点名，每次你需要回答“名字不存在”、“第一次点到这个名字”、“已经点过这个名字”之一。

$1\le n\le 10^4$，$1\le m\le 10^5$，所有字符串长度不超过 $50$。  

##### 题解

对所有名字建 Trie，再在 Trie 中查询字符串是否存在、是否已经点过名，第一次点名时标记为点过名。（一道 Trie 模板题）

```cpp
#include <iostream>
#include <string>
using namespace std;
const int N = 500010;
string s;
int n, m, ch[N][26], tag[N], tot = 1;
int main()
{
    ios::sync_with_stdio(false);
    cin >> n;
    for (int i = 1; i <= n; ++i)
    {
        cin >> s;
        int u = 1;
        for (int j = 0; s[j]; ++j)
        {
            int c = s[j] - 'a';
            if (!ch[u][c])
                ch[u][c] = ++tot; // 如果该节点的子节点中没有此字符，添加上并将该字符的节点号记录为++tot
            u = ch[u][c];         // 往更深一层搜索
        }
        tag[u] = 1; // 最后一个字符为节点 u 的名字未被访问到记录为 1
    }
    cin >> m;
    while (m--)
    {
        cin >> s;
        int u = 1;
        for (int j = 0; s[j]; ++j)
        {
            int c = s[j] - 'a';
            u = ch[u][c];
            if (!u)
                break; // 不存在对应字符的出边说明名字不存在
        }
        if (tag[u] == 1)
        {
            tag[u] = 2; // 最后一个字符为节点 u 的名字已经被访问
            cout << "OK";
        }
        else if (tag[u] == 2) //已经被访问，重复访问
            cout << "REPEAT";
        else
            cout << "WRONG";
        cout << endl;
    }
    return 0;
}
```

还有一种方法就是使用 C++ STL 中的 [unordered_map](https://en.cppreference.com/w/cpp/container/unordered_map)，其时间复杂度为 $O(n+m)$，等效于 Trie（但可能会卡 `hash`。

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;
int n, m;
unordered_map<string, int> a;
string s;
int main()
{
    ios::sync_with_stdio(false);
    cin >> n;
    while (n--)
    {
        cin >> s;
        a[s] = 1;
    }
    cin >> m;
    while (m--)
    {
        cin >> s;
        if (a[s] == 1)
        {
            cout << "OK";
            a[s] = 2;
        }
        else if (a[s] == 2)
            cout << "REPEAT";
        else
            cout << "WRONG";
        cout << endl;
    }
    return 0;
}
```