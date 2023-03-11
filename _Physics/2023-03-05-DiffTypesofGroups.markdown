---
layout: single
title: Different Types of Groups
hidden: True
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /physics/groups3/
tag: Physics
toc: true
toc_label: "Group Theory"
toc_sticky: true
sidebar:
 nav: "Physics"
---
## Dihedral Groups

The symmetries of an **n-gon** form a group (Proved in **Prerequisites**) We call it **Dihedral Group** 

### **Theorem 1.1**
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

## Symmetric Groups
The set $$S_n$$ of all symmetries of $$\{1, \ldots, n\}$$ is called the symmetric group, where $$\left|S_n\right|=n !$$.
Consider a graph with $$n$$ vertices and no edges connecting them. This is $$S_n$$

Showing $$S_n$$ is a group is left as an exercise for the reader $$\blacksquare$$

## Matrices

### **Theorem 1.3**
$$\mathrm{GL}(n, \mathbb{R})$$ is a group under matrix multiplication.

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

### A detour on $$\operatorname{SO}(3)$$
**$$\operatorname{SO}(3)$$** is very important in physics.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dSZNFP60Tc0?start=297" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Heard the word **SO(3)**?

$$\operatorname{SO}(n, \mathbb{R}):=\left\{A \in G L(n, \mathbb{R}) \mid \operatorname{det} A=1\right.$$ and $$\left.A^T=A^{-1}\right\}$$. It is related to **Linear Algebra**,  in particular, **Isometry**. 

Sidenote: $$\operatorname{SO}(n, \mathbb{R})$$ is the "combination" of $$\mathrm{SL}(n, \mathbb{R})$$ and $$\mathrm{O}(n, \mathbb{R})$$

### Exercise
$$\operatorname{SO}(n, \mathbb{R})$$ is a subgroup of $$\mathrm{GL}(n, \mathbb{R})$$



## Abelian Groups

Suppose that $$G$$ is a group. If $$g * h=h * g$$ for all $$g, h \in G$$, then $$G$$ is an abelian group.

### Exercise:
**Claim:** $$D_3$$ is not abelian:

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
1 & 3 & 2
\end{array}\right), \quad \tau \sigma=\left(\begin{array}{lll}
1 & 2 & 3 \\
2 & 1 & 3
\end{array}\right) .
$$

Since $$\sigma \tau \neq \tau \sigma$$, $$D_3$$ is not abelian $$\blacksquare$$

## Normal Subgroups

$$N$$ is a normal subgroup and only if $$g n g^{-1} \in N$$ for all $$g \in G$$ and $$n \in N$$. We denote: $$N \triangleleft G$$.


### **Theorem 1.2**
Claim: Every Subgroup of an Abelian Group is Normal

### **Proof**

Suppose $$G$$ is abelian and let $$H \leq G$$. 
Then $$\forall g$$ $$\in$$ $$G$$, $$\forall h$$ $$\in$$ $$H$$,  
 $$g h g^{-1}=g g^{-1} h=e h=h \in H$$

Hence $$H \triangleleft G \quad \blacksquare$$

**Definition:**

Let $$G$$ be a group and let $$g \in G$$ be an element. We define the subset
$$
\langle g\rangle:=\left\{g^k \mid k \in \mathbb{Z}\right\}=\left\{\ldots, g^{-2}, g^{-1}, e, g, g^2, \ldots\right\} 
$$

**Definition:**

A subgroup $$H \leq G$$ is cyclic if $$H=\langle h\rangle$$ for some $$h \in H$$.


Returning to our Dihedral Group $$D_n$$, the subgroup $$H$$ consisting of the identity and all the rotations, i.e.
$$
H=\left\{e, g, g^2, \ldots, g^{n-1}\right\}
$$
is a cyclic subgroup since $$H=\langle g\rangle$$

You should verify that $$H$$ is abelian, this is left as an exercise for the reader $$\blacksquare$$

If you have done the exercise above, it should be clear that $$G$$ is cyclic $$\Rightarrow$$ $$G$$ is abelian $$\blacksquare$$

### **Exercise:** 

Explain why the converse statement is **not** true? *i.e.*, $$G$$ is abelian $$\nRightarrow$$ $$G$$ is cyclic 

**Hint:** Consider $$\mathbb{R}$$ under addition 


First, define $$A_n$$, the Alternating Group, as the even permutations of $$S_n$$. As $$S_n$$ has the same number of odd and even permutations (for any groups this holds!), order of $$A_n=\frac{n!}{2}$$. For $$A_4$$, order $$\frac{4!}{2}=12$$
