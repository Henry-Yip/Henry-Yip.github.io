---
layout: single
title: Perturbations - A view on Classical Mechanics and Quantum Mechanics
katex: True
tags: Small perturbations
toc: true
toc_label: "Small Perturbations"
toc_sticky: true
authors: Henry
sidebar:
 nav: "SmallPerturbations"
---
"Perturbations" have vastly different meanings in classical mechanics and quantum physics. They both mean a small "deviation" from the origin, however.

**Note: The notes here are very heavily inspired by the notes written by Prof Arjun Berera, who has taught me both Introductory Dynamics (PHYS08052) and Principles of Quantum Mechanics (PHYS10094)**

## Classical Perturbation
Disturbing a system in classical mechanics usually results in (damped) simple harmonic motion: By $$F=ma$$, we have $$F=m\ddot{x}$$. If there is a restoring force with different direction compared to direction of motion, we get $$-\alpha x=m \ddot{x}$$, where $$\alpha \in \mathbb{R}_+$$. This is solved using a sinusoidal ansatz. This corresponds to simple harmonic motion!

Now, refering to my post in [Conservations in Physics]({% link _posts/2022-12-25-Conservations.markdown %}), we can quickly obtain:

$$
\ddot{r}-\frac{h^2}{r^3}=\frac{F_r(r)}{m} 
$$

I'll leave this as an exercise for the reader. 

```bash
Hint 1: We're dealing with Central Force, only radial force matters
```
```bash
Hint 2: Use Newton's Second Law
```
Now consider the question below:

There is a small perbuation around a circle with radius $$a$$ *i.e.* $$r(t)=a+\rho(t)$$ with $$\rho(0) \ll a$$. How will the orbit look like?

Substituting into our orbit equation we have:

$$
\ddot{\rho}-\frac{h^2}{(a+\rho)^3}=\frac{F_r(a+\rho)}{m} 
$$

Here we'll use binomial expansion for negative coefficients. For more details view the wikipedia page for [Negative Binomial Distribution](https://en.wikipedia.org/wiki/Negative_binomial_distribution)

However there's a nice trick by differentiating the taylor series.

$$
\ddot{\rho}-\frac{h^2}{a^3}\left(1-3 \frac{\rho}{a}\right)=\frac{F_r(a)}{m}+\frac{d F_r(a)}{d r} \frac{\rho}{m} 
$$

Further rearranging will get you: 

$$
\ddot{\rho}+\left[\frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}\right] \rho=0 
$$

```bash
Right-Hand-Side surprisingly reduces to 0, can you spot why?
```

Assuming knowledge from **Differential Equations**, we have a simple harmonic oscillator with period $$\omega$$, in the form of $$\ddot{\rho}+{\omega}^2 \rho=0$$. Now we'll ensure $$\omega^2>0$$, *s.t.* $$\omega$$ is real, *i.e.*

$$
\frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}>0
$$

Hence if the above stands we have:

$$
\omega^2 \equiv \frac{3 h^2}{a^4}-\frac{1}{m} \frac{d F_r(a)}{d r}
$$

This describes a simple harmonic motion with $$\rho(t)=A \cos (\omega t+\phi)$$.

The picture below will confirm our intuition is indeed correct!

{% responsive_image path:"assets/Orbit.png" %}


## Quantum Perturbation

Assume the Hamiltonian $$H$$ cannot be solved analytically. However, if it is *close* to a solvable Hamiltonian, say $$H_0$$, there are ways to approximate it. This technique is called "Perturbation" and the theory is called "Perturbation Theory". i.e., we have: 

