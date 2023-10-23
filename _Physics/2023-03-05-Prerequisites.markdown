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

  - "is equal to" on the set of real numbers. 

  - "Has the same real part" on the set of complex numbers. 

  -  "Is similar to" on the set of triangles.




### Partitions
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



















