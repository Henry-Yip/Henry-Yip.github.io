---
layout: single
title: More on Multivariable Calculus
katex: True
tags: Calculus
toc: true
toc_label: "Multivaribale Calculus"
toc_sticky: true
sidebar:
 nav: "Multivaribale Calculus"
---

This section covers the content usually omitted in Calculus 3
 - Area Estimation using Green's Theorem
 - An example using Generalized Stoke's Theorem 
 - Curl and Divergence in generalized OCCs (Orthogonal Curvilinear Coordinates)


## Area Estimation using Green's Theorem

I will illustrate this section using an example:

An ellipse with semi-major axis **a** and semi-minor axis **b**  has area $$\pi ab $$

## Proof
There are many ways to approach this problem. Proofwiki provides [2 methods](https://proofwiki.org/wiki/Area_of_Ellipse) to do it, but they are considerably tedious and non-elegant. 

Here we will use the powerful Green's Theorem, which is closely related to Areas (Since it is the 2D version of Stoke's theorem). This is rarely explained in lectures and is worth a discussion:

Consider **Green's Theorem** (Stoke's Theorem on $$xy$$ plane):

$$
\oint_C(P d x+Q d y)=\iint_D\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right) d x d y
$$

We aim to find polynomials such that $$\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=1$$

Say $$P(x,y)=-\frac{1}{2}y$$ and $$Q(x,y)=\frac{1}{2}x$$

So we can estimate the area (denote by $$A$$) as:

$$A=\frac{1}{2} \oint_C(x dy-ydx)$$

Using the standard parameterization of an ellipse (see below), we can quickly calculate $$A$$

$${\displaystyle (x,y)=(a\cos(t),b\sin(t))\quad {\text{for}}\quad 0\leq t\leq 2\pi }$$

$$
\begin{aligned}
A & =\frac{1}{2} \int_C x d y-y d x=\frac{1}{2} \int_0^{2 \pi}[(a \cos t)(b \cos t) d t-(b \sin t)(-a \sin t) d t] \\
& =\frac{a b}{2} \int_0^{2 \pi} d t=\pi a b
\end{aligned}
$$

The reader can show as an exercise (*) that : 

$$
\begin{align*}
A &= \oint_C x \, dy \\
  &= -\oint_C y \, dx \\
  &= \frac{1}{2} \oint_C \left(x \, dy - y \, dx\right)
\end{align*}
$$

### Exercises for the reader
 - Show that the area of the circle is $$\pi r^2$$ (Difficulty: HKDSE F3)
 - Show that the area of the area enclosed by $$x = r(t - \sin t), y = r(1 - \cos t)$$ and the $$x$$-axis is $$3 \pi r^2$$. (Difficulty: University Year 1-2)
 - Give a proof for the exercise (marked as *) above. Explain why this may be a faster method for calculating exercise 2.  (Difficulty: University Year 1-2)
 
## Generalized Stokes' Theorem

For a sphere, consider:
$$
\alpha=x^1 d x^2 \wedge d x^3 .
$$

Consider:

$$x^1=\sin\alpha\cos\phi$$

$$x^2=\sin\alpha\sin\phi$$

$$x^3=\cos\alpha$$

Thus:
$$\alpha=\sin ^3 \alpha \cos ^2 \phi d \alpha \wedge d \phi $$

This is clearly a surface integral. Hence, we have: 

$$
\int_{\partial\Sigma} \alpha=\int_{\alpha=0}^\pi \int_{\phi=0}^{2 \pi} \sin ^3 \alpha \cos ^2 \phi d \alpha d \phi=\frac{4 \pi}{3} .
$$

On the other hand, we have:
$$
d \alpha=d x^1 \wedge d x^2 \wedge d x^3
$$
and so

$$
\int_{\Sigma} d \alpha=\int_{\Sigma} d  x^1 \wedge d x^2 \wedge d x^3=  \int_{0}^{2\pi} \int_{0}^{ \pi} 
\int_{0}^{1} (r^2 \sin \phi) dr  d\alpha d\phi = \frac{4}{3} \pi 
$$

