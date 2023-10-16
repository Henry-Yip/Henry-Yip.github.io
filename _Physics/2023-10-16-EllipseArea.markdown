---
layout: single
title: Area of Ellipse
katex: True
tags: Physics
authors: Henry
toc: true
toc_label: "Area of Ellipse"
toc_sticky: true
permalink: /physics/Ellipse/
header:
  teaser: /assets/images/Astro.png
sidebar:
 nav: "Physics"
---

**Targeted Audience: Year 1/2 Math/Physics majors**

Multivariable Calculus is a prerequisite.

# Statement
Green's Theorem are closely related to Areas. This is rarely explained in lectures and is worth a discussion:

An Ellipse with semi-major axis **a** and semi-minor axis **b**  has area $$\pi ab $$

# Proof
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

**Collorary**: A Circle with radius $$r$$ has area $$ \pi r^2$$. The proof is trivial and is left as an exercise for the reader
