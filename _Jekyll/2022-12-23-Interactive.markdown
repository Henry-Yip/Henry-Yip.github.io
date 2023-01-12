---
layout: single
title: Interactiveness of Jekyll
katex: False
hidden: true
toc: true
toc_label: "Adding Interactiveness"
toc_sticky: true
header:
  teaser: /assets/images/Useless4.png
authors: Henry
sidebar:
 nav: "Jekyll"
permalink: /Jekyll/Interactive/ 
---
## Static Websites
Jekyll generated websites are static... Yes, I know this sucks a lot... However, you can always make it interactive by introducing Iframes

### Iframes?
According to [hostinger.com](https://www.hostinger.com/tutorials/what-is-iframe/), An iFrame, also knowns as Inline Frame, is an element that loads another HTML element inside of a web page. They are commonly used to embed specific content like external ads, videos, tags, or other interactive elements into the page.

### How to find them
Usually the websites will provide them. For example, check [THIS](https://www.chess.com/article/view/how-to-embed-share-chess-media) for how to incorportate [Chess.com](https://www.chess.com/home) content into your page.

### Examples
```bash
<iframe id="9784479" allowtransparency="true" frameborder="0" style="width:100%;border:none;" src="//www.chess.com/emboard?id=9784479"></iframe><script>window.addEventListener("message",e=>{e['data']&&"9784479"===e['data']['id']&&document.getElementById(`${e['data']['id']}`)&&(document.getElementById(`${e['data']['id']}`).style.height=`${e['data']['frameHeight']+30}px`)});</script>
```
Translates to:
<iframe id="9784479" allowtransparency="true" frameborder="0" style="width:100%;border:none;" src="//www.chess.com/emboard?id=9784479"></iframe><script>window.addEventListener("message",e=>{e['data']&&"9784479"===e['data']['id']&&document.getElementById(`${e['data']['id']}`)&&(document.getElementById(`${e['data']['id']}`).style.height=`${e['data']['frameHeight']+30}px`)});</script>

Anyways, find the **Mate in 1**!

This Puzzle is part of my series, ["Chess with Toby Lam"]({% link _Chess/2022-12-22-TobyLam.markdown %})

### Security Issues
According to [hostinger.com](https://www.hostinger.com/tutorials/what-is-iframe/),
There was a surge of iFrame code injection on some legitimate websites, such as ABC news, in 2008. This type of attack redirects visitors to a malicious site, which will then install a virus to the visitors’ PC or attempt to steal sensitive information. That is why it is not recommended to include iFrame as an integral part of your website.

If you think that a website is not safe, don’t even bother to link it and don’t put its content in your iFrame element.