Hence we have showed that Generalized Stokes' Theorem: 
$$\int_{\Sigma} d \alpha=\int_{\partial \Sigma} \alpha$$

works on a unit sphere. 

### Exercises for the reader
 - Given $$\alpha = x^1 d x^2 \wedge d x^3$$, verify $$d \alpha = d x^1 \wedge d x^2 \wedge d x^3$$  (Difficulty: University Year 3)
 - State the Generalized Stokes' Theorem (Difficulty: University Year 3)

## Green's Theorem (Special Case)

It appears that we can arrive one of the results in section 1 using wedge products. 

$$
\text { Area of } D=\iint_D d x d y=-\int_C y d x
$$

First, consider: $$d\alpha=dy \wedge dx$$. We can easily see that $$\alpha=ydx$$

$$
\text { Area of } D=\iint_\Sigma d x \wedge d y=-\iint_\Sigma d y \wedge d x=-\iint_\Sigma d\alpha=-\int_{\partial \Sigma} \alpha=-\int_{\partial \Sigma} ydx
$$

For the general case, using Generalized Stokes' Theorem , we can consider: 

$$
\int_{\partial D} P d x+Q d y=\iint_{D}dP \wedge dx+dQ \wedge dy
$$

As:

$$d P=\sum_{i=1}^n \frac{\partial P}{\partial x^i} d x^i$$

We have:

$$\iint_{D}\frac{\partial P}{\partial y} d y \wedge dx+\frac{\partial Q}{\partial x} dx \wedge dy = \iint_{D}\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dxdy $$

So:

$$\int_{\partial D} P d x+Q d y=\iint_{D}\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dxdy$$

The astute reader can realized that this is Green's Theorem - Stokes' Theorem in 2D!

