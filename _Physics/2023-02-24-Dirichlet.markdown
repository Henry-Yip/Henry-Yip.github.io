---
layout: single
title: Analysis/Fourier Series
katex: True
permalink: /physics/FourierSeries/
tag: Physics
toc: true
toc_label: "Fourier Series"
toc_sticky: true
sidebar:
 nav: "Physics"
---

## Start Here if you don't know Fourier Series

A fourier series decomposes a function into trigonometric 
By adding more and more trigonometric functions together, the summation itself looks more and more like the original function. Look at the graph below, does it look like a sawtooth over time?

<iframe src="https://www.desmos.com/calculator/u1rkoxoa9g?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

The equation above is:

$$1+\frac{4}{\pi}\sum_{n=1}^{m}\frac{\sin\left(\pi nx\right)}{n}$$

Where we increased $$m$$ over time. For $$m=1000$$, we can get the below:

<iframe src="https://www.desmos.com/calculator/zkpjqzfqcj?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

Fourier Series doesn't work for all functions, there are certain restrictions.

Fourier Series is surprisingly helpful and concise in solving some neat mathematical problems, like [Basel Problem](https://en.wikipedia.org/wiki/Basel_problem#A_proof_using_Fourier_series):

<iframe width="560" height="315" src="https://www.youtube.com/embed/MAoI__hbdWM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

To understand how and why fourier series work, we can study its convergence (pointwise convergence, $$L^2$$ convergence, *etc*). However, this is slightly too difficult without knowing [Bessel's inequality](https://en.wikipedia.org/wiki/Bessel%27s_inequality)/[Parseval's Theorem](https://en.wikipedia.org/wiki/Parseval%27s_theorem   )

## Start Here if you know Fourier Series
The section below is partly inspired by this amazing video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/S3gGKZqQNlc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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
a_m & =\frac{1}{L} \int_{-L}^L d x \cos \left(\frac{m \pi x}{L}\right) f(x) \\
\text { Similarly, } \quad b_m & =\frac{1}{L} \int_{-L}^L d x \sin \left(\frac{m \pi x}{L}\right) f(x) .
\end{aligned}
$$

However, considering our limit: $$-\pi \leq L \leq \pi$$, we can deduce the below:

$$
\begin{aligned}
\frac{a_0}{2}=\frac{1}{2 \pi} \int_{-\pi}^\pi f\left(x\right) dx \quad \\
a_n=\frac{1}{ \pi} \int_{-\pi}^\pi  f\left(x\right) \operatorname{cos}\left(nx\right) d x \\
b_n=\frac{1}{ \pi} \int_{-\pi}^\pi  f\left(x\right) \operatorname{sin}\left(nx\right) d x
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

### Fourier Series Estimation
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


For illustration, consider $$f(x)=\frac{1+ \sin x}{2}$$. Notice the area between the vertical moving line never changes. 

```bash
It is called Hacovercosine. Such a cool name!
```

<iframe src="https://www.desmos.com/calculator/st6tgiveja?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

I hope the above shows you some intuition regarding Dirichlet's Kernel.

