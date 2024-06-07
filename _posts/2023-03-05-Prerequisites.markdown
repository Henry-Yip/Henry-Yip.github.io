---
layout: single
title: Pre-requisites for Group Theory
katex: True
hidden: True
toc: true
toc_label: "Pre-requisites for Group Theory"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Pre-requisites for Group Theory"
---

Group Theory is one of the most important theories in Physics. Here we try to complete a basic introduction to it, or at least complete the background learning to facilitate its learning. 

## Equivalence Class

 - Why Equivalence Classes?
 - To understand Cosets, hence understand very important theorems like Lagrange's Theorem

Consider the natural numbers $$\mathbb{N}$$. Consider the remainder when divided by 3. It is clear that some numbers has remainder 0, some has remainder 1, and the rest has remainder 2.

We can group all the numbers with remainder 0 into a "class", numbers with reaminer 1 into another class, and the remaning numbers into another class.

So we have 3 classes that contains the same number of elements. We can also
observe that **every element is in one of the equivalence classes**  and **no element is in more than one equivalence classes**. 

Rigorously, the elements of the set S have to have a notion of equivalence relation. That means that it has to satisfy:

 - Reflexivity

   - e.g. "is smaller than" is **NOT** an equivalence relation because $$a<a$$ is incorrect.

 - Symmetry

   - e.g. " is equal or smaller than" is **NOT** an equivalence relation because $$5 \le 7$$ does not imply $$7 \le 5$$

 - Transitivity

   - e.g.  In rock-paper-scissors, rock beats scissors and scissors beat paper, but rock doesn't beat paper. 

The equivalence relation above is called "congruence modulo 3". 

Other equivalence relations include:

  - "Is equal to" on the set of real numbers. 

  - "Has the same real part" on the set of complex numbers. 

  - "Is similar to" on the set of triangles.




### Partitions
Let $$A$$ be a set and $$A_1, A_2, \ldots, A_n$$ be its non-empty subsets. The subsets form a partition $$P$$ of $$A$$ if

- The union of the subsets in $$P$$ is equal to $$A$$

$$
\bigcup_{i=1}^n A_i=A_1 \cup A_2 \cup \ldots \cup A_n=A
$$

- The partition $$P$$ does not contain the empty set $$\varnothing$$

$$
A_i \neq \emptyset \quad \forall i
$$

- The intersection of any distinct subsets in $$P$$ is empty

$$
A_i \cap A_j=\emptyset \quad \forall i \neq j
$$

## Functions

 - Why Functions
 - Bijection is the key of group theory. As an elementary example, Symmetric Groups themselves are bijections. 

