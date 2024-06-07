---
layout: single
title: Integration by Laplace Transform
katex: True
tags: 
 - Calculus
toc_label: "Theorema Egregium"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Theorema Egregium"
---

Laplace Transform is usually used to "decompose" a function into its constituents, or to solve differential equations. However, it can also be used to solve integrals. Below, I will show how it can be used to prove:

$$\int_0^{\infty} \frac{\sin(x)}{x} \, dx=\frac{\pi}{2}$$

## Transforming the problem into a Laplace Transformation Problem

Observe that for any $$g(t)$$,

$$
\mathcal{L}\{g(t)\}=F(s)=\int_0^{\infty} e^{-s t} g(t) d t.
$$

Taking $$s=0$$, we obtain:

$$\int_0^{\infty} g(t) d t$$

Now, we simply substitute $$g(t)=\frac{\sin(t)}{t}$$ and solve the Laplace Transformation. 

## Solving the Laplace Transformation
Recall:

$$
\mathcal{L}\{\sin t\}=\frac{1}{s^2+1} .
$$

Next, use the standard result:

$$
\mathcal{L}\left[\frac{f(t)}{t}\right]=\int_s^{\infty} F(s) d s
$$

Where $$F(s)$$ is the Laplace Transformation of $$f(t)$$. 

Combining the results, we arrive at: 

$$
\begin{align}
\mathcal{L}\left[\frac{\sin(t)}{t}\right]&=\int_s^{\infty} \frac{1}{s^2+1} d s \\
&=\frac{\pi}{2}-\arctan(s)
\end{align}
$$

Taking $$s=0$$ we obtain $$\frac{\pi}{2}$$ as expected.

Therefore,

$$\int_0^{\infty} \frac{\sin(x)}{x} \, dx=\frac{\pi}{2}$$

As required!


## Credits
The post is inspired by [this video](https://www.youtube.com/watch?v=Tqk1nyUU-RU).

## Exercises for the reader

Using the same technique, calculate

$$
\int_0^{\infty} \frac{1-\cos t}{t e^t} d t
$$

The answer is presented by [blackpenredpen](https://www.youtube.com/c/blackpenredpen):

<iframe width="560" height="315" src="https://www.youtube.com/embed/p8ok5QNNlsc?si=qd9EJedG2HnrgaNz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
