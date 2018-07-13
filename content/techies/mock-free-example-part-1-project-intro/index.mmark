---
id: 42
title: "Mock Free Example, Part 1: Project Intro"
date: 2011-06-07T07:42:22+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=42
permalink: /mock-free-example-part-1-project-intro/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/78114082674327552
tt_tweeted_date:
  - 2011-06-07 15:00:23
category: techies
tags:
  - design
  - example
  - no mocks
  - tdd
---
Previously, I presented [mocks as nuclear weapons](http://arlobelshee.com/essay/how-i-learned-to-stop-worrying-and-love-the-mock "How I Learned to Stop Worrying and Love the Mock"). Unsurprisingly, commenters wanted examples. I exist to serve.

This series will discuss a partly-completed project that I have lying around. The project isn't perfect. But it will serve to discuss some of the ideas. Since it's only partly complete, some ideas visible in this stage that would likely become much more subtle with another few days' work. Or so I hope.

It's also a full project. The ideas blend into each other at the edges. I am not creating an example to demonstrate an idea; I'm showing how those ideas interact with each other in the wild. This will make the examples more difficult to follow. Sorry. I'll do my level best to guide you to the areas that I find interesting (whether positive, negative, or simply unfinished).

<!--more-->This post introduces the project. Future posts will examine some of the ideas in it, such as:

  * Designing libraries for substitutability---[Simulators](http://arlobelshee.com/post/mock-free-example-part-2-simulators "Mock Free Example, part 2: Simulators").
  * Data flow pipelines, my most favoritest pattern ever.
  * UI doubles --- like test doubles, but useful.
  * Asynchronicity for the win.
  * (Probably) [Simulators, redux](http://arlobelshee.com/post/simulating-the-file-system "Simulating the File System").
  * Extending your language to improve testability.
  * Default non-nullability.
  * Test class per responsibility.

But those are potentially interesting, so you have to wait for all of them.

### Project synopsis

I need to print my 4th Edition D&D characters. I am picky about format. In particular, I want to print the entire character to cards---not just the powers. I found a design template on the web; I want my cards to look like that.

### The complications

The character file contains only the dynamic data. All of the rules are available via a web service (The D&D Compendium), which requires authentication. This web service delivers HTML, with semi-structured data. I'll need to correct various common patterns of error in the data.

The character file contains partial computations for a bunch of things that I want to show on my cards. These computations are typically stored in text. I'll need to find them, parse them, combine the results with more parsed text from the web service, compute the resulting calculation, and print it on the card.

I need to be able to inject cards that aren't in the character file (such as my personality traits notes). I'll also need to allow per-character modification of any of the auto-gen cards. I need to hand-tweak cards to take into account house rules, new rules, and other special cases.

To achieve the above, I've created a config file for each character. Thus, my card printer is actually more of a WYSIWYG config file editor with print capability. Change the config file; see the resulting set of cards. This user interaction is actually the valuable part of the domain. Of course, the printing is high-precision. So the WYSISYG experience has to have perfec tfidelity, regardless of printer.

This is actually the second system. The first was in Python. it was hacked out in a weekend. It was reasonably well designed, but untested. Several parts were very useful, so I transliterated them into C# and included them in my initial project. So I start with instant legacy code. This legacy has a middling debt level. So I've got an area with high legacy, moderate debt (high value, moderate testability problems).

### Project restatement

Build a print layout tool for 4th Edition D&D. The user uses the tool to define a custom layout, with WYSISYG functionality. When happy, he prints the result. The printed result always looks exactly like the one on the screen.

### Technical details

The code is at <https://github.com/arlobelshee/PrintChar>. It is a 4 project C# solution. It is not very well organized yet. It is the result of about 20 hours' work, so the design has not emerged fully. Still, some parts of the design are just starting to emerge. We'll talk about several of these in later posts in the series.

Also, I intentionally used this project to learn about the new async libraries in .Net 4.0. I'd used the concepts before in other languages (mostly futures and continuations). However, I used them everywhere in this project, just to see where they were useful. Reflecting, I am surprised at some of the places they turned out to be a good idea. I'd still not use them quite so much in my next project.

Finally, I really, really, recommend that you use real tooling to play with this project. I assume Visual Studio, ReSharper, and Expression Blend. I do some things to really take advantage of those tools. Two of the blog posts in this series will focus on how I take advantage of strong tooling to eliminate sources of trouble.

To restate more firmly: I do not view a project as the sum of its code. Rather, it is the view of that code through the tooling that it is designed to take advantage of. By targeting my code towards my tools, I can get a lot of value with a lot less code.

I want to show how my design choices play out in real projects, so I'm using a real project to discuss them. That means that it is large, messy, and has requirements that will make it more difficult for some of you to navigate. For that difficulty, I am sorry. I could distill it to its essence. However, then it looks like answers to toy problems. People have difficulty seeing how it would apply in a real system. In this series, I intend to fail in the other direction.
