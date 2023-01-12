---
layout: single
title: Downloading and Using Jekyll (Window Users)
katex: True
hidden: true
toc: true
toc_label: "Jekyll for Window Users"
toc_sticky: true
header:
  teaser: /assets/images/Useless1.png
sidebar:
 nav: "Jekyll"
permalink: /Jekyll/UsingJekyll/

---
(Updated on **14/6/2022**, by Henry Yip)
## Downloading Jekyll
This tutorial is largely based on [the official website](https://jekyllrb.com/docs/)
# Requirements
Requirements:
 * **Ruby** Verison **2.5.0** or higher
 * **RubyGems**
 * **GCC** (GNU Compiler Collection)
 * **Make**

### Checking
 * You can check if the version you have installed is correct using the commands below. As long as you know how to edit **path environment** it should be quite trivial.
```bash
ruby -v
```
```bash
gem -v
```
```bash
gcc -v
```
```bash
g++ -v
```
```bash
make -v
```

 * Afterwards, download [Ruby+Devkit version from RubyInstaller Downloads](https://rubyinstaller.org/downloads/)   
 * Run **Ridk install** step on the last stage of the installation wizard
 * Go to **Command Prompt** and type:
 ```bash
 gem install jekyll bundler
 ```

 * Then **chdir** into your prefered location and type:
```bash 
Jekyll new ...
```

 * For example:
```bash
C:\Users\Betel>cd Documents
C:\Users\Betel\Documents>jekyll new ScienceProject
Running bundle install in C:/Users/Betel/Documents/ScienceProject...
  Bundler: Fetching gem metadata from https://rubygems.org/..........
  Bundler: Resolving dependencies....
  Bundler: Using bundler 2.3.14
  Bundler: Using public_suffix 4.0.7
  Bundler: Using colorator 1.1.0
  Bundler: Using concurrent-ruby 1.1.10
  Bundler: Using eventmachine 1.2.7
  Bundler: Using http_parser.rb 0.8.0
  Bundler: Using ffi 1.15.5 (x64-mingw-ucrt)
  Bundler: Using forwardable-extended 2.6.0
  Bundler: Using rb-fsevent 0.11.1
  Bundler: Using rexml 3.2.5
  Bundler: Using liquid 4.0.3
  Bundler: Using mercenary 0.4.0
  Bundler: Using safe_yaml 1.0.5
  Bundler: Using unicode-display_width 1.8.0
  Bundler: Fetching rouge 3.29.0
  Bundler: Using addressable 2.8.0
  Bundler: Using kramdown 2.4.0
  Bundler: Using i18n 1.10.0
  Bundler: Using em-websocket 0.5.3
  Bundler: Using terminal-table 2.0.0
  Bundler: Using sassc 2.4.0
  Bundler: Using rb-inotify 0.10.1
  Bundler: Using kramdown-parser-gfm 1.1.0
  Bundler: Using pathutil 0.16.2
  Bundler: Using listen 3.7.1
  Bundler: Using jekyll-watch 2.2.1
  Bundler: Using jekyll-sass-converter 2.2.0
  Bundler: Installing rouge 3.29.0
  Bundler: Using jekyll 4.2.2
  Bundler: Using jekyll-feed 0.16.0
  Bundler: Using jekyll-seo-tag 2.8.0
  Bundler: Using minima 2.5.1
  Bundler: Bundle complete! 7 Gemfile dependencies, 31 gems now installed.
  Bundler: Use `bundle info [gemname]` to see where a bundled gem is installed.
New jekyll site installed in C:/Users/Betel/Documents/ScienceProject.
```

## Code Editor
I recommend using [VSCode](https://code.visualstudio.com/Download).
Obviously Notepad works also but that's my personal preference.

## Building the files
The folders you have created lack details.
It uses **Minima** as the Default theme, which is simplistic but quite plain.
For example, you may want to have **_includes** and **_layouts** folders to enable **google analytics**, **comments**, **search function**, etc...

You can take references from websites such as the [sample Minima Website](https://github.com/jekyll/minima) and check what to include in these folders. Also, Jekyll supports a myraid of [plugins](https://en.wikipedia.org/wiki/Plug-in_(computing)).
If you want to include mathematical symbols in your website, make sure to check out:

[How to enable $$\LaTeX$$ style mathematical symbols in Jekyll]({% link _Jekyll/2022-05-19-Katex.markdown %})

## Final Touch
If you want an aesthetically beautiful website, you can include **css**. The basics should be trivial but it becomes increasingly complicated, and since Jekyll Themes are beautiful already (in my opinion), it may be unnecessary. 
I do recommend you to check out [this post]({% link _Jekyll/2022-05-22-JekyllSkins.markdown %}) if you want to know more about the possible colours in Minima theme.

If you use other themes there are tons of tutorials online. One of the most famous themes available is [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes). 

I believe some of my friends have built some websites also and they use vastly different methods. Toby however used a similar method as mine. For comparison please check out [his post](https://tobylam.xyz/2022/12/21/elements-of-tobylam.xyz.html).

## Next Post
[How to enable $$\LaTeX$$ style mathematical symbols in Jekyll]({% link _Jekyll/2022-05-19-Katex.markdown %})

## Main Page
[Jekyll]({% link _Jekyll/2022-05-19-Jekylltutorial.markdown %})


