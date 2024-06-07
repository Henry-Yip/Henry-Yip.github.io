---
layout: single
title: Why is Momentum Conserved?
katex: True
tags: 
 - Classical Mechanics
toc: true
toc_label: "Source of Momentum"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Source of Momentum"
---
In this article we explore the conservation of momentum using Lagrangian Dynamics. 
## Momentum in Physics

Momentum is defined by $$p=mv$$. It is a vector quantity, meaning the direction matters. The derivative of momentum is force. 

In an inertial frame, momentum is a *conserved quantity*, meaning that it is not affected by external forces in a closed system. This is an example of one of the most important concepts in physics - translational symmetry. 

The astute reader can notice that this is highly unobvious --- how can a system allow and ensure a symmetry? Below, I aim to provide a intuitive explanation using more advanced classical mechanics techniques, namely the Lagragian Dynamics Formulation, developed in 1788 by Joseph-Louis Lagrange. 

The equation of motion of an object in Lagrangian Formulation is given by:

$$\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{q}_j}\right) = \frac{\partial \mathcal{L}}{\partial q_j}$$

where $$\mathcal{L}=T-V$$. 


Assuming we can equate the expression on RHS to $$0$$, i.e. $$\frac{\partial \mathcal{L}}{\partial q_j} = 0$$, we have $$\frac{d}{dt}\left(\frac{\partial \mathcal{L}}{\partial \dot{q}_j}\right) = 0$$
, which implies $$\frac{\partial \mathcal{L}}{\partial \dot{q}_j}$$ is a constant. There appears to be a "freedom" in the system! 

We can verify this is true for a 1 dimensional object. Set $$T=\frac{1}{2}m\dot{x}^2$$ and $$V=0$$, we have $$\mathcal{L}=\frac{1}{2}m\dot{x}^2$$. Indeed, $$m \dot{x}$$ is the constant obtained, which is the standard result in classical mechanics. 

### Concluding Remarks 

This is expected to be true due to Noether's Theorem, which states that every symmetry will  lead to a conservation, [which is explained here.]({% link _posts/2022-12-25-NoetherTheorem.markdown %})


Therefore, the energy of a system being independent of position (lack of $$x$$ in expression, while $$\dot{x}$$ is present) causes a constant in the system, known as the (canonical) momentum. In other words, momentum is a term of freedom caused by the lack of a particular spatial coordinate ($$x$$ in our case). Momentum is not conserved if the energy term involves spatial coordinates, say in a particle is in the presence of electromagnetic force.

The other constant is known as the energy function and is given by $$h=\sum_i\frac{\partial L}{\partial \dot{q}_i} \dot{q}_i - \mathcal{L}$$. The reader can show that this corresponds to the energy of the system, which is $$T$$. More of these is related to Hamiltonian Dynamics, which is a reformulation of Lagrangian Dynamics (very closely related to the energy function).

### Exercises for the reader

 - What is also conserved in the system mentioned above? (Difficulty: F4 HKDSE) 
 - What are the restrictions of the form taken by the potential, if so, why? Why is the potential taken as $$0$$?  (Difficulty: F6 HKDSE)

 - By writing down the Lagrangian for a ball undergoing circular motion, show that the angular momentum is conserved.  (Difficulty: Year 1-2 University)

 - (*) Given that $$
\mathcal{L}(\underline{r}, \underline{\dot{r}}, t)=T-\tilde{V}=\frac{1}{2} m|\underline{\dot{r}}|^2-e[\phi(\underline{r}, t)-\underline{\dot{r}} \cdot \underline{A}(\underline{r}, t)] 
$$ is the Lagrangian of a particle in a EM field, show that $$p=mv+eA$$. (Difficulty: Year 2-3 University)

 
Last Updated - 3/6/2024