$$\hat{H}=\hat{H_0}+\hat{H'}$$

For simplicity, we assume the system does not have "degeneracy", i.e., each eigenvalue only corresponds to an eigenvector, or, if you are mathematically minded, the geometric multiplicity is smaller than the algebraic multiplicity. 

By doing a taylor series, we obtain: (the eigenstates are **no longer normalized**!)

$$E_n=E_n^{(0)}+\lambda E_n^{(1)}+\lambda^2 E_n^{(2)}+...$$

and

$$
|n\rangle=\left|n^{(0)}\right\rangle+\lambda\left|n^{(1)}\right\rangle+\lambda^2\left|n^{(2)}\right\rangle+\ldots
$$

where the (0), (1), (2) implies taking to the 0th, 1st, 2nd order respectively.

If we expand everything, we will get:

$$
\begin{aligned}
& \left(\hat{H}_0+\lambda \hat{H}^{\prime}\right)\left(\left|n^{(0)}\right\rangle+\lambda\left|n^{(1)}\right\rangle+\lambda^2\left|n^{(2)}\right\rangle+\ldots\right)= \\
& \quad\left(E_n^{(0)}+\lambda E_n^{(1)}+\lambda^2 E_n^{(2)}+\ldots\right)\left(\left|n^{(0)}\right\rangle+\lambda\left|n^{(1)}\right\rangle+\lambda^2\left|n^{(2)}\right\rangle+\ldots\right)
\end{aligned}
$$

By comparing terms, we get:

$$
\lambda^1:  \left(\hat{H}_0-E_n^{(0)}\right)\left|n^{(1)}\right\rangle =\left(E_n^{(1)}-\hat{H}^{\prime}\right)\left|n^{(0)}\right\rangle 
$$

Consider Left hand side. From the term:

$$\hat{H}_0 \left|n^{(1)}\right\rangle$$

We can operate $$\langle k^{(0)} \,\lvert$$ and obtain:

$$
\left\langle k^{(0)}\left|\hat{H}_0\right| n^{(1)}\right\rangle = E_k^{(0)}\left\langle k^{(0)} \mid n^{(1)}\right\rangle
$$

Hence we have: 

$$
\begin{aligned}
    &\langle k^{(0)} \lvert \left(\hat{H}_0 - E_n^{(0)}\right) \lvert n^{(1)} \rangle \\
    &\implies (E_k^{(0)}-E_n^{(0)})\left\langle k^{(0)} \mid n^{(1)}\right\rangle=E_n^{(1)} \delta_{k, n}-\left\langle k^{(0)}\left|\hat{H}^{\prime}\right| n^{(0)}\right\rangle
\end{aligned}
$$


Choosing $$k=n$$ will give us:

$$
\begin{aligned}
E_n^{(1)} \delta_{n, n}-\left\langle 
n^{(0)}\left|\hat{H}^{\prime}\right| n^{(0)}\right\rangle=0 \\
\implies E_n^{(1)}=\left\langle 
n^{(0)}\left|\hat{H}^{\prime}\right| n^{(0)}\right\rangle
\end{aligned}
$$

The astute reader will find out that this is an expectation value! So the expected "change in energy" is just the expectation of the perturbation!


### Classic Example

Now consider a standard problem in perturbation:

$$
V(x)=V_0 \cos\left(\frac{\pi x}{2a}\right)
$$ 

between $$-a$$ to $$a$$. What is the ground state perturbation?

From above, we have:

$$
\begin{aligned}
\Delta E_{n} & =\left\langle\psi^{(n)}\mid V \mid \psi^{(n)}\right\rangle \\
& =\int_{-a}^{+a}  \left[\psi^{(n)}(x)^*\right] V(x) \left[\psi^{(n)}(x)\right]  dx
\end{aligned}
$$

Considering :

$$\psi^1(x)=\frac{1}{\sqrt{a}} \cos{\left(\frac{\pi x}{2a}\right)}$$

We can substitute and get:

$$
\begin{aligned}
\Delta E_n&=\frac{V_0}{a} \int_{-a}^{+a} \cos \left(\frac{\pi x}{2 a}\right) \cos \left(\frac{\pi x}{2 a}\right) \cos \left(\frac{\pi x}{2 a}\right) dx \\
&=\frac{2 V_0}{\pi} \int_{-\pi / 2}^{+\pi / 2}  (\cos ^3 \theta)  d\theta\\
&=\frac{8 V_0}{3 \pi} 
\end{aligned}
$$

The details are left for an exercise for the reader/WolfamAlpha!








**TO BE CONTINUED!**



