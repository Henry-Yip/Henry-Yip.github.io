---
layout: single
title: Two Particles Collision
katex: True
tags: 
 - Classical Mechanics
toc: true
toc_label: "Two Particles Collision"
toc_sticky: true
sidebar:
 nav: "Two Particles Collision"
---
Two point masses $$m_1$$ and $$m_2$$ are spaced apart in a vacuum in space, with no other forces present other than the gravitational force between them. At what time will they meet in the center?

With **object 1** on the left and **object 2** on the right, we can define these below:    

$$
\begin{align}
F_{21}&=G \frac{m_1 m_2}{\left(x_2-x_1\right)^2}=m_1 \ddot{x}_1 \\
-F_{21}&=-G \frac{m_1 m_2}{\left(x_2-x_1\right)^2}=m_2 \ddot{x}_2
\end{align}
$$

Therefore the accelerations are given by:

$$
\begin{align}
G \frac{m_2}{\left(x_2-x_1\right)^2}&=\ddot{x}_1
-G \frac{m_1}{\left(x_2-x_1\right)^2}&=\ddot{x}_2
\end{align}
$$


Subtracting these two equations will get us:

$$
\ddot{x}_2-\ddot{x}_1=\frac{d^2}{d t^2}\left(x_2-x_1\right)=-G \frac{M}{\left(x_2-x_1\right)^2}
$$

Notice that we have taken $$M=m_1+m_2$$ for convenience.

Next, by defining $$r=x_2-x_1$$, we have the standard result:

$$
\ddot{r}=-G \frac{M}{r^2}
$$

Multiply both sides by $$\dot{r}$$:

$$
\dot{r}\ddot{r}=-G \frac{M}{r^2} \dot{r}
$$


$$
\begin{align}
\frac{d}{dt}\left(\frac{1}{2}\dot{r}^2\right)&=-G \frac{M}{r^2} \left(\frac{dr}{dt}\right) \\
\int_{0}^{T}\frac{d}{dt}\left(\frac{1}{2}\dot{r}^2\right) dt&= \int_{0}^{T}-G \frac{M}{r^2} \left(\frac{dr}{dt}\right) dt
\end{align}
$$

This is not a calculus article so I won't discuss the rigor behind. If you want to be rigorous you can do it yourself!

$$
\begin{align}
\frac{1}{2}\dot{r}^2 &= \int_{R}^{r} -G \frac{M}{r^2} \, dr \\
\left(\frac{dr}{dt}\right)^2 &= 2GM\left[\frac{1}{r}-\frac{1}{R}\right] \\
\frac{dr}{dt} &= -\sqrt{2GM\left[\frac{1}{r}-\frac{1}{R}\right]}
\end{align}
$$

Where we take the negative square root as $$v$$ is positive

$$
\begin{align}
\frac{dr}{-\sqrt{ 2GM \left[\frac{1}{r}-\frac{1}{R}\right]}} &=dt \\
\sqrt{\frac{Rr}{R-r}} dr  &=-\sqrt{2GM}  dt \\
\sqrt{\frac{r}{R-r}} dr &= -\sqrt \frac{2GM}{R} dt \\
\int_{R}^{0}\sqrt{\frac{r}{R-r}} dr  &= -\sqrt \frac{2GM}{R} T
\end{align}
$$

Let's plug the left integral to **Mathematica**:


{% responsive_image path:"assets/images/Mathematica.png" %}

Hence we have:

$$\frac{-\pi R}{2}= -\sqrt\frac{2GM}{R} T$$

Resolving it will get us:

$$
T= \frac{\pi}{2} \sqrt{\frac{R^3}{2GM}}
$$

As expected.

### Credits

I am heavily inspired by [1](https://www.physicsforums.com/threads/remarkably-difficult-newtonian-problem.360987/#post-2497098) and [2](https://physics.stackexchange.com/questions/34366/time-taken-for-object-in-space-to-fall-to-earth):