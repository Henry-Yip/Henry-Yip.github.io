---
layout: single
title: Tensor Transformations 
katex: True
tags: Trans
toc: true
toc_label: "Transformations"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Transformations"
---

Here, we deal with the transformation of Tensors. We will conclude with some sort of intuition. 

## Motivation

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
& =(R)_{i p} I_{p q}\left(R^T\right)_{q j} \\
& =\left(R I R^T\right)_{i j}
\end{aligned}
$$


We know that rotation matrices satisfy $$R^T=R^{-1}$$, hence:

$$I_{i j}^{\prime} = \left(R I R^{-1}\right)_{i j}$$



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

## Intuition

I will use $$T$$ and $$T'$$ for the tensors below, as I consider $$T$$ and $$T'$$ as maps (in fact, it is easy to define Tensors as multilinear maps!):

$$T$$ maps $$v$$ to $$Tv$$,

$$T'$$ maps $$v'$$ to $$T'v'$$.

We can map from $$v$$ to $$Tv$$ in an interesting way:

 -  Rotate $$R$$ to new basis
 -  Apply $$T'$$
 -  Rotate back

This gives us: $$Tv=R^{-1}T'Rv$$. 

From which we can obtain $$T'=RTR^{-1}$$.  


## Credits

The intuition part is inspired by [this post](https://math.stackexchange.com/questions/2303869/tensor-rotation). The motivation part is inspired by [Dr BJ Pendelton's Problem Sheet](https://www2.ph.ed.ac.uk/~bjp/emr/tutorial04.pdf).


