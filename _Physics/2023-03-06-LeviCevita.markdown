---
layout: single
title: Vector Calculus in Physics
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /physics/Vector Calculus/
tag: Physics
toc: true
toc_label: "Vector Calculus"
toc_sticky: true
sidebar:
 nav: "Physics"
---

### Einstein Summation Convention

Einstein Summation Convention can be intimidating/annoying to work with at start, but it saves you a lot of time (and makes you look pro). From [Wolfram Mathworld](https://mathworld.wolfram.com/EinsteinSummation.html) and based on what I know, there are a few rules:

1. All summation signs are omitted! (Hence simplicity!)

2. Repeated indices are implicitly summed over.

3. Each index can appear at most twice in any term.

4. Each term must contain identical non-repeated indices.

Revision: Definition of **Kronecker Delta** $$\delta_{ij}$$:
$$
\delta_{i j}= \begin{cases}0 & \text { if } i \neq j \\ 1 & \text { if } i=j\end{cases}
$$

Examples:

$$\delta_{i i}=\delta_{11}+\delta_{22}+\delta_{33}=3$$


From [this website](https://static.hlt.bme.hu/semantics/external/pages/tenzorszorzatok/en.wikipedia.org/wiki/Kronecker_delta.html#:~:text=The%20Kronecker%20delta%20has%20the%20so-called%20siftingproperty%20that,the%20defining%20property%20of%20the%20Dirac%20delta%20function) you can see the **sifting property** of Kronecker Delta, for $$j \in \mathbb{Z}$$:

$$\sum_{i=-\infty}^{\infty} a_i \delta_{i j}=a_j$$

Hence using **Einstein Summation** you can easily see this is true:
$$\delta_{i j} \delta_{jk}=\delta_{ik}$$

### Levi-Cevita Symbol
$$
\varepsilon_{i j k}=\left\{\begin{aligned}
+1 & \text { if }(i, j, k) \text { is }(1,2,3),(2,3,1), \text { or }(3,1,2) \\
-1 & \text { if }(i, j, k) \text { is }(3,2,1),(1,3,2), \text { or }(2,1,3) \\
0 & \text { if } i=j, \text { or } j=k, \text { or } k=i
\end{aligned}\right.
$$

**Exercise**:
$$
\underline{e}_i \times \underline{e}_j=\epsilon_{i j k} \underline{e}_k \quad \forall i, j=1,2,3
$$

Now consider
$$
\underline{a} \times \underline{b}=a_i b_j \underline{e}_i \times \underline{e}_j=\epsilon_{i j k} a_i b_j \underline{e}_k
$$
Comparing with
$$
\underline{a} \times \underline{b}=(\underline{a} \times \underline{b})_k \underline{e}_k
$$
Yields
$$
(\underline{a} \times \underline{b})_k=\epsilon_{i j k} a_i b_j
$$

This is very important!

