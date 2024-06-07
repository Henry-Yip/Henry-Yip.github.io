---
layout: single
title: Euler's Totient function, Reduced Totient function and Carmichael Number
katex: True
tags: 
 - Number Theory
toc: true
toc_label: "Carmichael Function"
toc_sticky: true
authors: Henry
sidebar:
 nav: "Carmichael Function"
---
This post is a gentle introduction on the famous theorems in Number Theory.

## Motivation
I have been given this question in my first Mathematics Class on proving theorems, [Accelerated Proofs and Problem Solving](http://www.drps.ed.ac.uk/22-23/dpt/cxmath08071.htm):

Find $$a$$ such that

$$3^{124} \equiv a \space \text{mod} \space 100$$

The answer is $$81$$ upon my "discovery" (by clicking the calculator $$19$$ times) that

$$3^{20} \equiv 1 \space \text{mod} \space 100$$

Is it possible to generalize this? 


## Carmichael function

The Carmichael Function $$\lambda(n)$$ is the smallest number of the set of positive numbers $$m$$ such that:

$$a^{m} \equiv 1 \space \text{mod} \space n$$

for every integer $$a$$ coprime to $$n$$

[It can be verified that](https://www.wolframalpha.com/input?i=lambda%28100%29&assumption=%7B%22FunClash%22%2C+%22lambda%22%7D+-%3E+%7B%22CarmichaelLambda%22%7D) $$\lambda(100)=20$$.

## Relation to Euler's Theorem  

Euler's Theorem (in number theory) states that:

$$a^{\varphi(n)} \equiv 1 \space \text{mod} \space n$$

for every integer $$a$$ coprime to $$n$$. $$\varphi(n)$$ is the Euler's Totient function and it denotes the positive integers up to a given integer $$n$$ that are relatively prime to $$n$$. 

For the unfamilar reader, 

$$
\varphi(n)=n \prod_{p|n}\left(1-\frac{1}{p}\right).
$$

The reader can check that $$\varphi(100)=40$$. 

This is very similar to Fermat's little theorem:

$$a^{p-1} \equiv 1 \space \text{mod} \space p$$

This is a special case of Euler's Theorem and is left as an exercise for the reader (see below).

We can see that $$20$$ also satisfies the equation for Euler's Theorem but is smaller. This gives Carmichael Function the name "Reduced Toitient Function". $$\lambda(n)$$ divides $$\varphi(n)$$, and the proof is left as an exercise for the reader (see below).

### Carmichael Number
Given Fermat's Little Theorem, it is tempting to use it as a primality test. This means, we find all integers $$n$$ such that

$$b^{n-1} \equiv 1 \space \text{mod} \space n$$

for all $$b$$ coprime to $$n$$, and claim the set of integers $$n$$ are all prime numbers. 

This works well until $$561$$, which satsifies

$$b^{560} \equiv 1 \space \text{mod} \space 561$$

for all $$b$$ coprime to $$561$$, but is not a prime number (as $$561=(3)(11)(17)$$). Such numbers are called Carmichael Numbers. 

There is a theorem to find Carmicahel Numbers:

A positive composite integer $$n$$ is a Carmichael number if and only if $$n$$ is square-free, and for all prime divisors $$p$$ of $$n$$, it is true that $$p-1 \mid n-1$$.

For example, $$2 \mid 560$$, $$10 \mid 560$$, $$16 \mid 560$$. and $$n$$ is square-free. Hence $$561$$ is a Carmichael Number. 



### Exercises for the reader

 - Show that $$\varphi(p)=p-1$$ for a prime number $$p$$, and hence, using Euler's Theorem, verify Fermat's Little Theorem (Difficulty: University Year 1-2).
 - Define what is means to be the exponent of the group and the order of the group. Show that $$\lambda(n)$$ divides $$\varphi(n)$$. 
 - Design a Python Program and print out the first $$10$$ Carmichael Numbers.





