---
layout: single
title: Pokemon Go PvP Analysis
katex: True
tags: Pokemon Go
toc: true
toc_label: "Pokemon Go"
toc_sticky: true
authors: Henry
permalink: /Pokemon/PvP/
header:
  teaser: /assets/images/Dubrovnik.jpg
sidebar:
 nav: "Pokemon Go"
---

### Master League

A battle between **Mewtwo**, **Zacian**, **Dialga**, **Giratina** and **Dragonite** 

<iframe src="/assets/images/Master.png" width="995px" height="446px"></iframe>

I use [PvPoke](https://pvpoke.com/battle/) for analysis, where Pokemons gain points by winning, and losing points by losing. The formula for the points is:

$$ \text{Points}=\frac{\text{HP Remaining}}{\text{ HP Total}}$$

For example, **Dialga** is expected to win **Mewtwo**, both without shields, with a $$60$$ HP remaining out of $$184$$. Therefore Dialga gains a point of $$0.326087$$ while dialga loses the same amount of points. 

This process is repeated for a total of 3 times between any two pokemons ($$0$$ shields, $$1$$ shields and $$2$$ shields) and each pokemon is paired to every other 4 pokemons listed above.

Results:
 - Dialga: $$2.05481905$$
 - Giratina (Origin): $$0.319185792$$
 - Zacian: $$-0.134682927$$
 - Dragonite: $$-0.90879408$$
 - Mewtwo: $$-1.330527835$$

 ```bash
 Dialga is the clear Winner. Surpringly Mewtwo loses
 ```

### Ice-Beam Mewtwo?

Ice-Beam Mewtwo has a score of $$-2.632781889$$. It is significantly worse. Surprisingly it performs worse than psystrike while dealing with dragonite while both pokemons have 2 shields, as dragonite is doubly weak to ice type move. 

### Psytrike Mewtwo Weaknesses:
Surprisingly Mewtwo loses hard while **Dialga** is the clear winner, as **Dialga** very strictly wins against Mewtwo, strictly wins against Giratina O and wins against Dragonite. 


This format is unsurprisingly unfair because steel type do get their advantage in this field, but this analysis is only done for fun and should not be taken seriously. 

- Edit: This may not be the case. Aggron gets a pitful score of $$-2.722025122$$, as it strictly loses to Mewtwo and Dragonite (Despite having Dragon Tail as fast move!), and very strictly loses to GiratinaO and Zacian











