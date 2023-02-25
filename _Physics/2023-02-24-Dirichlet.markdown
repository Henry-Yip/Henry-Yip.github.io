---
layout: single
title: Dirichlet's Kernel and Convergence 
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

Lost? Here are some hints:

$$
\begin{aligned}
\frac{a_0}{2}=\frac{1}{2 \pi} \int_{-\pi}^\pi f\left(y\right) dy \quad \\
a_k=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(y\right) \operatorname{cos}\left(ky\right) d y \\
b_k=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(y\right) \operatorname{sin}\left(ky\right) d y
\end{aligned}
$$

Hence we can naturally define Dirihlet's Kernel as below:
$$
K_N(\theta)=1+2 \sum_{n=1}^N \cos n \theta,
$$

 - Side Note: Above is an example of **Convolution**. See my Appendix for more details!
 - We take f(x) to be periodic with period $$2π$$,  continuous, finite, and have continuous and finite first derivative


### A Better Form

$$
K_N(\theta)=\sum_{k=-N}^N e^{i k \theta}=\left(1+2 \sum_{k=1}^N \cos (k \theta)\right)=\frac{\sin ((N+1 / 2) \theta)}{\sin (\theta / 2)}
$$  

We can use Desmos to see how it looks like:

<iframe src="https://www.desmos.com/calculator/xf38gucws5?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>  

### Error Terms
Going back to $$f_N(x)$$, which is our fourier approximate for our (specifically defined) function, we can shift the variables around:

$$
\begin{align}
f_N(x)=\int_{-\pi}^\pi K_N(y-x) f(y) \frac{d y}{2 \pi} \\
&=\int_{-\pi-x}^{\pi-x} K_N(\theta) f(x+\theta) \frac{d \theta}{2 \pi} \\
\end{align}
$$

Note that our function has period $$2\pi$$, hence we can imagine shifting the function and getting the same result:

For illustration:

<iframe src="https://www.desmos.com/calculator/st6tgiveja?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

$$
\begin{align}
\int_{-\pi}^\pi K_N(\theta) f(x+\theta) \frac{d \theta}{2 \pi}



Now considering the error term: 
$$
f_N(x)-f(x)=f_N(x)-f(x) \int_{-\pi}^\pi K_N(\theta) \frac{d \theta}{2 \pi}=\int_{-\pi}^\pi K_N(\theta)[f(x+\theta)-f(x)] \frac{d \theta}{2 \pi}=\int_{-\pi}^\pi g(\theta) \sin \left[\left(N+\frac{1}{2}\right) \theta\right] \frac{d \theta}{2 \pi}
$$

where
$$
g(\theta)=\frac{f(x+\theta)-f(x)}{\sin \frac{1}{2} \theta}
$$




