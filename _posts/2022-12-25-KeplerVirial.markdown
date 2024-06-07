---
layout: single
title: Two Laws Related to Planetary Revolution 
katex: True
tags: 
 - Classical Mechanics
toc: true
toc_label: "HKDSE"
toc_sticky: true
authors: Henry
sidebar:
 nav: "HKDSE"
---
This post is related to Kepler's Third and Virial's Theorem, twp famous laws related to planets revolution around the sun. Furthermore, Virial's Theorem is very important in statistical mechanics and is seen in Quantum Mechanics also (for example in quantum harmonic oscillators).

## Kepler's Third Law

Using even high school knowledge we can easily deduce Kepler's Third Law as below:

$$
\begin{align}
F=mr \omega^2 &= \frac{GMm}{r^2} \\
 \omega^2 &= \frac{GM}{r^3} \\
 \left (\frac{2 \pi}{T} \right)^2 &=\frac{GM}{r^3} \\
  \left (\frac{4 {\pi}^2}{T^2} \right) &=\frac{GM}{r^3} \\
  T^2&=\frac{4\pi^2}{GM}r^3  \space \space \blacksquare
\end{align}
$$

This is highly significant as periods are much more easily measurable compared to distances. 

### Standard Example

Consider Geostationary Satellites. It takes $$24 \text{ hours} =1440\text{ minutes}=86400 \text{ seconds}$$ for a complete revolution, hence $$T=86400 \text{s}$$. Applying the formula we have $$r^3=\frac{GMT^2} {4\pi^2}$$. Hence $$r=(4.22 \times 10^7)  \text{ m}$$, meaning radius of orbit of geostationary satellite is around $$42200\text{ km}$$ from center of earth! 

Its velocity is: $$v= r \omega= 3070  ms^{-1}$$

### Fun Example
<iframe width="560" height="315" src="https://www.youtube.com/embed/MFcT4Hsx7VQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Estimate Peter Griffin's weight:

With $$T=2.75s$$ and $$r=1m$$, we have $$M=7.82 \times 10^{10} \text{kg} $$. Hmmmm


### Generalized Case


Unfortunately the case above only works for circles. Below I will show it works for all ellispes. 

**Proposition**: $$T^2$$ is proportional to $$a^3$$ for all ellipses, where $$a$$ is the semi-major axis.

**Proof**:

First Note **Kepler's Second Law**, the rate at which the area is swept by the **Radius Vector** (surprising a constant!)

$$
\dot{A}=\frac{d A}{d t}=\frac{r(r d \theta) / 2}{d t}=\frac{1}{2} r^2 \dot{\theta}=\frac{h}{2}
$$

Next, by substitution and using the results from [Area of Ellipse]({% link _posts/2023-10-16-Multivariable_Calc.markdown %}):

$$
\Delta t=\frac{A}{\dot{A}}=\frac{\pi a b}{h / 2}=\frac{2 \pi a b}{h}
$$

Next, I'll state the formulae below without proof. Remember that $$\epsilon$$ is defined by us so the below are *almost* definitions

$$
a=\frac{l}{1-\epsilon^2}, \quad b=a \sqrt{1-\epsilon^2}=\frac{l}{\sqrt{1-\epsilon^2}}
$$

Using $$l=\frac{mh^2}{k}$$, we have:

$$
\Delta t=\frac{2 \pi a b}{h}=\frac{2 \pi}{h} a^2 \sqrt{1-\epsilon^2} \quad \Longrightarrow \quad(\Delta t)^2=\frac{(2 \pi)^2 a^3}{h^2} l=(2 \pi)^2 a^3 \frac{m}{k}
$$

We deduce $$(\Delta t)^2 / a^3=(2 \pi)^2 / G M$$, which is consistent with the analysis from **HKDSE**

### Exercises for the readers
 - Verify that Kepler's Third Law roughly holds for every planet in the solar system. (Difficulty: F4 HKDSE). Hence, plot the best fit line, using the residue sum of squares (Difficulty: University Year 1-2)
 - State Kepler's First and Second Law (Difficulty: HKDSE F6/ University Year 1)

### Credits
The post on Kepler's Third Law is strongly inspired by Prof Arjun Berera's Introductory Dynamics Notes, in the course [PHYS08052](https://www.drps.ed.ac.uk/22-23/dpt/cxphys08052.htm).

## Virial's Theorem

Virial's Theorem relates the average over time of the total kinetic energy of a stable system of discrete particles to its total potential energy. It basically states that the average over time of the total gravitaitonal energy of a stable system of discrete particles is $$-2$$ more compared to its total kinetic energy.

Note that this theorem doens't imply at **all times** the magnitude of gravitational energy is twice of magnitude of kinetic energy, what we have is just a statistical average.

This phenonmoenon is quite surprising because not all paticles have the same orbits while revolving around a star, some have circular and some have really weird shapes. This theorem generalizes for all such orbits shapes however, given that the forces are conservative. 

This theorem is useful for caluclating "Jeans Mass":

### Jeans Mass

The gravitational binding energy of a cloud of mass $$M$$ and size $$R$$ is given by

$$
E_{\text {grav }}=-\frac{3}{5} \frac{G M^2}{R}.
$$

Each particle at temperature $$T$$ has an kinetic energy given by:

$$
E_{\mathrm{KE}}=\frac{3 k T}{2}.
$$

If the gas cloud has $$N$$ particles of mass $$m$$, such that the total mass of the cloud is $$M=Nm$$ we can say that the total thermal kinetic energy of the cloud is:

$$
E_{\text {thermal }}=\frac{3 k T}{2} \frac{M}{m}.
$$

For the gas cloud to collapse,

$$
-E_{\text {grav }} \geq 2 E_{\text {thermal }}.
$$

where the factor of 2 here comes from the **virial theorem**. Hence, the ratio between the mass and radius must be greater than

$$
\frac{M}{R} \geq \frac{5 k T}{G m}.
$$

This is the source of Jeans Mass.


### Intuition behind Virial's Theorem 
Consider a small star with mass $$m$$ rotating around a bigger star with mass $$M$$. We have:

$$
\begin{aligned}
T&=\frac{1}{2}mv^2\\
&=\frac{1}{2}rm\frac{v^2}{r} \\
&=\frac{1}{2}r(ma) \\
&=\frac{GMm}{2r}.
\end{aligned}
$$

On the other hand, we have:
$$V=-\frac{GMm}{r}.$$

Hence the magnitude of gravitational potential energy is twice the magnitude of kinetic energy in this case. 

### Credits
The section is very highly inspired by the Course Notes of [Introductory Astorphysics](http://www.drps.ed.ac.uk/21-22/dpt/cxphys08050.htm). 
