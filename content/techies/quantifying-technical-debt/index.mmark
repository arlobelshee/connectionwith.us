---
id: 25
title: Quantifying Technical Debt
date: 2011-03-17T22:24:43+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=25
permalink: /quantifying-technical-debt/
category: techies
tags:
  - measurement
  - technical debt
---
While talking with people at Agile Roots last year, someone asked me how to measure technical debt. I came up with a metric that, while highly susceptible to gaming, can be really handy for a team to use internally.<!--more--> Just don't report it. The gaming happens subconsciously, and will ruin its efficacy if used if it gets tied to "goodness" of the developers or their team.

The metric is simple. We want to measure the size of the debt payments due to your code. With good code, you might actually have an asset, which pays out on future work. So we're going to measure how much we think it'll pay out or cost us.

  1. Pick a set of features that have not yet been implemented.
  2. Estimate the cost to add one to your system.
  3. Estimate the cost to create a new micro-app (trivial console app, web server, or whatever) that does just that one feature. However, you're not allowed to use _any_ of your code in this micro-app.
  4. Divide #3 by #2 and subtract 1. This is your application's rate of return.

Repeat this for several features in different areas of your app. Pick some ugly parts of your system and some clean parts. But don't average them together &#8212; just use the multiple samples to measure the varying health at different points.

When I talked about this with James Shore, he estimated that the best code bases he's worked with had about a 200% rate of return. I estimated the same for my favorite code bases. These systems were truely code assets: because of the code, it was a lot easier to implement new capabilities.

The worst system I've been in has somewhere around a -75% rate of return. For each dollar I put in, I'd get 25 cents back. Rather, I'd get what I could have gotten for 25 cents starting from an empty repository.

How does your system rate? Are there areas with a positive rate of return? Which areas (feature adds) have the most negative rate of return?

Use this to guide you when you are refactoring. You can also use this over time to see what the results of your refactoring have been. How much progress are you making?

Although this is in terms of dollars and therefore would make sense to management types, I recommend against reporting this value up the chain. The measurement fundamentally depends on the estimates given by devs, and these are only comparable to each other in the absence of any "less is better" pressures.

For that matter, it would be easy for devs to fool themselves. However, I depend on typical developer pessimism (in the absence of management pressure) to counteract that. At least they'll be able to put in effort and then see results.

One other thing I like about this metric: it makes clear that the goal is not just to reduce legacy code debt. That just gets you to 0. Further improvement is open-ended. How far can you drive your rate of return?
