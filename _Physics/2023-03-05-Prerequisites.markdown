---
layout: single
title: Pre-requisites for Understanding Group Theory
hidden: True
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /physics/groups2/
tag: Physics
toc: true
toc_label: "Group Theory"
toc_sticky: true
sidebar:
 nav: "Physics"
---
## Equivalence Class
The content below is not original and comes from [HERE](https://math24.net/equivalence-classes-partitions.html)

A well-known sample equivalence relation is Congruence Modulo $$n$$. Two integers $$a$$ and $$b$$ are equivalent if they have the same remainder after dividing by $$n$$.
Consider, for example, the relation of congruence modulo 3 on the set of integers $$\mathbb{Z}$$ :
$$
R=\{(a, b) \mid a \equiv b(\bmod 3)\}
$$
The possible remainders for $$n=3$$ are 0,1 and 2 . **An equivalence class consists of those integers that have the same remainder** . Hence, there are 3 equivalence classes in this example:
$$
\begin{aligned}
& {[0]=\{\ldots,-9,-6,-3,0,3,6,9, \ldots\}} \\
& {[1]=\{\ldots,-8,-5,-2,1,4,7,10, \ldots\}} \\
& {[2]=\{\ldots,-7,-4,-1,2,5,8,11, \ldots\}}
\end{aligned}
$$
Similarly, one can show that the relation of congruence modulo $$n$$ has $$n$$ equivalence classes
$$
[0],[1],[2], \ldots,[n-1]
$$

We can see that **every element is in one of the equivalence classes** (Every and **no element is in more than one equivalence classes**

## Partitions
Let $$A$$ be a set and $$A_1, A_2, \ldots, A_n$$ be its non-empty subsets. The subsets form a partition $$P$$ of $$A$$ if
- The union of the subsets in $$P$$ is equal to $$A$$.
$$
\bigcup_{i=1}^n A_i=A_1 \cup A_2 \cup \ldots \cup A_n=A
$$
- The partition $$P$$ does not contain the empty set $$\varnothing$$.
$$
A_i \neq \emptyset \quad \forall i
$$
- The intersection of any distinct subsets in $$P$$ is empty.
$$
A_i \cap A_j=\emptyset \quad \forall i \neq j
$$

### Bijections
**Claim:**
 Let $$f: V \rightarrow V$$ and $$g: V \rightarrow V$$. $$f, g$$ are bijections implies that $$f \circ g$$ is a bijection

**Proof:**
Suppose $$v \in V$$.  

$$f$$ is a bijection $$\Rightarrow$$ $$\exists$$!$$v^{\prime \prime} \in V$$ s.t. $$f\left(v^{\prime \prime}\right)=v$$

$$g$$ is a bijection $$\Rightarrow$$ $$\exists$$!$$v^{\prime} \in V$$ s.t. $$g\left(v^{\prime}\right)=v^{\prime \prime}$$

Hence $$\exists$$!$$v^{\prime} \in V$$ s.t.  $$f\left(g\left(v^{\prime}\right)\right)=v$$

Suppose $$v^{\prime \prime \prime} \in V$$.  $$v^{\prime \prime \prime} \neq v^{\prime}$$ $$\Rightarrow$$ $$f\left(g\left(v^{\prime \prime \prime}\right)\right) \neq f\left(g\left(v^{\prime}\right)\right)$$

This proves Injection

$$\forall v \in V$$ $$\exists$$ $$v^{\prime}$$ s.t.  $$f\left(g\left(v^{\prime}\right)\right)=v$$

This proves Surjection

Hence Injection and Surjection proves Bijection
$$\blacksquare$$


**Reminder** 

A symmetry is a bijection $$f: V \rightarrow V$$ such that $$f(v_1)$$ and $$f(v_2)$$ are joined by an edge if and only if $$v_1$$ and $$v_2$$ are joined by an edge.

**Definitions**
A group $$(G, *)$$ is a set $$G$$ with a binary operation $$*$$ satisfying the following axioms:
(1) $$a * b \in G$$ $$\quad$$ $$\forall$$ $$a, b, \in G$$ (Closure)
(2) $$(a * b) * c=a *(b * c)$$ $$\quad$$ $$\forall$$ $$a, b, c \in G$$ (Associativity)
(3) $$\exists$$ $$e \in G$$ *s.t.* $$a * e=e * a=a$$ $$\quad$$ $$\forall$$ $$a \in G$$ (Identity);
(4) For any $$a \in G$$  $$\quad$$ $$\exists$$ $$a^{-1} \in G$$ *s.t.* $$a * a^{-1}=$$ $$a^{-1} * a=e$$ (Inverse)


## Theorem 1.1
**Claim**
The set of symmetries of a graph forms a group (under composition)

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

This is left as an exercise for the readers $$\blacksquare$$\

## Equivalent Classes



## Extra Definitions

A map $$\phi$$ : $$G \rightarrow H$$ is  a group homomorphism if
$$\phi(xy) = \phi(x) \phi(y) \quad \forall x, y \in G$$

A Group Homomorphism $$\phi : G → H$$ that is also a bijection is called an isomorphism of groups. We write $$G \cong H$$



















