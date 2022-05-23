---
title: 数学知识总结
date: 2022-05-23 11:17:18
categories: 算法
tags:
  - 数学
author: Mike
---
## 初等数论

### 同余式

- **基本概念**
- **一些性质**
- **同余类、剩余系**

### 欧拉定理和欧拉函数

欧拉函数：

- **概念**
- **求法**：线性筛

```cpp
int phi[N], primes[N], v[N];
phi[1] = 1;
for (int i = 2; i <= n; i++)
{
    if (!v[i]) v[i] = i, primes[++cnt] = i, phi[i] = i - 1;
    for (int j = 1; j <= cnt; j++)
    {
        if (v[i] > primes[j]) break;
        v[primes[j] * i] = primes[j];
        phi[i * primes[j]] = (i % primes[j]) ? (primes[j] - 1) * phi[i] : primes[j] * phi[i];
    }
}
```

欧拉定理：

- **证明** （简单剩余系）

- **推论**
 $a ^ {b} \equiv a ^{b \mod \phi(n)}\pmod n$

例题：
给定一个整数 $N$，请你求出 $\sum_{1 \le i \le N}gcd(1, i)$的值。

### 费马小定理

$a^{p - 1} \equiv 1\pmod p$，当 p 为素数时成立。

欧拉定理的特殊情况。

应用：

- **求逆元**
- ***费马检查配合二次探测定理：Miller Rabin算法**

### 威尔逊定理

- **证明**

- **应用**

例题：

给出素数 p，求 $q!\mod p$，其中 $q$ 为比 p 小的最大素数，$p \in [1, 10^9]$。

### 裴蜀定理

一定 $\exists x, y\in Z\ \ s.t.\  a \times x + b \times y = gcd(a, b)$ 成立。

- **证明**

两种证明方法。

- **推论**
  - $a,b$ 互质的充分必要条件是存在整数 $x,y$ 使 $a \times x + b \times y=1$
  - 设 $a_1,a_2,a_3......a_n$ 为 $n$ 个整数，$d$ 是它们的最大公约数，那么存在整数$x_1......x_n$ 使得 $x_1*a_1+x_2*a_2+...x_n*a_n=d$ 。
  - $a \times x + b \times y = c$ 有解当且仅当 $c\ |\ gcd(a, b)$

**例题**：
给定 $K$，$M$ 求一个最小的正整数 $x$,使得 $K^x\equiv 1\pmod M$，如果无解输出 -1 。

数据范围：$2\leq K$，$M\le 2\times 10^9$。

### 逆元

- **概念**

如果您到百度上搜索逆元，您会看到如下定义：（这里逆元素是逆元的全称）

```text
逆元素是指一个可以取消另一给定元素运算的元素
                                    ---百度百科
```

理解：

举个例子，如果一个数 $F$ 乘一个数 $a$ 后，再乘它的倒数 $\frac {1} {a}$，相当于没有乘 $a$，换句话说，我们乘上 $\frac {1} {a}$ 后，取消了代数式 $F$ 乘 $a$ 后值增大的影响。

不难发现这符合逆元的定义，故我们可以说一个数和其倒数互为乘法逆元。除此之外，我们还能发现一个数和其相反数互为加法逆元等等……

- **应用：除法取模**

- **求法：**
  - 扩欧算法
  - 费马小定理（注意：仅在 p 为质数时成立）
  - 线性递推:
    - 证明

```cpp
inv[1] = fac[1] = inv[0] = fac[0] = 1;
for (int i = 2; i <= n; i++)
    inv[i] = (p - p / i) * inv[p % i] % p;
```

### 扩展欧几里得算法

求解 $a \times x + b \times y = gcd(a, b)$ 的一组特解 $(x_0, y_0)$。

- **通解**

对于形如 $a \times x + b  \times y = c, gcd(a,b)\ |\ c$ 的方程来说：

它的特解为 $(x^{'} = x_0 \times \frac{c}{gcd(a, b)}, y ^ {'} = y_0 \times \frac{c}{
gcd(a,b)})$；

它的通解为 $(x'+ k \times \frac{b}{gcd(a, b)}, y^{'} - k \times \frac{a}{gcd(a, b)})$ 。

```cpp
void exgcd(int a, int b, int &x, int &y)
{
   if (b == 0)
       return void(x = 1), void(y = 0);
   exgcd(b, a % b, x, y);
   int z = x;
   x = y, y = z - y * (a / b);
}
```

### CRT 中国剩余定理

假设整数 $m_1, m_2\dots m_n$ 两两互素，则对于任意的整数 $a_1, a_2 \dots a_n$ ，方程组

$$\begin{cases} x \equiv a_1\ ({\rm mod}\ m_1) \\ x\equiv a_2\ ({\rm mod}\ m_2) \\ ... \\ x \equiv a_n\ ({\rm mod}\ m_n)\end{cases}$$
存在整数解。

