---
layout: single
title: Conservations in Physics - Noether's Theorem 
katex: True
tags: Appendix
toc: true
toc_label: "Appendix"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Appendix"
---
Many things are constant (conserved) in Physics. For example, energy is conserved, center of mass is conserved... Below I will given an example:


$$
\hat{r}=\cos (\theta) \hat{x}+\sin (\theta) \hat{y}, \quad \hat{\theta}=-\sin (\theta) \hat{x}+\cos (\theta) \hat{y} .
$$

By **Chain Rule**,

$$
\dot{\hat{r}}=\dot{\theta}[-\sin (\theta) \hat{x}+\cos (\theta) \hat{y}]=\dot{\theta} \hat{\theta}, \quad \dot{\hat{\theta}}=\dot{\theta}[-\cos (\theta) \hat{x}-\sin (\theta) \hat{y}]=-\dot{\theta} \hat{r} .
$$

And 

$$
\underline{\dot{r}}=\frac{d}{d t}(r \hat{r})=\dot{r} \hat{r}+r \dot{\hat{r}}=\dot{r} \hat{r}+r \dot{\theta} \hat{\theta}
$$

Further Differentiation yields:

$$
\begin{aligned}
\underline{\ddot{r}}=\frac{d}{d t}(\dot{r} \hat{r}+r \dot{\theta} \hat{\theta}) & =\ddot{r} \hat{r}+\dot{r} \dot{\hat{r}}+\dot{r} \dot{\theta} \hat{\theta}+r \ddot{\theta} \hat{\theta}+r \dot{\theta} \dot{\hat{\theta}} \\
& =\ddot{r} \hat{r}+\dot{r} \dot{\theta} \hat{\theta}+\dot{r} \dot{\theta} \hat{\theta}+r \ddot{\theta} \hat{\theta}-r \dot{\theta} \dot{\theta} \hat{r} \\
& =\left(\ddot{r}-r \dot{\theta}^2\right) \hat{r}+(2 \dot{r} \dot{\theta}+r \ddot{\theta}) \hat{\theta}
\end{aligned}
$$

Since the force is a central force, we have:

$$
m\left(\ddot{r}-r \dot{\theta}^2\right) \hat{r}+m(2 \dot{r} \dot{\theta}+r \ddot{\theta}) \hat{\theta}=F_r(r) \hat{r} .
$$

We can quickly identify two equations:

$$
\begin{aligned}
\ddot{r}-r \dot{\theta}^2 & =F_r(r) / m \\
2 \dot{r} \dot{\theta}+r \ddot{\theta} & =0 .
\end{aligned}
$$

From the second equation

$$
\frac{1}{r} \frac{d}{d t}\left(r^2 \dot{\theta}\right)=0 \quad \Longrightarrow \quad r^2 \dot{\theta} \equiv h=\text { const }
$$

$$
\underline{L}=\underline{r} \times \underline{p}=m r \hat{r} \times \underline{\dot{r}}=m r \hat{r} \times(\dot{r} \hat{r}+r \dot{\theta} \hat{\theta})=m r \hat{r} \times r \dot{\theta} \hat{\theta}=m r^2 \dot{\theta} \hat{n} \equiv m h \hat{n}
$$

Hence:

$$r^2 \dot{\theta} \equiv h=\frac{|\underline{L}|}{m}$$

$$\blacksquare$$

Hecen $$h$$ is the constant we have here. 

## Noether's Theorem

Noether's Theorem stated that every continuous symmetry of the action of a physical system with conservative forces has a corresponding conservation law.  

Action is the integral of Lagrangian over time. 

So what are conserved?

Homogeneity of space implies conservation of total momentum and isotropy of space implies conservation of total angular momentum.

The later is what we proved above as central force is a conservative force and space is assumed as isotropy in dynamics (usually!)

Also observe that:

$$
\begin{array}{ll}
\mathcal{L} \text { invariant under: } & \text { Conserved Quantity } \\
\hline q_j \rightarrow q_j+\lambda & p_j \\
t \rightarrow t+\lambda & h=\sum_j p_j \dot{q}_j-\mathcal{L}
\end{array}
$$

where the reader may know that $$h$$ is closed related to Hamiltonian Dynamics.

**TO BE CONTINUED!**










