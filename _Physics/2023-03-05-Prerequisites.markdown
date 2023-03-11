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
### Lemma 1.1 

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
We say that a nonempty set $$G$$ is group under $$*$$ if

 - G1. (Closure) $$*$$ is an operation, so $$g * h \in G$$ $$\forall g, h \in G$$.

 - G2. (Associativity) $$g *(h * k)=(g * h) * k$$  $$\forall g, h, k \in G$$.
 - G3. (Identity) $$\exists$$ $$e \in G$$ s.t. $$e * g=g * e=g$$, $$\forall g \in G$$

 - G4. (Inverses) $$\forall$$ $$g \in G$$, $$\exists$$ $$g^{-1}$$ s.t.$$g * g^{-1}=$$ $$g^{-1} * g=e$$



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



















