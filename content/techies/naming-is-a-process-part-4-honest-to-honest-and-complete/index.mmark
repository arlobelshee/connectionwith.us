---
id: 218
title: "Naming is a Process, part 4: Honest to Honest and Complete"
date: 2015-08-26T07:34:36+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=218
permalink: /naming-is-a-process-part-4-honest-to-honest-and-complete/
category: techies
tags:
  - design
  - legacy code
  - naming
  - naming is a process
  - refactoring
  - tdd
---
In <a href="http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/" target="_blank">part 1</a> we talked about naming as a process. We talked about how legacy code is really defined by its poor legibility, and that reading is the core of coding. And we talked about how working effectively with legacy code is simply the process of having an insight, writing it down, and checking it in.

Later parts have gotten us to an Honest name.

Now let's look deeply at the third transition in names, from Honest to Honest and Complete.

<!--more-->

I need to make my name fully describe everything this method does. Each level of improved naming should record more insights and make it easier for the next person to read the code.

This level actually makes it unnecessary for the next person to read the code. We want them to be able to trust that the name includes absolutely everything the method does so they don't need to read the body. They should be able to read and understand calling methods without having to come read the method we're fixing.

To attain this end we look through the body and find every single thing that it does. One thing at a time.

> **Where to look:** in the body of the thing you are naming.

The process is:

  1. Find one thing that the code does (an effect, a calculation, a result, a state change).
  2. See if that is already included in the name (it might be a legitimate substep of something that is already in there).
  3. If not, add it.

Note: don't broaden the parts of the name. Your goal is not to find one abstraction that includes everything the method does. Your goal is to be precise; a reader should be able to read the method name and know _exactly_ what the method does.

Imagine emailing the method name to someone. Just the name. Would they be able to generate exactly all of the things in the method body? They shouldn't want to add any more things and they shouldn't miss any.

> **Our insight:** one specific thing your thing does which is not yet explicitly stated in the name.

Ignore everything you've been taught about naming conventions. Long names are good. Conjunctions are good. Belaboring the point is good. Your only goal is to make sure that everything this thing does is represented in the name. And therefore anyone can trust the name. They no longer have to read the thing, just its name.

> **What we write down:** add a clause to the thing's name.

### Really big things

Sometimes understanding a subcomponent requires extracting it and getting it to have a better name. This is especially common with long methods. When you do this, keep your focus on the main name. Extract a chunk and record insights only until you know whether or not it is important for naming your main thing. Then update the main name and move on.

Guard clauses are a good example. They're usually easy to identify but take up a bunch of space. I won't actually use them in the name of the thing (most of the time), but they can make it hard to read the rest.

I'll extract a bunch of what I think are guard clauses, get the name for the extracted component to be Honest and Complete, and see if they actually are all guard clauses. If so then I leave them alone and come back to the main method.

I'll extract guard clauses until I'm left with the residual. Then I'll analyze that more deeply and make sure I get everything into the name of my main method. I might inline the guard clauses again when I am done, or just leave them named something like _ValidateAllInputs().

In our running example I needed to take several steps to find all the things my method was doing. I eventually identified 4 main chunks of functionality, each of which happened in many steps. So my method became parseXmlAndStoreFlightToDatabaseAndLocalCacheAndBeginBackgroundProcessing().

### Things that aren't methods

This step also applies to variable and class names.

  * Classes should be named by all of their individual responsibilities.
  * Variable names should include all the ways the variable is used.

In deep legacy code variables may be used in a surprising number of ways. I once had a poor, overused in/out parameter that I had to name searchHintThenBestMatchSoFarUntilItBecomesReturnValueOrReasonNoMatchWasFound.

### Aside: naming by what it is or what it does

Here the insights that I'm having are all the important characteristics of the thing I am naming. I'm naming it by what it _does_, not by what it _is_. This shift is a critical step in eliminating god classes and long methods.

  * When a thing is named by what it is, then it accumulates everything vaguely related to that identity.
  * When it is named by every single thing it does, then our desire for shorter names drives us to have it do less stuff.

> If you want a thing to collect functionality and grow, name it by what it is. If you want it to split and shrink, name it by what it does.

This is the opposite of the Whole Value pattern. We use Whole Value when code has Primitive Obsession---when all the parts of what it does are scattered around the codebase and we want to collect them. Creating a thing and naming it by what it is causes programmers to naturally collect all those things. When we have a god class or a long method we want to split it. Naming it by what it does causes programmers to naturally split it up.

### The Naming is a Process blog series

  1. [Good naming is a process, not a single step](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/)
  2. [Missing to Nonsense](http://arlobelshee.com/naming-is-a-process-part-2-missing-to-nonsense/)
  3. [Nonsense to Honest](http://arlobelshee.com/naming-is-a-process-part-3-nonsense-to-honest/)
  4. Honest to Honest and Complete (this entry)
  5. [Honest and Complete to Does the Right Thing](http://arlobelshee.com/naming-is-a-process-part-5-honest-and-complete-to-does-the-right-thing/)
  6. [Does the Right Thing to Intent](http://arlobelshee.com/naming-is-a-process-part-6-does-the-right-thing-to-intent/)
  7. [Intent to Domain Abstraction](http://arlobelshee.com/naming-is-a-process-part-7-intent-to-domain-abstraction/)
  8. Summary and Learning Path (will publish Tuesday, 9/1/2015)
