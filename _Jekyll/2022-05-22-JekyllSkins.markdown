---
layout: single
title: Changing Skins in Minima and Minimal Mistakes
katex: False
hidden: true
toc: true
toc_label: "Changing Skins"
toc_sticky: true
header:
  teaser: /assets/images/Useless4.png
authors: Henry
sidebar:
 nav: "Jekyll"
permalink: /Jekyll/skins/ 
---
## Important Disclaimer
Starting from 27/6/2022, we switch to another Theme, Minimal Mistakes. It is *much* easier to change skin colours there. The first part is no longer relevant --- unless you are still using **Minima**!
{: .notice--danger}

## Minima
Jekyll's default theme, **Minima**, provides 4 possible skins. This page (as of 22/5/2022) is created using the solarized skin. 

### Installation
Go to the [GitHub Page for Minima](https://github.com/jekyll/minima), copy the codes in **assets** and **_sass** to your VSCode (Use VSCode Please!). 

Note that for this Tutorial **_sass**, you only need to download **_base.scss**, **_layout.scss** and **initialize.scss**

Of course it is always best to download [all the files](https://github.com/jekyll/minima) in Github whenever you use a new theme!

Change the code in **initialize.scss** from:
```bash
@import
  "minima/custom-variables", // Hook to override predefined variables.
  "minima/base",             // Defines element resets.
  "minima/layout",           // Defines structure and style based on CSS selectors.
  "minima/custom-styles"     // Hook to override existing styles.
;
```
to
```bash
@import
  "minima/custom-variables", // Hook to override predefined variables.
  "minima/_base",             // Defines element resets.
  "minima/_layout",           // Defines structure and style based on CSS selectors.
  "minima/custom-styles"     // Hook to override existing styles.
;
```
Then download **classic.scss**, **dark.scss** and **solarized.scss** under _sass/minima/skins. 

There is **NO NEED** to download **solarized-dark.scss**. Whenever you want solarized-dark mode, just do the following:
```bash
$sol-is-dark: true;
```
### Before changing the theme:
Assuming you are chaning to solarized theme.
 Change the settings in **style.scss** to 

```bash
@import
"minima/skins/{{ site.minima.skin | default: 'solarized' }}",
"minima/initialize";

```
 Then change the settings in **_config.yaml** to

```bash
minima:
  skin: solarized
```
### Conclusion

I personally think all these themes look terrible, but that's how you do it. You can change some settings by adding **custom-styles.scss** and **custom-variables.scss**, it's a more _elegant_ way of changing things, but you can just change the codes in **_base.scss** and **_layout.scss**.

## Minimal Mistakes?

Download [all the necessary files](https://github.com/mmistakes/minimal-mistakes) from Github. Whenever you want to change your theme go to **_config.yaml** and find this line

```bash
minimal_mistakes_skin    : "dark" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```
I am using **Dark theme** as of 1/10/2022.







