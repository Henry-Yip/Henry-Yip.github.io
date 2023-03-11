---
layout: single
title: Pre-requisites for "Simple Group Theory"
header:
  teaser: /assets/images/Dirichlet.png
katex: True
permalink: /physics/prerequisites/
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


Theorem:
Consider a subgroup of $$S_3$$ that only contains the rotations. From above, for $$S_n$$ there are $$n$$ rotations (after including the identity $$e$$) , so the subgroup, denoted by $$H$$, has $$3$$ elements, *i.e.*   $$e, (123),(132)$$. Now consider $$(12) \in S_3$$:

\begin{align}
(12)(H)&=(12),(12)(123),(12)(132) \\
&=(12),(23),(13)
\end{align}

Now consider $$(23) \in S_3$$:

\begin{align}
(23)(H)&=(23),(23)(123),(23)(132) \\
&=(23),(13),(12) \\
&=(12),(23),(13) \\
&=(12)(H)
\end{align}

Physical interpretation: It works for the rotation group of $$S_3$$ because of symmetry, *i.e.* $$1,2,3$$ can be relabelled between themselves freely as long as the relabelling itself is bijective

This shows that $$g_1H=g_2H$$ is *possible* even when $$g_1 \neq g_2$$ . The function $$f: G \rightarrow G$$ s.t. $$g_n \rightarrow hg_n$$ for any $$n \in \mathbb{N}$$ is not *injective* as 
$$(f(g_1)=f(g_2)) \nrightarrow (g_1=g_2)$$ 
$$\blacksquare$$

Surprising Theorem:
$$\forall h \in H, hH=H$$

Example: As above, the rotation group of $$S_3$$ is a subgroup of $$S_3$$ (Left as an exercise for the readers). Pick $$h=(123)$$:

\begin{align}
(123)(H)&=(123),(123)(123),(123)(132) \\
&=(123),(132),e \\
\end{align}

From above, the rotation group is re-obtained. 

Idea of proof: From set theory if $$hH \subseteq H$$ and $$H \subseteq hH$$ then $$hH=H$$
$$hH\subseteq H$$ is obvious from group axioms (closure). I'll prove $$H \subseteq hH$$. To prove that I'll need to show $$y \in H \rightarrow y \in hH$$.

Working backwards, we want $$h^{-1}y \in H$$,  This can easily be proven true: If $$h \in H$$ then $$h^{-1} \in H$$ by group axioms (inverse). Then if $$y \in H$$ and $$h^{-1} \in H$$, $$h^{-1}y \in H$$ by group axioms (closure).

More formal approach:
Pick $$y \in H$$. Since $$h \in H$$, $$h^{-1} \in H$$ by inverse axiom of groups, hence $$h^{-1}y \in H$$ by closure property of groups. Denote $$m=h^{-1}y$$. As $$m \in H$$, $$hm \in hH$$, hence $$hh^{-1}y \in hH$$, *i.e.* $$y \in hH$$. Hence $$H \subseteq hH$$. 

As $$hH \subseteq H$$ and $$H \subseteq hH$$ then $$hH=H$$ $$\blacksquare$$


For  $$g1, g2 \in G$$, define $$g1 \approx g2$$ if and only if g1H = g2H. Then ∼ defines an
equivalence relation on G.



Suppose that $$H$$ is a subgroup of $$G$$. Then $$|gH|=|H|$$ (i.e. All cosets have the same number of elements)

If $$g \in H$$ then the above is obvious since $$hH=H$$ $$\rightarrow$$ $$|hH|=|H|$$

The proof itself is left as an exercise for the readers. 




















