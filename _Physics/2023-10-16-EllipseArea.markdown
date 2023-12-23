---
layout: single
title: Multivariable Calculus
katex: True
tags: Physics
authors: Henry
toc: true
toc_label: "Area of Ellipse"
toc_sticky: true
permalink: /physics/Ellipse/
sidebar:
 nav: "Physics"
---

**Targeted Audience: Year 1/2 Math/Physics majors**

Multivariable Calculus is a prerequisite.

# Statement

An Ellipse with semi-major axis **a** and semi-minor axis **b**  has area $$\pi ab $$

# Proof
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

$$\blacksquare$$

**Collorary**: A Circle with radius $$r$$ has area $$ \pi r^2$$. The proof is trivial and is left as an exercise for the reader.

# Generalized Stokes' Theorem

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