I assume knowledge of functions. *i.e.* [Injection](https://en.wikipedia.org/wiki/Injective_function), [Surjection](https://en.wikipedia.org/wiki/Surjective_function), [Bijection](https://en.wikipedia.org/wiki/Bijection).


### Exercise 1
 Is $$f: \mathbb{R} \rightarrow \mathbb{R}$$ s.t. $$f(x)=x^2$$ Injective? Surjective? Bijective?

Solution: 

Injective: Pick $$y=1$$. Then $$x=1$$ or $$x=-1$$. Hence not injective

Surjective: No (Do it yourself)

Bijective: No (Not Injective Not Surjective so not bijective)


### Exercise 2
 Is $$x=y^2$$ a function? 


## Bijections

**Claim:**
 Let $$f: V \rightarrow V$$ and $$g: V \rightarrow V$$. $$f, g$$ are bijections implies that $$f \circ g$$ is a bijection

Significance: This is important in symmetric groups as it justifies operations like $$(123)(12)=(13)$$

**Proof:**
Suppose $$v \in V$$.  

$$f$$ is a bijection $$\Rightarrow$$ $$\exists$$!$$v^{\prime \prime} \in V$$ s.t. $$f\left(v^{\prime \prime}\right)=v$$

$$g$$ is a bijection $$\Rightarrow$$ $$\exists$$!$$v^{\prime} \in V$$ s.t. $$g\left(v^{\prime}\right)=v^{\prime \prime}$$

Hence $$\exists$$!$$v^{\prime} \in V$$ s.t.  $$f\left(g\left(v^{\prime}\right)\right)=v$$

Suppose $$v^{\prime \prime \prime} \in V$$.  $$v^{\prime \prime \prime} \neq v^{\prime}$$ $$\Rightarrow$$ $$f\left(g\left(v^{\prime \prime \prime}\right)\right) \neq f\left(g\left(v^{\prime}\right)\right)$$

This proves Injection

$$\forall v \in V$$ $$\exists$$ $$v^{\prime}$$ s.t.  $$f\left(g\left(v^{\prime}\right)\right)=v$$

This proves Surjection.

Hence Injection and Surjection proves Bijection.
$$\blacksquare$$

## Isomorphism
An isomorphism between two graphs is a bijection between them
that preserves all edges. *i.e.* the vertices are still connected by the same edges. If two graphs $$G$$ and $$H$$ are isomorphic we denote by $$G \cong H$$ 
If the two graphs is the same then this is called a symmetry.


## Definition of Groups
A group $$(G, *)$$ is a set $$G$$ with a binary operation $$*$$ satisfying the following axioms:

(1) $$a * b \in G$$ $$\quad$$ $$\forall$$ $$a, b, \in G$$ (Closure)

(2) $$(a * b) * c=a *(b * c)$$ $$\quad$$ $$\forall$$ $$a, b, c \in G$$ (Associativity)

(3) $$\exists$$ $$e \in G$$ *s.t.* $$a * e=e * a=a$$ $$\quad$$ $$\forall$$ $$a \in G$$ (Identity)

(4) For any $$a \in G$$  $$\quad$$ $$\exists$$ $$a^{-1} \in G$$ *s.t.* $$a * a^{-1}=$$ $$a^{-1} * a=e$$ (Inverse)


## Symmetries and Groups Relationships
**Claim**
The set of symmetries of a graph forms a group (under composition). 

Significance:
Dihedral group itself is the set of symmetries of a n-gon

**Proof:**

 - (**G1**) 
Claim: The composition of two symmetries $$f$$ and $$g$$ is a symmetry.

Proof: Since $$f, g$$ are bijections implies that $$f \circ g$$ is a bijection. (**Lemma 1.1**)

$$v_1$$ and $$v_2$$ are joined by an edge if and only if $$g\left(v_1\right)$$ and $$g\left(v_2\right)$$ are joined by an edge if and only if $$f \circ g\left(v_1\right)$$ and $$f \circ g\left(v_2\right)$$ are joined by an edge. Hence  $$f * g$$ is a symmetry  $$\blacksquare$$

 - (**G2**)
The composition of maps is associative
$$
(f * g) * h:=(f \circ g) \circ h=f \circ(g \circ h):=f *(g * h)
$$
for all symmetries $$f, g, h$$ 

This is left as an exercise for the readers $$\blacksquare$$

 - (**G3**)
The identity map $$e$$ itself satisfies $$e \circ f = f \circ e =f$$  $$\blacksquare$$

 - (**G4**)
If $$f: V \rightarrow V$$ is a symmetry then we can easily show the existence of the symmetry $$f^{-1}$$ s.t.  $$f^{-1}: V \rightarrow V$$ (Try Contradiction) 
 
Since $$f \circ f^{-1}=f^{-1} \circ f=e$$, we prove **G4** $$\blacksquare$$

Since **G1-G4** are all satisfied, the set of symmetries of a graph forms a group (under composition).  $$\blacksquare$$

for all symmetries $$f, g, h$$ 

This is left as an exercise for the readers $$\blacksquare$$


## Extra Definitions

A map $$\phi$$ : $$G \rightarrow H$$ is  a group homomorphism if

$$\phi(x \circ y) = \phi(x) * \phi(y) \quad \forall x, y \in G$$

where $$\circ$$ is the operation of G and $$*$$ is the operation of H. 

Intuitively, the LHS means you can do operations (of $$G$$) on $$x$$ and $$y$$ first, and then apply $$\phi$$ to $$x \circ y$$. The RHS means you do $$\phi(x)$$ and $$\phi(y)$$ first, then do operation of $$H$$ on $$\phi(x)$$ and $$\phi(y)$$ later. 

Below I will give an example:

Consider $$\mathbb{R}$$ under addition and $$\mathbb{R}^*_+$$ under multiplication. The map Exp: $$\mathbb{R} \rightarrow \mathbb{R}^*_+$$ is a homomorphism. 

Don't get lost! $$\phi(x \circ y)$$ is the LHS, where $$\circ$$ is $$+$$!. $$\phi$$ is the operation as the map is Exp: $$\mathbb{R} \rightarrow \mathbb{R}^*_+$$

So , as $$e^{x+y}=e^{x}*e^{y}$$ is true, we can prove $$\phi(x \circ y) = \phi(x) * \phi(y) \quad \forall x, y \in G$$. Therefore it's an homomorphism!


A Group Homomorphism $$\phi : G → H$$ that is also a bijection is called an isomorphism of groups. We write $$G \cong H$$

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


## Theorem 

Claim: $$g_1H=g_2H$$ is *possible* even when $$g_1 \neq g_2$$

Proof: Consider a subgroup of $$S_3$$ that only contains the rotations and the identity element $$e$$. From above, this subgroup contains $$(n-1)+1=n$$ elements , so the subgroup, denoted by $$H$$, has $$3$$ elements, *i.e.*   $$e, (123),(132)$$. Now consider $$(12) \in S_3$$:

$$
\begin{align}
(12)(H)&=(12),(12)(123),(12)(132) \\
&=(12),(23),(13)
\end{align}
$$

Now consider $$(23) \in S_3$$:

$$
\begin{align}
(23)(H)&=(23),(23)(123),(23)(132) \\
&=(23),(13),(12) \\
&=(12),(23),(13) \\
&=(12)(H)
\end{align}
$$

Physical interpretation: It works for the rotation group of $$S_3$$ because of symmetry, *i.e.* $$1,2,3$$ can be relabelled between themselves freely as long as the relabelling itself is bijective

This shows that $$g_1H=g_2H$$ is *possible* even when $$g_1 \neq g_2$$ . The function $$f: G \rightarrow G$$ s.t. $$g_n \rightarrow hg_n$$ for any $$n \in \mathbb{N}$$ is not *injective* as 
$$(f(g_1)=f(g_2)) \nrightarrow (g_1=g_2)$$ 
$$\blacksquare$$
















