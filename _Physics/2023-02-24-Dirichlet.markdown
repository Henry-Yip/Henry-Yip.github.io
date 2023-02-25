---
layout: single
title: Dirichlet's Kernel and Convergence 
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /Physics/FourierSeries/
tag: Physics
toc: true
toc_label: "Fourier Series"
toc_sticky: true
sidebar:
 nav: "Physics"
---
### A Natural Introduction

**Dirichlet's Kernel** is intimately related to **Fourier Series**, by design.

Below we take $$f(x)$$ to be periodic with period $$2π$$, continuous, finite, and have continuous and finite first derivative. Now consider the fourier series approximation to the $$N$$th term:

In case you aren't familiar with *Fourier Series*, here is a brief reminder:

Within the interval $$−L \leq x \leq L$$, we can approximate the function $$f(x)$$ as:

$$
\begin{aligned}
f(x) & =\frac{1}{2} a_0+\sum_{n=1}^{\infty} a_n \cos \left(\frac{n \pi x}{L}\right)+\sum_{n=1}^{\infty} b_n \sin \left(\frac{n \pi x}{L}\right) \\
& =\frac{1}{2} a_0+\sum_{n=1}^{\infty}\left[a_n \cos \left(\frac{n \pi x}{L}\right)+b_n \sin \left(\frac{n \pi x}{L}\right)\right]
\end{aligned}
$$

Where we have:

$$
\begin{aligned}
\frac{a_0}{2}=\frac{1}{2 \pi} \int_{-\pi}^\pi f\left(x\right) dx \quad \\
a_n=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(x\right) \operatorname{cos}\left(nx\right) d x \\
b_n=\frac{1}{2 \pi} \int_{-\pi}^\pi  f\left(x\right) \operatorname{sin}\left(nx\right) d x
\end{aligned}
$$

Using the information above, we can deduce (with a bit of algebraic manipulation): 

$$
\begin{aligned}
f_N(x) & =\frac{a_0}{2}+\sum_{n=1}^N\left(a_n \cos n x+b_n \sin n x\right) \\
& =\int_{-\pi}^\pi[1+2 \sum_{n=1}^N (\cos n y \cos n x+\sin n y \sin n x)] \frac{f(y)}{2 \pi} d y \\
&=\int_{-\pi}^\pi[1+2 \sum_{n=1}^N (\cos n(x-y))] \frac{f(y)}{2 \pi} d y \\
& =\int_{-\pi}^\pi K_N(x-y) f(y) \frac{d y}{2 \pi}
\end{aligned}
$$


Hence (after switching variables) we can *naturally* define Dirichlet's Kernel as below:

$$
K_N(\theta)=1+2 \sum_{n=1}^N \cos n \theta,
$$


### A Better Form
Using Euler's Formula $$ e^{i \theta}=\cos \theta+i \sin \theta $$, we can deduce:

$$
K_N(\theta)=\sum_{k=-N}^N e^{i k \theta}=\left(1+2 \sum_{k=1}^N \cos (k \theta)\right)=\frac{\sin ((N+1 / 2) \theta)}{\sin (\theta / 2)}
$$  

 - Hint: $$e^{-i \theta}=\cos \theta-i \sin \theta$$, then cancel out terms

We can use Desmos to see how it looks like:

<iframe src="https://www.desmos.com/calculator/5l0s8t96rq?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

### Error Terms
Going back to $$f_N(x)$$, which is our fourier approximate for our (specifically defined) function, we can shift the variables around:

$$
\begin{align}
f_N(x)
&=\int_{-\pi}^\pi K_N(y-x) f(y) \frac{d y}{2 \pi}\\
&=\int_{-\pi-x}^{\pi-x} K_N(\theta) f(x+\theta) \frac{d \theta}{2 \pi} 
\end{align}
$$

Note that our function has period $$2\pi$$, hence we can imagine shifting the function and getting the same result:

$$
\begin{align}
\int_{-\pi}^\pi K_N(\theta) f(x+\theta) \frac{d \theta}{2 \pi}
\end{align}
$$


For illustration, consider $$f(x)=\frac{1+ \sin x}{2}$$

```bash
It is called Hacovercosine. Such a cool name!
```

<iframe src="https://www.desmos.com/calculator/st6tgiveja?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>


Now considering the error term: 

$$
\begin{align}
f_N(x)-f(x) 
&=f_N(x)-f(x) \int_{-\pi}^\pi K_N(\theta) \frac{d \theta}{2 \pi} \\
&=\int_{-\pi}^\pi K_N(\theta)[f(x+\theta)-f(x)] \frac{d \theta}{2 \pi} \\
&=\int_{-\pi}^\pi g(\theta) \sin \left[\left(N+\frac{1}{2}\right) \theta\right] \frac{d \theta}{2 \pi}
\end{align}
$$

where

$$
g(\theta)=\frac{f(x+\theta)-f(x)}{\sin \frac{1}{2} \theta}
$$

We have used the property:

$$\int_{-\pi}^\pi K_N(\theta) \frac{d \theta}{2 \pi}$$



