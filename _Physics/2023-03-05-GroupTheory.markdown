---
layout: single
title: Simple Group Theory 
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /physics/groups/
tag: Physics
toc: true
toc_label: "Group Theory"
toc_sticky: true
sidebar:
 nav: "Physics"
---
## Pre-requisites

I assume basic familarity with functions and isomorphisms/symmetries.

For those who aren't, please check out this post:
 - [Pre-requisites for "Simple Group Theory"]({% link _Jekyll/2022-05-19-Katex.markdown %})

## Dihedral Groups

Following from Theorem 1.1, the symmetries of an **n-gon** form a group. We call it **Dihedral Group** 

### **Theorem 1.2**
The dihedral group $$D_n$$, has precisely $$\left|D_n\right|=2 n$$ elements

### **Proof**
$$D_n$$ consists of:
- The identity $$e \in D_n$$ (Trivial)
- The $$n-1$$ rotations (any direction) through angles $$k \cdot \frac{2 \pi}{n}$$, $$k \in \mathbb{Z}$$ and $$k=1, \ldots, n-1$$.  
- The $$n$$ reflections (This is left as an exercise for the readers)

Since $$1+(n-1)+n=2n$$ we have $$\left|D_n\right|=2 n$$ 
$$\blacksquare$$

Now if we denote $$g$$ as rotation and $$h$$ as reflection through a particular vertex.

### Exercise

$$
D_n=\left\{e, g, g^2, \ldots, g^{n-1}, h, g h, g^2 h, \ldots, g^{n-1} h\right\}
$$

**Hint**:
What is the physical meaning of $$g^{n-1} h$$

## Matrices

### **Theorem 1.3**
$$\mathrm{GL}(n, \mathbb{R})$$ is a group under matrix multiplication.:

### **Proof**

**G1 (Closure):**
Claim: Consider two Matrices $$A$$ and $$B$$. If $$A$$ and $$B$$ are invertible then $$AB$$ is invertible. 

Proof: $$A$$ and $$B$$ invertible $$\Rightarrow$$  $${\displaystyle \det(A) \neq 0}$$ and $${\displaystyle \det(B) \neq 0}$$. From $${\displaystyle \det(AB)=\det(A)\det(B)}$$ we can see the above implies $${\displaystyle \det(AB) \neq 0}$$. Hence $$AB$$ is invertible $$\blacksquare$$

**G2 (Associative):**
$$A(BC)=(AB)(C)$$
This is left as an exercise for the reader $$\blacksquare$$

**G3(Identity):**
The Matrix **I** is the Identity element  $$\blacksquare$$

**G4(Inverse):**
For every invertible matrix $$\exists$$ a inverse matrix. Let  $$A$$ be any invertible matrix. Then $$A^{-1}$$ is the invertible matrix s.t. $$AA^{-1}=A^{-1}A=I$$ 
 $$\blacksquare$$

From $$G1-G4$$, $$\mathrm{GL}(n, \mathbb{R})$$ is a group under matrix multiplication $$\blacksquare$$

## Subgroups

S1. $$H$$ is not empty.
S2. If $$h, k \in H$$ then $$h * k \in H$$
S3. If $$h \in H$$ then $$h^{-1} \in H$$.

### A detour on SO(3)
**SO(3)** is very important in physics.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dSZNFP60Tc0?start=297" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Heard the word **SO(3)**?

$$\operatorname{SO}(n, \mathbb{R}):=\left\{A \in G L(n, \mathbb{R}) \mid \operatorname{det} A=1\right.$$ and $$\left.A^T=A^{-1}\right\}$$. It is related to **Linear Algebra**,  in particular, **Isometry**. 

Sidenote: $$\operatorname{SO}(n, \mathbb{R})$$ is the "combination" of $$\mathrm{SL}(n, \mathbb{R})$$ and $$\mathrm{O}(n, \mathbb{R})$$

### Exercise
$$\operatorname{SO}(n, \mathbb{R})$$ is a subgroup of $$\mathrm{GL}(n, \mathbb{R})$$

## Abelian Groups

Suppose that $$G$$ is a group. If $$g * h=h * g$$ for all $$g, h \in G$$, then $$G$$ is an abelian group.

### Exercise:
**Claim:** $D_3$ is not abelian:

**Proof:** 

$$
\sigma=\left(\begin{array}{lll}
1 & 2 & 3 \\
3 & 2 & 1
\end{array}\right), \quad \tau=\left(\begin{array}{lll}
1 & 2 & 3 \\
2 & 3 & 1
\end{array}\right), \quad \sigma \tau=\left(\begin{array}{lll}
1 & 2 & 3 \\
2 & 1 & 3
\end{array}\right), \quad \tau \sigma=\left(\begin{array}{lll}
1 & 2 & 3 \\
1 & 3 & 2
\end{array}\right) .
$$

Since $\sigma \tau \neq \tau \sigma$, $D_3$ is not abelian $\blacksquare$









