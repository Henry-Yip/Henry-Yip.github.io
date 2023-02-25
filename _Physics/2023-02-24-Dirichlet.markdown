---
layout: single
title: Dirichlet's Kernel 
header:
  teaser: /assets/images/Astro.png
katex: False
permalink: /Physics/FourierSeries/
tag: Physics
toc: true
toc_label: "Fourier Series"
toc_sticky: true
sidebar:
 nav: "Physics"
---
### A Natural Introduction
**Dirichlet's Kernel** is intimately related to **Fourier Series**, by design:

$$
\begin{aligned}
f_N(x) & =\frac{a_0}{2}+\sum_{n=1}^N\left(a_n \cos n x+b_n \sin n x\right) \\
& =\int_{-\pi}^\pi[1+2 \sum_{n=1}^N (\cos n y \cos n x+\sin n y \sin n x)] \frac{f(y)}{2 \pi} d y \\
&=\int_{-\pi}^\pi[1+2 \sum_{n=1}^N (\cos n(x-y))] \frac{f(y)}{2 \pi} d y \\
& =\int_{-\pi}^\pi K_N(x-y) f(y) \frac{d y}{2 \pi}
\end{aligned}
$$

Lost?

$$
\begin{aligned}
\frac{a_0}{2}=\frac{1}{2 \pi} \int_{-\pi}^\pi f\left(y\right) dy \quad \\
a_k=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(y\right) \operatorname{cos}\left(ky\right) d y \\
b_k=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(y\right) \operatorname{sin}\left(ky\right) d y
\end{aligned}
$$
