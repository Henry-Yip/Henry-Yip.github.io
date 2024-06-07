---
layout: single
title: Overview of the Two-body Problem
katex: True
tags: 
 - Research
 - Classical Mechanics
toc: true
toc_label: "Summer Research"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Summer Research"
---
Here I will present the exact solution of the two body problem.

## Definition of terms

First we define the center of mass coordinate, $$R$$:

$$\underline{R}=\frac{m_1 \underline{r_1}+m_2 \underline{r_2}}{m_1+m_2}$$

As $$m_1$$ and $$m_2$$ are invariant, we can express $$P$$, the total momentum, in terms of $$\dot{R}$$: 

$$\underline{P}=(m_1+m_2)\dot{R}$$

### How does the center of mass move?

As total momentum is conserved, we have (in scalars) $$\dot{R}=\frac{P}{m_1+m_2}$$. 

Hence, we have

$$\underline{R}(t)=\underline{R}(0)+\frac{\underline{P}}{m_1+m_2} t.$$

Therefore Center-of-Mass is always on a straight line with constant velocity!

## Solving the System

Now we assume the two bodies interact via some conservative force that depends on the relative coordinate $$\mathbf{r} = \mathbf{r_1} - \mathbf{r_2}$$, namely $$V = V(\mathbf{r_1} - \mathbf{r_2})$$.

By putting into the expression of $$\underline{R}$$, we obtain:

$$\underline{r}_1=\underline{R}+\frac{m_2}{m_1+m_2} \underline{r}$$

Further differentiating yields:

$$\underline{\ddot{r}}_1=\frac{m_2}{m_1+m_2}{\underline{\ddot{r}}}$$

Hence we have:

$$
\frac{m_1 m_2}{m_1+m_2} {\underline{\ddot{r}}}=m_1 {\underline{\ddot{r}}}_1=-\underline{\nabla}_1 V\left(\underline{r}_1-\underline{r}_2\right)=-\underline{\nabla} V(\underline{r})
$$

Leading to:

$$
m {\underline{\ddot{r}}}=-\underline{\nabla} V(\underline{r})
$$

Where 

$$
m \equiv \frac{m_1 m_2}{m_1+m_2}
$$

is named the *reduced mass*. Note that it can be written as:

$$
\frac{1}{m}=\frac{1}{m_1}+\frac{1}{m_2}.
$$

## Concluding Remarks

N-body problem is one of the most important problems in physics! (as bodies can be particles, planets, anything!) I am planning to do a supervised summer project with [Dr Jenni Smillie](https://www.ph.ed.ac.uk/people/jenni-smillie), focusing on three-body gravitational problems. I will provide an update on this in due course!

## Exercises for the Reader 

 - From $$\dot{R}=\frac{P}{m_1+m_2}$$, show that $$\underline{R}(t)=\underline{R}(0)+\frac{\underline{P}}{m_1+m_2} t$$. (Difficulty: F4-5 HKDSE)
 - Give the definition for $$\nabla$$. Explain the difference between $$\nabla$$ and $$\nabla_1$$. (Difficulty: University Year 1-2) 
 - What is the form of the reduced mass similar to? (Hint: in circuits) (Difficulty: F5 HKDSE)
 - Show that two-body motion is planar (Difficulty: University Year 1-2)

 Last Updated - 3/6/2024