我们设 $M=\prod_{i=1}^{k}m_i$，$ M_i=\frac{M}{m_i}$，$M_it_i≡1\;\;(mod\;\;m_i)$。

可以构造出一个解 $x=\sum_{i=1}^{k}a_iM_it_i$

- **证明** 展开即可。

```cpp
int a[], m[], M[];
int CRT()
{
    int MUL = 1, TJ = 0;
    for (int i = 1; i <= n; i++)
        MUL *= m[i], M[i] = MUL / m[i];
    for (int i = 1; i <= n; i++)
    {
        int x, y;
        exgcd(M[i], m[i], x, y);
        if (x < 0) x += m[i];
        TJ += x * M[i] * a[i];
    }
    return TJ;
}
```

## 组合数学

### 可重集排列和可重集组合

![可重集](https://cdn.luogu.com.cn/upload/image_hosting/w9gkg3ok.png)

#### 多重集的排列数

#### 多重集的组合数

从 $n$ 个元素中选取 $m$ 个元素，同一元素允许重复选取，产生的组合数量为 $C_{n + m - 1}^{m - 1}$。

可重集排列：（多组组合）
将 $n$ 个元素分成 $k$ 组，产生的组合个数为

可重集组合： (不定方程的非负整数解)
$x_1 + x_2 + x_3 + \dots + x_n = m$
非负整数解的个数为：$C_{n + m - 1}^{m - 1}$

- **证明**

### 鸽巢原理

![GeChao](https://cdn.luogu.com.cn/upload/image_hosting/w05insir.png)

- **证明**

### 二项式定理

- **证明**

### 容斥原理

- **理解**

- 并集形式
  $|A_1 \cup A_2 \cup A_3 \dots \cup A_n| = \sum_{1\le i\le n}{|A_i|}-\sum_{1\le i < j \le n} {|A_i \cap A_j|} + \dots + (-1)^{n + 1} \times |A_1 \cap A_2 \dots A_n |$

- 交集形式（筛法公式）
  ![demogen](https://www.zhihu.com/equation?tex=%7C%5Ccap_%7Bi%3D1%7D%5En+%5Coverline%7BA_i%7D%7C%3D%7C%5Coverline%7B%5Ccup_%7Bi%3D1%7D%5En+A_i%7D%7C%3D%7CS%7C-%7C%5Ccup_%7Bi%3D1%7D%5En+A_i%7C+%5C%5C%3D%7CS%7C-%5Csum+%7CA_i%7C%2B%5Csum+%7CA_i%5Ccap+A_j%7C-%5Cldots+%2B%28-1%29%5En+%7C%5Ccap_%7Bi%3D1%7D%5En+A_i%7C+)

例题：
[Devu and flowers](https://www.luogu.com.cn/problem/CF451E)

### 卡特兰数

- **定义**

长度为 $n$ 的 $0, 1$ 序列，满足任意前缀中 $0$ 的个数不小于 $1$ 的个数的排列个数为 $Cat_n = \frac{C_n^{2n}}{n + 1}$

- **例子**
  - 欧拉剖分
  - 括号匹配
  - 出栈统计

例题：
[球迷购票问题](https://www.luogu.com.cn/problem/P1754)

### 组合杂项

- 组合数的线性预处理

```cpp
int C(int x, int y)
{
    return fac[x] * inv[x - y] % mod * inv[y] % mod;
}
void init()
{
	inv[0] = fac[0] = inv[1] = fac[1] = 1;
    for (int i = 2; i < N; i++)
    {
        inv[i] = (mod - mod / i) * inv[i] * inv[mod % i] % mod;
        fac[i] = fac[i - 1] * fac[i] % mod;
    }
    for (int i = 2; i < N; i++)
        inv[i] = inv[i] * inv[i - 1] % mod;
}

```

- 杨辉三角与组合数
![YangHui](https://tse1-mm.cn.bing.net/th/id/R-C.5fcbc7793b20a34c4f5e67f2a156e94f?rik=Q9RaZG75okd2Gg&riu=http%3a%2f%2fwww.rcydt.cn%2fuploadfile%2f2019%2f0430%2f20190430040517860.jpg&ehk=b7E7L1oc9Yz7rP4cbDrDnOawD%2bnRXqSPYETVZ6GV0dA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1)
- 组合数的性质
  - $\frac{i}{n}C_n^i = C_{n - 1}^{i - 1}$
  - $C_{n+1}^m=C_n^m+C_n^{m-1}$
  - $C_{m+r+1}^r=\sum_{i=0}^r C_{m+i}^i$
  - $\sum_{i=0}^m C_m^i=2^m$
  - $C_m^0+C_m^2+C_m^4...=C_m^1+C_m^3+C_m^5+...=2^{m-1}$
  - $\sum_{i=1}^n C_n^i*i^2=n*(n+1)*2^{n-2}$
  - $\sum_{i=0}^n (C_n^i)^2=C_{2n}^n$

## 线性代数

### 矩阵概念

![JuZhen](https://cdn.luogu.com.cn/upload/image_hosting/6aq90t58.png)

**$X$ 阶矩阵：** 行数与列数都等于 $n$ 的矩阵称为 $n$ 阶矩阵或 $n$ 阶方阵。
**单位矩阵：** 主对角线上的元素都为 $1$ ，其余元素均为 $0$ 的 $n$ 阶方阵称为 $n$ 阶单位矩阵，记为 $E$。
**逆矩阵：** 设 $A$ 是一个 $n$ 阶矩阵，若存在另一个 $n$ 阶矩阵 $B$ ，使得： $A \times B = E$
**矩阵的迹：**
$n \times n$ 矩阵 $A$ 的对角元素之和称为矩阵A的迹( $trace$ ),记作 $tr(A)$

### 特殊矩阵

- **稀疏矩阵**
我们知道矩阵是一个由 $m$ 行和 $n$ 列组成的二维数据对象，因此一共有 $m \times n$ 个数值。当这个矩阵的绝大部分数值为零，且非零元素呈不规律分布时，则称该矩阵为稀疏矩阵（ $Sparse\ Matrix$ ）
与它相对的一个概念叫稠密矩阵，，那些非零数值占大多数元素的矩阵即是稠密矩阵（ $Dense\ Matrix$ ）。

- **三角矩阵**
三角矩阵（ $Triangular\ Matrix$ ）分为上三角矩阵和下三角矩阵。
  - 上三角矩阵（ $Upper\ Triangular\ Matrix$ ）是指主对角线以下元素全为0的矩阵，如：
![Up](https://www.zhihu.com/equation?tex=%5Cbegin%7Bpmatrix%7D+1+%26+3+%5C%5C+0+%26+2+%5C%5C+%5Cend%7Bpmatrix%7D+%2C+%5Cquad+%5Cbegin%7Bpmatrix%7D+2+%26+4+%26+5+%5C%5C+0+%26+6+%26+0+%5C%5C+0+%26+0+%263+%5Cend%7Bpmatrix%7D)
  - 下三角矩阵（Lower Triangular Matrix）是指主对角线以上元素全为0的矩阵，如：
![Down](https://www.zhihu.com/equation?tex=%5Cbegin%7Bpmatrix%7D+1+%26+0+%5C%5C+4+%26+2+%5C%5C+%5Cend%7Bpmatrix%7D+%2C+%5Cquad+%5Cbegin%7Bpmatrix%7D+2+%26+0+%26+0+%5C%5C+0+%26+0+%26+0+%5C%5C+4+%26+6+%263+%5Cend%7Bpmatrix%7D)

- **对称矩阵**
对称矩阵（Symmetric Matrix）是指元素以主对角线为对称轴对应相等的矩阵，例如：
![DuiCheng](https://www.zhihu.com/equation?tex=%5Cbegin%7Bpmatrix%7D+1+%26+3+%5C%5C+3+%26+2+%5C%5C+%5Cend%7Bpmatrix%7D+%2C+%5Cquad+%5Cbegin%7Bpmatrix%7D+2+%26+5+%26+6+%5C%5C+5+%26+0+%26+7+%5C%5C+6+%26+7+%263+%5Cend%7Bpmatrix%7D)

### 矩阵的初等变换

- 交换两行或两列
- 用一个数 $K$ 乘以某一行
- 用某个数乘以某一行

### 矩阵的加减乘和转置运算

矩阵的加减乘

- 加减法：对应的位置相加减

- 数乘：每个位置乘以常数

- 矩阵的转置运算
  ![ZhuanZhi](https://pic2.zhimg.com/v2-486fa661982257c614058c13a706bb05_r.jpg)

- **矩阵乘法**
  理解：(线性方程组)
  例题：[数学作业](https://www.luogu.com.cn/problem/P3216)

给定正整数 $n,m$，要求计算 $\text{Concatenate}(n) \bmod \ m$  的值，其中 $\text{Concatenate}(n)$ 是将 $1 \sim n$ 所有正整数 顺序连接起来得到的数。

$1\le n \le 10^{18}$，$1\le m \le 10^9$。

### 线性方程组的高斯消元法

[开关问题](https://www.acwing.com/problem/content/210/)

练习：

- [妖梦拼木棒](https://www.luogu.com.cn/problem/P3799)
- [GCD](https://www.luogu.com.cn/problem/P2568)
- [Devu and flowers](https://www.luogu.com.cn/problem/CF451E)
- [矩阵求逆](https://www.luogu.com.cn/problem/P4783)