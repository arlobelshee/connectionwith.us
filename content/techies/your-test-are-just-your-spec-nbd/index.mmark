---
id: 173
title: Your test are just your spec. NBD.
date: 2014-03-14T07:44:28+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=173
permalink: /your-test-are-just-your-spec-nbd/
category: techies
tags:
  - Agile
  - legacy
  - tdd
  - test first
---
I find one of the important early mind shifts to be a switch from thinking of unit tests as test to thinking of the set of all tests as your spec.

If your spec is clean, you could delete your product code, hand it to someone, and they would implement the same product, with roughly the same design.

If your product code is clean, you could delete your spec. Hand the code to someone and they could extract the spec from the code, ending up with a similar spec.

The first of these is called TDD. The second is called working effectively with legacy code.

<!--more-->

In the real world, I commonly have a system where both product and spec are partially complete and partially clean. So sometimes I need to derive the spec from the code. Other times I need to derive the product from the spec. The key is to know which I am doing when, and why.

  1. Can't see the spec, but can see a rough version of the code? Write a prototype. Now you have some nice legacy code. We know what to so with that: derive the spec and then refactor both for legibility.
  2. Can't see the optimal design, but can see part of the spec? Do GOOS. Write the spec you can see, add the code, refactor until the next spec is visible, repeat. TDD. Note: growing the spec may or may not mean TDA architecture.
  3. Can see both? TDD. Is more incremental than the code first approach, so avoids that big step. The big step has high cognitive load so can introduce errors.

In any of these cases, all common wisdom from specs applies:

  * Of course you write your spec first. Except when you write a prototype to figure out the spec and then refactor the prototype to be the real solution.
  * Never change both spec and code at the same time.
  * Spec needs to be verifiable by inspection by a BA, not just by coders. Think English / fluent, not loops and conditionals. (tests are legible)
  * The best form of a spec is examples. The next best is a simple local rule plus examples (a theory test). Other forms don't work well.
  * Overspecification is worse than underspecification. The spec should only require what it means to require. A given clause (test) should only fail for one possible reason; that one reason should be obvious from the title of the clause. (tests are granular)
  * The spec should not be redundant. Only one clause / case should mention any one reason. (tests are independent)

Most of what makes a good test suite can be derived from its role as a spec.

At higher levels of skill it will also become the design document, and the rest of the good characteristics come from that role. But that comes later and requires significant refactoring fluency in the team. And that turns it from test first to TDD.

Every team already knows how to code to a spec. Test first the same thing.
