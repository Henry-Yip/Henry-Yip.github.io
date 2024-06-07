---
layout: single
title: Tensors and its transformations 
katex: True
tags: Algebra
toc: true
toc_label: "Transformations"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Transformations"
---

Here, we introduce the definition of tensors and the visualization behind it. Then, we discuss its transformation to another basis with a worked example. 

## Definition

Consider a rotation of the $$\{e_i\}$$ basis (frame $$S$$) to the $$\{e'_i\}$$ basis (frame $$S'$$). This is called a passive rotation.

The components of two arbitrary vectors $$\mathbf{a}$$ and $$\mathbf{b}$$ in the two frames are related by:

$$a'_i = \ell_{ij} a_j$$ 

$$b'_i = \ell_{ij} b_j$$

$$T'_{ijk\cdots op} = \ell_{ir} \ell_{js} \ell_{kt} \cdots \ell_{ov} \ell_{pw} T_{rst\cdots vw}$$ is the transformation law for a tensor. 

In the two dimensional case, this is equivalent to:

$$T'_{ij} = \ell_{ip} \ell_{jq} T_{pq}$$

The astute reader will realize this is equivalent to: 

$$T'=LTL$$

## Another way to view Tensor Transformations

$$T$$ maps $$v$$ to $$Tv$$,

$$T'$$ maps $$v'$$ to $$T'v'$$.

We can map from $$v$$ to $$Tv$$ in the way below:

 -  Rotate $$L$$ to new basis
 -  Apply $$T'$$
 -  Rotate back

This gives us: $$Tv=L^{-1}T'Lv$$. 

From which we can obtain $$T'=LTL^{-1}$$. 

## Sample Problem

The moments of inertia along the principal axes $$\underline{e}_1, \underline{e}_2, \underline{e}_3$$ of a rigid body are 1,2 and 3 respectively.  An observer has a coordinate basis $$\underline{e}_1^{\prime}=\frac{\sqrt{2}}{2}\left(\underline{e}_1+ \underline{e}_2\right), \underline{e}_2^{\prime}=\frac{\sqrt{2}}{2}\left(-\underline{e}_1+ \underline{e}_2\right)$$ and $$\underline{e}_3^{\prime}=\underline{e}_3$$. What are the values of the components of the inertia tensor measured by the observer? 


### Solution

Using $$R_{ij}=\underline{e_i}' \cdot \underline{e_j}$$, we get:

$$
R=\left(\begin{array}{ccc}
\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\
0 & 0 & 1
\end{array}\right)
$$

And also:

$$
I=\left(\begin{array}{ccc}
1 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 3 \\
\end{array}\right) 
$$


One might be tempted to use coordinate transformations, i.e. $$x_j=R_{ij} x_i$$. However, this is not the case here. The key is using the definition below:

$$
\begin{aligned}
I_{i j}^{\prime} & =l_{i p} l_{j q} I_{p q} \\
& =(L)_{i p} I_{p q}\left(L^T\right)_{q j} \\
& =\left(L I L^T\right)_{i j}
\end{aligned}
$$


We know that rotation matrices satisfy $$L^T=L^{-1}$$, hence:

$$I_{i j}^{\prime} = \left(L I L^{-1}\right)_{i j}$$


Hence, multiplying will get us:

$$
\begin{aligned}
I' &= \left(\begin{array}{ccc}
\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\
-\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\
0 & 0 & 1
\end{array}\right) \left(\begin{array}{ccc}
1 & 0 & 0 \\
0 & 2 & 0 \\
0 & 0 & 3 \\
\end{array}\right) \left(\begin{array}{ccc}
\frac{\sqrt{2}}{2} & \frac{-\sqrt{2}}{2} & 0 \\
\frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} & 0 \\
0 & 0 & 1
\end{array}\right) \\
&=\left(\begin{array}{ccc}
\frac{3}{2} & \frac{1}{2} & 0 \\
-\frac{1}{2} & \frac{3}{2} & 0 \\
0 & 0 & 3
\end{array}\right) 
\end{aligned}
$$ 


## Credits

The intuition part is inspired by [this post](https://math.stackexchange.com/questions/2303869/tensor-rotation). The definition of tensors is from [Dr BJ Pendelton's Notes](https://www2.ph.ed.ac.uk/~bjp/emr/emr.pdf). The motivation part is inspired by [Dr BJ Pendelton's Problem Sheet](https://www2.ph.ed.ac.uk/~bjp/emr/tutorial04.pdf).


## Exercises for the readers
 - What rank is a vector? What rank is a scalar? (Difficulty: University Year 2)
 - Show: 
   $$\det L = +1$$ for rotations and 
   $$\det L = -1$$ for reflections and inversions of basis 
   (Difficulty: University Year 1-2)
 - Consider $$\mathbf{c} = \mathbf{a} \times \mathbf{b}$$. Show that $$\underline{\mathbf{c'}} = \det L \, \underline{\mathbf{c}}$$ by considering rotations, reflections and inversion. This is the definition of a psuedovector. (Difficulty: University Year 2)
 - State an example of a psuedovector in physics (Difficulty: University Year 2) 
 - (*) Irrelevant but Interesting: Define the Levi-Civita symbol and show that it is a pseudotensor of rank 3 (Difficulty: University Year 2-3)
 - (**) State an example of a pseudoscalar in physics (Difficulty: University Year 3-4).  (Hint: Helicity)

 Last Updated - 4/6/2024

