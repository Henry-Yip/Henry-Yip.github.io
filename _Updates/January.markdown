---
layout: single
title: Website Update Log - January 
katex: True
permalink: /Updates/January/
toc: true
toc_label: "Updates"
toc_sticky: true
header:
  teaser: /assets/images/LaTeX.png
sidebar:
 nav: "LaTeX"
---

```bash
Date: 24/1/2023
```
#1: Major Error Fix

 - Problem: Some posts in "Journal" don't show up. 
 - Thoughts and Solution: I've found out some unnecessary **HTML** files that may have "masked" my **Markdown** files. These files seem to come from _sites, and it may be a result of moving files around carelessly. Therefore I have deleted all these files.
 - Further Prevention of Problem: Potentially deleting _sites permeanantly? As for how to do this I will further investigate

 ```bash
 Solved!!!
 ```

#2: Navigation Problems
 - Problem: In Physics page, in some sections, like
 ```bash
 /Home/Physics/Astrophysics (Part 2) 
 ```
   when I click on Physics , Error404 appears, which causes huge problems. 
 - Thoughts and Solution: [https://henry-yip.github.io/physics](https://henry-yip.github.io/physics) is the url appearing instead of [https://henry-yip.github.io/Physics](https://henry-yip.github.io/Physics). I have changed **everything** in **_config.yaml**, **navigation.yaml** but this doesn't solve the problem

```bash
Unsolved!!!
```

#3: Image Resizing
 - Problem: Auto-image resizing isn't enabled in this website, so some images have awkward size
 - Thoughts and Solution: I have tried to download **jekyll-responsive-image** but my something in my gemfile doesn't allow me to. 
 
```bash
Unsolved!!!
```








 


