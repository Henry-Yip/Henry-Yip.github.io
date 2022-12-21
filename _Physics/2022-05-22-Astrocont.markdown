---
layout: single
title: Astrophysics (Part 2)
katex: True
tags: Physics
authors: Henry
toc: true
toc_label: "Astrophysics (Part 2)"
toc_sticky: true
permalink: /Physics/Astrophysics2/
header:
  teaser: /assets/images/Astro.png
sidebar:
 nav: "Physics"
---
If you request me to send you the astrophysics pdf (I promise you I will if you ask !) I will also send you the tex code. Below I will show you how to use!
## 1. Overleaf

Overleaf is an online, collaborative [LaTeX](https://en.wikipedia.org/wiki/LaTeX) Editor. 

### Downloading the documents

Go to [the offical website of Overleaf](https://www.overleaf.com/) and register for a new account. Create a new project and copy all the lines in the tex document). If you want to fiddle around a bit and see your new PDF, press compile and download the new pdf document.

## 2. TexMaker

Download [TexMaker](https://www.xm1math.net/texmaker/) (Alternatively, you can also use [VSCode](https://code.visualstudio.com/Download), it looks better but they are essentially the same, excepts that VSCode also supports other programming languages, like Python, etc)

### Converting your PDF File in TexMaker to PDF
Save your document as Astrophysics.tex. Download MikTeX (The Source Code is available in [GitHub](https://github.com/MiKTeX/miktex/)), go to comamnd prompt and cd to the place you stored your tex file. 
```bash
pdflatex Astrophysics.tex
```
You can also click "View" in TexMaker, then "print" and then "Microsoft Print to Pdf". However, for me at least, the hyperlinks may be lost.

## 3. A sneak peak of the Original Code
**Warning:For $$\LaTeX$$ users only!!**

Well... To be honest I prefer not posting everything online to the public (If you dm me, I will most definitely send you!)

However, this is a sneak peek of the notes so you can have an idea of what $$\LaTeX$$ is!
(There are some minor mistakes in the calculation part...)
For the product press [HERE]({{site.url}}/assets/Sneak.pdf)
{% highlight ruby %}
\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage[margin=0.8in]{geometry}
\usepackage{parskip}
\usepackage [utf8] {inputenc}
\usepackage{titlesec}
\setcounter{secnumdepth}{4}
\titleformat{\paragraph}
{\normalfont\normalsize\bfseries}{\theparagraph}{1em}{}
\titlespacing*{\paragraph}
{0pt}{3.25ex plus 1ex minus .2ex}{1.5ex plus .2ex}
\newcommand{\ie}{\textit{i}.\textit{e}. }
\title{\textbf{A Sneak Peak}}
\author{Henry Yip
s2231321@ed.ac.uk
}
\begin{document}
\maketitle
\begin{abstract}
This set of notes is made with reference to the Astrophysics Coursebook by The University of Edinburgh (Introductory Astrophysics, Course PHYS08050) . I have gained permission from Professor Catherine Heymans to put my modified notes in my website. It is also available in my personal website.


This is a special version of the notes (A Sneak Peak!) If you want the original copy, please email henry36c@gmail.com or ask Henry in person (Well he's quite a nice guy)
\end{abstract}
\section{Some Black Holes}
\begin{itemize}
\item If a small mass $\Delta m$ starts from a distance and falls onto a large mass $M$, it gains kinetic energy:
\begin{equation}
E=\frac{GM \Delta m}{R}
\end{equation}
\item For gases however, friction and collisions randomise the energy and turn it into heat
\item For a black hole:
\begin{equation}
R_\text{Event Horizon}=\frac{2GM}{c^2}
\end{equation}
\item By substitution,
\begin{align}
E&=\frac{GM \Delta m}{\frac{2GM}{c^2}}\\
&=\frac{1}{2}\Delta m c^2
\end{align}
\item The efficiency, $\mu$, is 0.5, which is much higher than $\mu_\text{nuc}=0.007$
\item This is obviously, a fallacy
\item \textbf{Incorrect Assumptions}
\begin{itemize}
\item Radial free fall is unlikely
\item At larger distances, the
accreting material will always have some angular momentum, and end up forming a rotating disc around the black hole
\item Friction between neighbouring radial annuli then allows
the material to slowly spiral inwards, forming a gradually heated accretion disc
\item Efficiency $\mu$ is reduced by the following 2 effects:
\begin{itemize}
\item Effective radius is \textbf{not} the Event Horizon. For non-rotating black-holes, the ISCO is located at:
\begin{align}
r_\text{ms}&=6\frac{GM}{c^2}\\
&=3R_\text{EH}
\end{align}
\item I.e. There is no stable orbit $<3R_\text{EH}$
\item And therefore the thermal energy gained by the gas decreases
\item Some energy (half) is converted to rotational energy, as:
\begin{align}
\Delta K& =\dfrac{dK}{dR} \Delta R\\
&=-\frac{GM\Delta m}{2R^2} \Delta R
\end{align}
\begin{align}
\Delta U& =\dfrac{dU}{dR} \Delta R\\
&=-\frac{GM\Delta m}{R^2} \Delta R
\end{align}
\begin{align}
\frac{\Delta K}{\Delta U}&=\frac{-\frac{GM\Delta m}{2R^2} \Delta R}{-\frac{GM\Delta m}{R^2} \Delta R}\\
&=\frac{1}{2}
\end{align}
\end{itemize}
\end{itemize}
Combining with other effects, we have $\mu \approx 0.1$
\end{itemize}
\subsection{Eddington Luminosity}
\begin{itemize}
    \item A photon has energy $E=\frac{hc}{\lambda}$ and momentum $p=\frac{h}{\lambda}=\frac{E}{c}$. So you can visualize momentum flux being $\frac{S}{c}$, where $S$ is the radiation flux
    \item Most of that flux may pass straight through, but some of it will scatter on the electrons inside atoms. That scattering produces a force on the electrons, which drag the
     atoms with them. The scattering process has a cross-section $\sigma_e = 6.65 × 10^{-29} m^2$ 
    \item The \textbf{rate} \footnote{This implies differentiation} of momentum transfer (or in other words, radiation force on each atom) is therefore:
     \begin{equation}
        \dfrac{dp}{dt}=\frac{S \sigma_e}{c}
     \end{equation}
    \item Combining with $L=\frac{S}{4 \pi R^2}$ we obtain:
    \begin{equation}
        F_\text{radiation}=\frac{L \sigma_e}{4 \pi R^2 c}
    \end{equation}
    \item Assuming all the gas are hydrogen and each hydrogen atom composes of 1 proton, which has mass of $m_p$. As $m_e<<m_p$, we have:
    \begin{equation}
        F_\text{gravitation}=\frac{GMm_p}{R^2}
    \end{equation}
    \item At the limiting luminosity, the outward radiation force is equal to the inwards gravitational force, \ie $F_\text{radiation}=F_\text{gravitation}$. Combining everything gives us:
    \begin{equation}
        L_\text{Max}=\frac{4 \pi G m_p c}{\sigma_e} \times M
    \end{equation}
\end{itemize}
\section{Distance-redshift relation}
\begin{itemize}
\item This section resulted in a Nobel Prize in 2011. They used distant supernova as standard candles to probe the Universe
\item We have the formula $D=\frac{cz}{H_0}$. There is an extension that works for more distant galaxies:
\begin{equation}
D_L \approx \frac{c(1+z)(z-\frac{1+q}{2}z^2)}{H_0}
\end{equation}
\item Where $q=-\left(1+\frac{\dot{H}}{H^2}\right)$ and $\dot{H}$ is the rate of change of the Hubble parameter
\end{itemize}
\section{Concordant cosmology}
\begin{itemize}
\item Baryonic content  $\Omega_b \approx 0.05$
\item The total dark and baryonic matter content $\Omega_m \approx 0.3$
\item Dark energy content $\Omega_\Lambda \approx 0.7$
\item The university is flat and has critical density:  $\Omega_b+\Omega_m+\Omega_\Lambda=1$
\end{itemize}
\end{document}


{% endhighlight %}


Feel free to send me any corrections!