An alternative proof can be found in [Toby Lam's Post](https://tobylam.xyz/2023/12/15/understanding-greens-theorem)

## Multivariable Calculus in other coordinate systems:

This section is inspired by [Dr BJ Pendelton's Electromagnetism and Relativity Notes](https://www2.ph.ed.ac.uk/~bjp/emr/emr.pdf):

We will start from the results of cylindrical Coordinate System: Below I will compute the scale factors and the unit vectors, as a basic exercise.

We know: $$\underline{r} = r \sin \theta \cos \phi \underline{e}_x + r \sin \theta \sin \phi \underline{e}_y + r \cos \theta \underline{e}_z$$. Hence:

$$
\begin{aligned}
\frac{\partial \underline{r}}{\partial r} &= \sin \theta \cos \phi \underline{e}_x + \sin \theta \sin \phi \underline{e}_y + \cos \theta \underline{e}_z \Rightarrow h_r = \left|\frac{\partial \underline{r}}{\partial r}\right| = 1 \\
\frac{\partial \underline{r}}{\partial \theta} &= r \cos \theta \cos \phi \underline{e}_x + r \cos \theta \sin \phi \underline{e}_y - r \sin \theta \underline{e}_z \Rightarrow h_\theta = \left|\frac{\partial \underline{r}}{\partial \theta}\right| = r \\
\frac{\partial \underline{r}}{\partial \phi} &= -r \sin \theta \sin \phi \underline{e}_x + r \sin \theta \cos \phi \underline{e}_y \Rightarrow h_\phi = \left|\frac{\partial \underline{r}}{\partial \phi}\right| = r \sin \theta
\end{aligned}
$$

Therefore, the unit vectors are:

$$
\begin{aligned}
& \underline{e}_r=\sin \theta \cos \phi \underline{e}_x+\sin \theta \sin \phi \underline{e}_y+\cos \theta \underline{e}_z\\
& \underline{e}_\theta=\cos \theta \cos \phi \underline{e}_x+\cos \theta \sin \phi \underline{e}_y-\sin \theta \underline{e}_z \\
& \underline{e}_\phi=-\sin \phi \underline{e}_x+\cos \phi \underline{e}_y
\end{aligned}
$$

### Divergence:

In general, given the scale factors, we have: 

$$
\underline{\nabla} \cdot \underline{a}=\frac{1}{h_1 h_2 h_3}\left\{\frac{\partial}{\partial u_1}\left(a_1 h_2 h_3\right)+\frac{\partial}{\partial u_2}\left(a_2 h_3 h_1\right)+\frac{\partial}{\partial u_3}\left(a_3 h_1 h_2\right)\right\}
$$

In our case of cylindrical coordinates, we have:

$$
\begin{aligned}
\underline{\nabla} \cdot \underline{a}(r, \theta, \phi) & =\frac{1}{r^2 \sin \theta}\left\{\frac{\partial}{\partial r}\left(r^2 \sin \theta a_r\right)+\frac{\partial}{\partial \theta}\left(r \sin \theta a_\theta\right)+\frac{\partial}{\partial \phi}\left(r a_\phi\right)\right\} \\
& =\frac{1}{r^2} \frac{\partial}{\partial r}\left(r^2 a_r\right)+\frac{1}{r \sin \theta}\left\{\frac{\partial}{\partial \theta}\left(\sin \theta a_\theta\right)+\frac{\partial}{\partial \phi}\left(a_\phi\right)\right\}
\end{aligned}
$$

### Curl 

For curl we have: 

$$
\underline{\nabla} \times \underline{a}=\frac{1}{h_1 h_2 h_3}\left|\begin{array}{ccc}
h_1 \underline{e}_1 & h_2 \underline{e}_2 & h_3 \underline{e}_3 \\
\frac{\partial}{\partial u_1} & \frac{\partial}{\partial u_2} & \frac{\partial}{\partial u_3} \\
h_1 a_1 & h_2 a_2 & h_3 a_3
\end{array}\right|
$$

In the special case of spherical polars we have:

$$
\underline{\nabla} \times \underline{a}=\frac{1}{r^2 \sin \theta}\left|\begin{array}{ccc}
\underline{e}_r & r \underline{e}_\theta & r \sin \theta \underline{e}_\phi \\
\frac{\partial}{\partial r} & \frac{\partial}{\partial \theta} & \frac{\partial}{\partial \phi} \\
a_r & r a_\theta & r \sin \theta a_\phi
\end{array}\right|
$$

### Laplacian

As for the Laplacian (scalar field), we have:

$$
\nabla^2 f=\frac{1}{h_1 h_2 h_3}\left\{\frac{\partial}{\partial u_1}\left(\frac{h_2 h_3}{h_1} \frac{\partial f}{\partial u_1}\right)+\frac{\partial}{\partial u_2}\left(\frac{h_3 h_1}{h_2} \frac{\partial f}{\partial u_2}\right)+\frac{\partial}{\partial u_3}\left(\frac{h_1 h_2}{h_3} \frac{\partial f}{\partial u_3}\right)\right\}
$$

In the special case of spherical polars, we have:

$$
\begin{aligned}
\nabla^2 f(r, \theta, \phi) & =\frac{1}{r^2 \sin \theta}\left\{\frac{\partial}{\partial r}\left(r^2 \sin \theta \frac{\partial f}{\partial r}\right)+\frac{\partial}{\partial \theta}\left(\sin \theta \frac{\partial f}{\partial \theta}\right)+\frac{\partial}{\partial \phi}\left(\frac{1}{\sin \theta} \frac{\partial f}{\partial \phi}\right)\right\} \\
& =\frac{1}{r^2} \frac{\partial}{\partial r}\left(r^2 \frac{\partial f}{\partial r}\right)+\frac{1}{r^2 \sin ^2 \theta}\left\{\sin \theta \frac{\partial}{\partial \theta}\left(\sin \theta \frac{\partial f}{\partial \theta}\right)+\frac{\partial^2 f}{\partial \phi^2}\right\}
\end{aligned}
$$


### Exericses for the reader
 - Write down the all the case for cylindrical coordinates and spherical polars (Difficulty: University Year 2)
 
 Last Updated - 4/6/2024










