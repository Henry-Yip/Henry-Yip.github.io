---
layout: single
title: Jekyll Problems Q&A 
katex: False
toc: true
toc_label: "Jekyll Problems Q&A"
toc_sticky: true
header:
  teaser: /assets/images/Useless5.png
tags: Jekyll
hidden: true
sidebar:
 nav: "Jekyll"

      
permalink: /Jekyll/Q&A/ 
---
## Introduction to this section
If you have any problems to ask feel free to email **s2231321@ed.ac.uk**
**

#1 Insufficient resources online**

**Solution:**
Welp, there isn't much I can do with this one!

This is the exact problem I face with [Manim](https://github.com/ManimCommunity/manim/) (Note: Use the community version). There simply isn't sufficient resources online!

My approach with learning computers, no matter programming or building a website, is to do a project (like this one) (since most of the stuff you learn aren't useful anyways, the more important stuff will be used while you do your project). Your brain isn't designed to retain everything so only the important content keeps :)

While you can learn with [stackexchange](https://stackexchange.com/) (In fact, use it for everything), you are most recommended to learn the basics of everything and not jump a huge step. For example, before learning Manim, you **have to** learn Python and the first thing after you build your website using Jekyll is to understand the use of **_includes** and **_layouts folders** (and how the whole thing works). Don't involve yourself in difficult projects otherwise you'll still be helplessly stuck after hours!

Of course, there are [Github documentations](https://jekyllrb.com/docs/) that are quite useful. There are some codes you are borrow online (like those for how to make tags, etc.), but in general you have to explore on your own.


**#2 Canonical url being localhost**

**Solution:**
In command prompt, chdir into the place you saved the files, type 
```bash
bundle exec jekyll build
```
You should be able to see:
```bash
Destination: C:/Users/.../_site
```
Then after you push origin the problem should be solved!

**#3 Unable to make different headers for different people**

**Solution:**
I used a rather stupid method:
There are a lot of _layout files in minima. Say, if you want to edit the post layout such that it will appear different for every person (for example, you want to have different people contributing to different page, and you want the pages to be different for every person) -> First, create a new _layout file with a unique name like **post-Henry**, containing all the basic lines copied from the original **post** layout. Second, create some new headers, say, **henry-social-media.html**, **toby-social-media.html**, etc..., and put them under _headers . Third, inside the new _layout file, type
```bash
include (the header you want).html 
```

For example, you would want

```bash
include Henry-social-media.html 
```
inside **post-Henry**. Other than this line, everything else is same as the normal **post** layout.


In the front matter of the posts you make under _posts, include the new layout you created. For example:
```bash
---
layout: post-Henry
title: Machine Battle (Stockfish vs Fairy Max) analysis #1
katex: False
tags: Chess
authors: Henry
---
```

Therefore now, **post-Henry** includes the header you wants, for example **Henry-social-media.html**.

**#4 How to see the engagement rate of my websites?**

Login to Google Analytics and obtain a tracking ID (very easy) Create a file named **analytics.html** under _includes. Insert this code:

```bash
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=X-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'X-XXXXXXXXXX');
</script>
```
Where X-XXXXXXXXXX is your tracking ID. 
You can check the users by city, number of clicks, engagement rate etc, but information is extremely limited and isn't that useful. It's still pretty cool, however.

```bash
You are required to tell users the use of tracking services
```

**#5 Slow building speed**

I have seen complaints about this everywhere:
According to [blog.webjeda.com](https://blog.webjeda.com/jekyll-build-speed/#use-jekyll-incremental-build):

"Jekyll is super fast when it comes to sites with a few pages. It tends to slow down when the number of files increases and when complex Liquid conditions are executed frequently. The files usually cause this delay are posts, images, collections etc..

But remember that it is only the build speed I’m talking about not the site speed. Even if the build speed is slow, the output jekyll site is as fast as before on the internet. You can speed up the output jekyll site as well."

Use this line for incremental build:

```bash
jekyll serve --incremental
```

However the last time I ran it it failed miserably:
```bash
C:\Users\henry\OneDrive\Documents\Newwebsite>jekyll serve --incremental
C:/Ruby31-x64/lib/ruby/gems/3.1.0/gems/bundler-2.3.20/lib/bundler/runtime.rb:308:in `check_for_activated_spec!': You have already activated public_suffix 5.0.0, but your Gemfile requires public_suffix 4.0.7. Prepending `bundle exec` to your command may solve this. 
```    

Howevever considering it won't really take that long, it's probably just fine to let it run for a while!




