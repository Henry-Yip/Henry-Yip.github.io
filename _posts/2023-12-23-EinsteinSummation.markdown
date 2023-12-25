---
layout: single
title: Einstein Summation
katex: True
tags: Physics
toc: true
toc_label: "Einstein Summation"
toc_sticky: true
permalink: /physics/Einstein Summation/
sidebar:
 nav: "Physics"
---

# Disclaimer

This page is directly inspired (many parts copied) from my Geometry Course Notes, written by Dr Johans Martens. 

# Introduction

Einstein Summation has been very important in many part of physics, especially where we need to sum up a lot of stuff, like in electromagnetism. 

Mathematicians define it more rigorously than physicists.

# Definition

Suppose that we have a vector space $$V$$, and dual vector space $$V^*$$. A choice of a basis $$\mathbf{e}_{\mathbf{1}}, \ldots, \mathbf{e}_{\mathbf{n}}$$ for $$V$$ induces a dual basis $$\mathbf{f}^{\mathbf{1}}, \ldots, \mathbf{f}^{\mathbf{n}}$$ for $$V^*$$, determined by the rule $$\mathbf{f}^i\left(\mathbf{e}_j\right)=\delta_j^i$$, where $$\delta_j^i$$ is the Kronecker delta.

Any element $$\mathbf{a}$$ of $$V$$ or $$\mathbf{b}$$ of $$V^*$$ can be written as a linear combination of these basis vectors:

$$
\mathbf{a}=\sum_i a^i \mathbf{e}_i \text { and } \mathbf{b}=\sum_j b_j \mathbf{f}^j,
$$
and we have $$\mathbf{b}(\mathbf{a})=\sum_i a^i b_i$$.

The coefficients of $$V*$$ and basis vectors of $$V$$ transform the same way (co-variant) (labelled as Sub-script). Coefficients of V and the basis vectors of V* transform the same way (contra-variant) (labelled as Super-Script). 

We can deduce how each the contravariant and covariant vectors transform. First,

$$
\left[\begin{array}{c}
\widetilde{v}^1 \\
\vdots \\
\widetilde{v}^n
\end{array}\right]=A\left[\begin{array}{c}
v^1 \\
\vdots \\
v^n
\end{array}\right]
$$

This is the result for Contra-variant (Super_Script).

Using this, we have:

$$
\mathbf{v}=\left[\begin{array}{lll}
\mathbf{e}_1 & \ldots & \mathbf{e}_n
\end{array}\right]\left[\begin{array}{c}
v^1 \\
\vdots \\
v^n
\end{array}\right]=\left[\begin{array}{lll}
\mathbf{e}_1 & \ldots & \mathbf{e}_n
\end{array}\right] A^{-1} A\left[\begin{array}{c}
v^1 \\
\vdots \\
v^n
\end{array}\right]=\left[\begin{array}{lll}
\mathbf{e}_1 & \ldots & \mathbf{e}_n
\end{array}\right] A^{-1}\left[\begin{array}{c}
\widetilde{v}^1 \\
\vdots \\
\widetilde{v}^n
\end{array}\right]=\left[\begin{array}{lll}
\widetilde{\mathbf{e}}_1 & \ldots & \widetilde{\mathbf{e}}_n
\end{array}\right]\left[\begin{array}{c}
\widetilde{v}^1 \\
\vdots \\
\widetilde{v}^n
\end{array}\right]$$

We can finally observe that:

$$
\left[\begin{array}{lll}
\mathbf{e}_1 & \ldots & \widetilde{\mathbf{e}}_n
\end{array}\right]=\left[\begin{array}{lll}
\mathbf{e}_1 & \ldots & \mathbf{e}_n
\end{array}\right] A^{-1},
$$

This is the result for Co-variant (Sub_Script).

# Einstein Summation

Einstein Summation states that:

Any time an index in a formula occurs twice, once as
sub-script and once as super-script, it is implicitly assumed
that we sum over all instances of that index. 
