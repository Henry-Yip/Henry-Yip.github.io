---
layout: single
title: Small Perbuations
katex: True
tags: Physics
authors: Henry
toc: true
toc_label: "Small Perbuations"
toc_sticky: true
permalink: /Physics/HKDSE/
header:
  teaser: /assets/images/Astro.png
sidebar:
 nav: "Physics"
---

## Orbit Equation:
Using the knowledge from Appendix B, we can quite easily deduce the orbit equation:

$$
\ddot{r}-\frac{h^2}{r^3}=\frac{F_r(r)}{m} .
$$

I'll leave this as an exercise for the reader. 

```bash
Hint 1: We're dealing with Central Force, only radial force matters
```
```bash
Hint 2: Use Newton's Second Law
```

I enjoy the physics of small perbuations, especially in classical mechanics. 
First, assume a small perbuation around a circle with radius $$a$$ *i.e.* $$r(t)=a+\rho(t)$$ with $$\rho(0) \ll a$$. substitute into our orbit equation we have:

$$
\ddot{\rho}-\frac{h^2}{(a+\rho)^3}=\frac{F_r(a+\rho)}{m} .
$$

Here we'll use binomial expansion for negative coefficients. For more details view the wikipedia page for [Negative Binomial Distribution](https://en.wikipedia.org/wiki/Negative_binomial_distribution)

However there's a nice trick using taylor series, which I'll explain in [Appendix D]({% link _Physics/2022-12-25-Appendix.markdown %})

With the trick explained above we'll get the below:

$$
\ddot{\rho}-\frac{h^2}{a^3}\left(1-3 \frac{\rho}{a}\right)=\frac{F_r(a)}{m}+\frac{d F_r(a)}{d r} \frac{\rho}{m} .
$$

Further rearranging will get you: 

$$
\ddot{\rho}+\left[\frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}\right] \rho=0 .
$$

```bash
Right-Hand-Side surprisingly reduces to 0, can you spot why?
```

I don't know if you have done **Differential Equations** before. Above describes a simple harmonic oscillator with period $$\omega$$, in the form of $$\ddot{\rho}+{\omega}^2 \rho=0$$. Now we'll ensure $$\omega^2>0$$, *s.t.* $$\omega$$ is real, *i.e.*

$$
\frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}>0
$$

Hence if the above stands we have:

$$
\omega^2 \equiv \frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}
$$

This describes a simple harmonic motion with $$\rho(t)=A \cos (\omega t+\phi)$$.

It will look like this:

<iframe src="/assets/Orbit.png" width="713px" height="250px"></iframe>

We have used simple math to analyse the orbit equation! How cool is that!
