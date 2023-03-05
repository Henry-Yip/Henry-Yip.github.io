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






