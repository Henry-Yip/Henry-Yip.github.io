---
layout: single
title: Pokemon Go PvE Analysis
katex: True
tags: Pokemon Go
toc: true
toc_label: "Pokemon Go"
toc_sticky: true
authors: Henry
permalink: /Pokemon/PvE/
header:
  teaser: /assets/images/Astro.png
sidebar:
 nav: "Pokemon Go"
---

# Introduction
Many Pokemons have great stats, great potential, but a suboptimal movepool, resulting in suboptimal performance. Now, we'll analyse some of these pokemons, and see how far they can actually get

## Slaking 

Slaking is a Pokemon with **Great** Potential, having a 290 Attack stat, one of the highest among non-legendary/non-mega evolutions. Unfortunately, it has Yawn as fast move, the worst possible move, as it does 1 damage per time and has pitful energy gain. Also, as it is Normal Typed, which is a huge disadvantage as normal moves are not effective against anything. Even if it has charged moves of other types, the moves aren't boosted by STAB, reducing its viability. I am investigating on how slaking's viability can increase by changing its movepool.

## New Fast Move
We introduce Lock-On as the fast move, a move that doesn't do much damage itself but has a ridiculously high energy gain. 


### Potential Ice Type Attacker?
Why?
 - Ice type is one of the weaker types in pokemon go
 - Ice type is quite useful in raids, as many strong pokemons are doubly weak to it, such as rayquaza, dragonite, etc

### Ice Type Charged Move
We introduce an Ice Type move called Ice Blast. It has the same parameters as Aeroblast++, one of the strongest charged moves in the game. 


### Simulation
I use [This Website](https://gamepress.gg/pokemongo/comprehensive-dps-spreadsheet) for simulation

Note that I included Pound, "Ice Counter", A **Normal** type move with same parameters as the fighting move Counter

<iframe src="/assets/images/Ice.png" width="874px" height="503px"></iframe>

Slacking is **ONE OF THE** best ice type with this ridiculously good move, having roughly 20-30% better bulk while only trailing behind slightly in damage

### Other Ice Moves?
With Lock On + Avalanche, it is a decently good ice attacker, around the same as glaceon, which isn't that good to start with. It is bulky, however. Pound + Avalanche is even weaker, but not by too much, surprisingly


## Potential Ghost Type Anchor
Why? 
 - Slaking is doubly resisting ghost type moves
 - It can become an anchor, like Lugia

### Ghost Type Charged Move
We introduce an Ghost Type move called Ghost Blast. It has the same parameters as Aeroblast++, one of the strongest charged moves in the game. 

### Simulation

Its Damage is strictly inferior:

<iframe src="/assets/images/Ghost1.png" width="885px" height="474px"></iframe>

However it has a good $$\text{TDO}$$


<iframe src="/assets/images/Ghost2.png" width="882px" height="539px"></iframe>

```bash
TDO stands for Total Damage Output
```

However It as a high ER $$(\text{DPS}^3 \times \text{TDO})^\frac{1}{4}$$, which makes it viable (or even optimal) in many-person raids, if you don't want to use/ don't have energy for your primal groudon.

<iframe src="/assets/images/Ghost3.png" width="878px" height="536px"></iframe>

Below provides an insight on why using ER as a metric, and its importance:
[Reasons for using ER](https://www.reddit.com/r/TheSilphRoad/comments/z3xuzc/analysis_legendarymythical_signature_moves/)


### Fairy Type
 - Reason: Fairy type is extremely weak
 - Relevant Raids: Hydreigon

### Simulation
Slaking immediately becomes stronger than Mega Gardevoir, with a slightly lower $$\text{DPS}$$ but a higher bulk, resulting in a higher ER. It is $$31.6%$$ stronger than the next non-mega and non-shadow pokemon, Gardevoir.

Note: **Lock-On** with the existing move, **Play Rough** is also quite potent.


<iframe src="/assets/images/Ghost3.png" width="877px" height="496px"></iframe>


## Conclusion
Slaking is a pokemon with real potential. Despite without STAB, if it has good charged moves, it can potentially become one of the best pokemons in the whole game. However, I don't see this happening because Slaking is essentially the lazy pokemon, well known for being bulky and powerful but extremely lazy. I hope this analysis does provide you with some entertainment, however. See you next time around!