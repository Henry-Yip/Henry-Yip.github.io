var store = [{
        "title": "Chess AI Analysis",
        "excerpt":"   Game 1   Game 2   Game 3  ","categories": [],
        "tags": ["Chess"],
        "url": "/Chess/ChessAI/",
        "teaser": "/assets/images/AI.png"
      },{
        "title": "Petrov Defence",
        "excerpt":"Famous Traps There are some interesting traps for the Petrov Defense: 1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nxe4 4. Qe2 Nd6 5. Nc6+ Where the discovery check wins the Queen and black is immediately lost (+8.0!) Also Please Check the Stafford Gambit Famous lines: Classical Attack, Marshall Variation...","categories": [],
        "tags": [],
        "url": "/Chess/2022-05-27-Petrov/",
        "teaser": "/assets/images/Petrov.png"
      },{
        "title": "Alekhine Defense",
        "excerpt":"Four Pawns Attack 1.e4 Nf6 2.e5 Nd5 3.d4 d6 4.c4 Nb6 5.f4 A slight detour – Mokele-mbembe variation As explained in this post 3…f6 3…f6 is slightly inferior compared to 3…e6. After 3…f6 white is simply better because the knight on e4 is desparately alone, allowing developmental moves like 4.Bd3....","categories": [],
        "tags": [],
        "url": "/Chess/2022-05-31-Alekhine/",
        "teaser": "/assets/images/Alekhine.png"
      },{
        "title": "How should I learn Chess?",
        "excerpt":"Chess consists of 3 parts: Opening, Middlegame and Endgame How to Improve Openings First, make sure to check my posts on [chess openings] Openings have set theories and you need to grind through it. If you don’t have much time, I recommend you to play openings like London, where your...","categories": [],
        "tags": [],
        "url": "/Chess/learning/",
        "teaser": "/assets/images/How.png"
      },{
        "title": "How to learn Blind Chess?",
        "excerpt":"Motivation Mastering Blind Chess requires quite an intensitve training. It’s not only cool, but also improves your visualization skills and hence get better in middle games. Training Method Step 1: Master Chess Coordinates There are tons of platforms for this. Check THIS one for example. Generally aim 20-25 before proceeding...","categories": [],
        "tags": [],
        "url": "/Chess/BlindChess/",
        "teaser": "/assets/images/Empty.png"
      },{
        "title": "Daily Chess Puzzles (Updated Automatically)",
        "excerpt":"   Your Daily Puzzle from Lichess!   It is updated daily and automatically!   Click in to solve it/check analysis!     ","categories": [],
        "tags": ["Chess"],
        "url": "/Chess/ChessPuzzles/",
        "teaser": "/assets/images/Puzzles.png"
      },{
        "title": "Game 1 (Henry)",
        "excerpt":"I have installed two chess engines -Fairy Max and Stockfish in my computer so they can play bullet (i.e. 1 min each, no increments). As a chess variation enthuasiast, I also disabled castling to add more variety (yay!) (My next post will likely be on Chess960, a chess variation) I...","categories": [],
        "tags": [],
        "url": "/Chess/2022-06-05-Game1/",
        "teaser": null
      },{
        "title": "Game 2 (Henry)",
        "excerpt":"Rapid Game 10 minutes, no increments      White: Stockfish   Black: Fairymax    ","categories": [],
        "tags": [],
        "url": "/Chess/2022-06-05-Game2/",
        "teaser": null
      },{
        "title": "Stafford Gambit",
        "excerpt":"People (at least me) always relate Stafford Gambit with IM Eric Rosen, a famous chess streamer. It is a variation of the Petrov Defense with 3…Nc6?, a theoreticaly lost position for black, assuming perfect play. Top chess engines, like Stockfish, don’t favour these types of gambits because black is lost...","categories": [],
        "tags": ["Chess"],
        "url": "/Chess/Stafford/",
        "teaser": null
      },{
        "title": "Game 3 (Henry)",
        "excerpt":"Bullet Game - 1 minute      White: Fairymax   Black: Fairymax    ","categories": [],
        "tags": [],
        "url": "/Chess/2022-06-12-Game3/",
        "teaser": null
      },{
        "title": "Twin Primes",
        "excerpt":"#include &lt;iostream&gt; using namespace std; bool isPrime(int number) { for (int i=2; i&lt;number; i++) { if (number%i==0) { return false; } } return true; } int main() { int range; int counter=0; cout&lt;&lt;\"What is the Maximum Number?\"&lt;&lt;\"\\n\"; cin&gt;&gt;range; for (int i=2;i&lt;range;i++) { if (isPrime(i) &amp;&amp; isPrime(i+2)) { cout&lt;&lt;i&lt;&lt;\" &amp; \"&lt;&lt;i+2&lt;&lt;\"\\n\";...","categories": [],
        "tags": [],
        "url": "/Coding/TwinPrimes/",
        "teaser": null
      },{
        "title": "Cutoff Game (C++)",
        "excerpt":"#include &lt;iostream&gt; #include &lt;ctime&gt; #include &lt;cstdlib&gt; using namespace std; int randRange(int low, int high) { return rand()%(high-low+1)+low; } int main() { int number_trials,cutoff; int fail=0; int success=0; srand(time(NULL)); cout&lt;&lt;\"Number of trials: \"&lt;&lt;\"\\n\"; cin&gt;&gt;number_trials; cout&lt;&lt;\"Cutoff Score: \"&lt;&lt;\"\\n\"; cin&gt;&gt;cutoff; for (int i=0; i&lt;number_trials; i++) { if (randRange(0,100)&gt;=cutoff) { success++; } else {...","categories": [],
        "tags": [],
        "url": "/Coding/Cutoff/",
        "teaser": null
      },{
        "title": "Prime Gap",
        "excerpt":"#include using namespace std; bool isPrime(int number) { for (int i=2; i&lt;number; i++) { if (number%i==0) { return false; } } return true; } int NumberPrime(int order) { int counter=0; for (int i=2;i&lt;(100000-order);i++) { if (isPrime(i) &amp;&amp; isPrime(i+order)) { counter++; } } cout&lt;&lt;counter&lt;&lt;\"\\n\"; } int main() { for (int i=2;i&lt;500;i=i+2)//fill...","categories": [],
        "tags": [],
        "url": "/Coding/PrimeGap/",
        "teaser": null
      },{
        "title": "Henry Yip",
        "excerpt":"Education 2021-2025 BSc Mathematical Physics (Hons), University of Edinburgh I spent an enormous amount of time in these posts. Please read them [Astrophysics Notes] [Chess Series] I have a plethora of interests: Quantum Physics As a Mathematical Physics Major, I study physics with mathematical rigor. Currently, my favourite topic is...","categories": ["Henry"],
        "tags": [],
        "url": "/Contributors/2022-05-19-Henry/",
        "teaser": null
      },{
        "title": "Michael So",
        "excerpt":"Education 2015-2021 St Paul’s Co-educational College 2021-2027 M,B., Ch.B. CUHK (Stream: Global Physician-Leadership) A student who is continuously exploring the world, particularly the world within our cranium, while trying to blur the boundaries of arts and sciences. What I have to clarify in advance is that my seemingly serious and...","categories": ["Michael"],
        "tags": [],
        "url": "/Contributors/2022-05-27-Michael%20So/",
        "teaser": null
      },{
        "title": "Amanda Ng",
        "excerpt":"Hi, my name is Amanda. I am a second-year from University of Toronto who is double majoring Mathematics and Statistics. My interest fields are the general use of statistics in business field and communication through data. In the coming academic year, I will be joining a research team to work...","categories": ["Amanda"],
        "tags": [],
        "url": "/Contributors/2022-05-28-Amanda/",
        "teaser": null
      },{
        "title": "Andy Ng",
        "excerpt":"Education  2015-2021 St Paul’s Co-educational College   2021-2025 MBBS, The University of Hong Kong   ","categories": ["Andy"],
        "tags": [],
        "url": "/Contributors/2022-06-01-Andy/",
        "teaser": null
      },{
        "title": "Downloading and Using Jekyll (Window Users)",
        "excerpt":"(Updated on 14/6/2022, by Henry Yip) Downloading Jekyll You should check everything from this tutorial Requirements: Ruby Verison 2.5.0 or higher RubyGems GCC (GNU Compiler Collection) Make You can check if the version you have installed is correct using the commands below. As long as you know how to edit...","categories": [],
        "tags": [],
        "url": "/Jekyll/UsingJekyll/",
        "teaser": "/assets/images/Central.jpg"
      },{
        "title": "Jekyll Tutorials",
        "excerpt":"Why Jekyll There are many ways to create a website. Most people stick with “Website Builder” tools like wix, the major benefit being WYSIWYG. It is also relatively easier to build as you don’t need to work with command prompt and debug. However, for people using GitHub and are interesting...","categories": [],
        "tags": ["Jekyll"],
        "url": "/Jekyll/tutorials/",
        "teaser": "/assets/images/Central.jpg"
      },{
        "title": "Jekyll and KaTeX",
        "excerpt":"How to include Math Symbols in Jekyll Note that in this website, we use \\(\\KaTeX\\) instead of \\(\\LaTeX\\). If you want to use \\(\\KaTeX\\) in Jekyll, you first need to copy the _layouts and _includes files in GitHub. Afterwards, you need to include the necessary gems. Please refer to my...","categories": [],
        "tags": [],
        "url": "/Jekyll/Katex",
        "teaser": "/assets/images/Central.jpg"
      },{
        "title": "Changing Skins in Minima (Henry)",
        "excerpt":"Introduction Jekyll’s default theme, Minima, provides 4 possible skins. This page (as of 22/5/2022) is created using the solarized skin. (STARTING FROM 27/6/2022, WE SWITCH TO ANOTHER THEME) Installation Go to the GitHub Page for Minima, copy the codes in assets and _sass to your VSCode (Use VSCode Please!). Note...","categories": [],
        "tags": [],
        "url": "/Jekyll/skins/",
        "teaser": "/assets/images/Central.jpg"
      },{
        "title": "Jekyll Problems Q&A",
        "excerpt":"#1 Insufficient resources online Solution: Welp, there isn’t much I can do with this one! This is the exact problem I face with Manim (Note: Use the community version). There simply isn’t sufficient resources online! My approach with learning computers, no matter programming or building a website, is to do...","categories": [],
        "tags": ["Jekyll"],
        "url": "/Jekyll/Q&A/",
        "teaser": "/assets/images/Central.jpg"
      },{
        "title": "Introduction to Algolia",
        "excerpt":"Algolia Search is one of the best ways to enable searching in your Jekyll Website. For Windows users, all you need to do is to have a usuable Algolia account, cd into your directory and type: set ALGOLIA_API_KEY=(Your ALGOLIA_API_KEY) &amp;&amp; bundle exec jekyll algolia and then edit your config_yaml, gemfile...","categories": [],
        "tags": [],
        "url": "/Jekyll/Algolia/",
        "teaser": null
      },{
        "title": "Tropical Cyclones",
        "excerpt":"Introduction I don’t really like to include personal stuff, but given that this video covers almost everything, it’s a good start For those interested in Hong Kong’s tropical cyclone history, you should take a look of this website Beaufort Wind Scale Before everything, try to understand the beautfort wind scale...","categories": [],
        "tags": ["Typhoon"],
        "url": "/Meteorology/TropicalCyclones/",
        "teaser": null
      },{
        "title": "Classical Music Playlist (Henry)",
        "excerpt":"I am a classical music enthusiast. I planned to study a Master in Arts, and eventually gave up for physics. Over the past 4 years, I have compiled a list of my favourite recordings. I like way too many pieces, however, I have only listed some here: Bach Art of...","categories": [],
        "tags": ["Music"],
        "url": "/Music/2022-05-20-ClassicalMusic/",
        "teaser": null
      },{
        "title": "Astrophysics",
        "excerpt":"Introduction This set of notes is made with reference to the Astrophysics Coursebook by The University of Edinburgh. I have gained permission from Professor Catherine Heymans to put my modified notes in my website. It is also available in my GitHub account. Prerequisites Proficiency in Calculus and Classical Physics, in...","categories": [],
        "tags": ["Physics"],
        "url": "/Physics/Astrophysics/",
        "teaser": "/assets/images/Astro.png"
      },{
        "title": "Beyond a cursory look at the structure of the Lorentz factor (Leo Chow)",
        "excerpt":"This Page is created by Leo Chow Let’s take a look at the Lorentz factor: \\[\\gamma_v=\\frac{1}{\\sqrt{1-\\frac{v^2}{c^2}}}\\] On the right hand side is a recurring structure in the theory of relativity - it shows up in formulae frequently enough for people to give it a symbol. The structure at first sight...","categories": [],
        "tags": ["Physics"],
        "url": "/Physics/Relativity/",
        "teaser": "/assets/Leo2.png"
      },{
        "title": "Astrophysics",
        "excerpt":"Introduction This set of notes is made with reference to the Astrophysics Coursebook by The University of Edinburgh. I have gained permission from Professor Catherine Heymans to put my modified notes in my website. It is also available in my GitHub account. Prerequisites Proficiency in Calculus and Classical Physics, in...","categories": [],
        "tags": ["Physics"],
        "url": "/Astro/",
        "teaser": null
      }]
