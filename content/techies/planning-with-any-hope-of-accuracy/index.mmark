---
id: 165
title: Planning with any hope of accuracy
date: 2013-12-06T08:17:43+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=165
permalink: /planning-with-any-hope-of-accuracy/
category: techies
tags:
  - estimates
  - planning
  - psychology
---
In one sense, units don't matter at all. In another they are critical. It's all human psych.

The fundamental problem is a cognitive bias termed the Planning Fallacy. This well-documented bias shows that the human brain, even with training, always estimates outcomes on the information it knows. We have a well-researched, systemic bias that causes us to consistently under-estimate, even when we take this bias into account during estimation.

In the Agile world, we accidentally discovered a system that works around that bias. But most of us don't know that we're applying it, and the others don't see why they should.

<!--more-->

This has been called "What You See Is All There Is" (WYSIATI). Furthermore, the brain stores historical data (memories) as stories with cause and effect. It is unable to store base rate statistical info. Or, rather, it can store such as a raw fact, but that fact doesn't associate strongly to things, so doesn't end up getting activated / retrieved except when looking specifically for that fact.

The result is that all estimates have a systematic bias. They ignore base rates (which includes actual vs. estimated performance within a team), and they ignore all unforeseen work (treat that as zero). People can learn, so repeated comparing of estimate vs. actual can teach a person to apply a fudge-factor rule. But it takes many iterations to find such a rule and even more to change it. So the rule is typically about 1-2 years out of date (actually about 20-50 iterations out of date).

## How to estimate well

Given what humans are good at and what we are bad at, how do we develop a system that can make accurate predictions?

It turns out that humans are very good at consistency. For problems if a given complexity, each human will foresee about the same amount of that complexity. They will miss a larger percentage of a bigger problem, but the amount they see will be larger than the amount they see for a smaller problem. So can safely use humans to estimate which tasks are larger than others and which ones are about the same size.

Sadly, the human brain also will always answer a question it is asked. If it can't answer the stated question, it will substitute one that it can answer, without conscious awareness, as an heuristic. This means that the exact way we ask an estimating question will result in different substitutions, and so very different answers. This makes it very important what units we use.

To get the best answers, we want to make sure that we are just asking the brains for the parts that we do well. We do storytelling well. We do relative sizing well. So use one of those.

I ask one of the following questions:

  * How many meetings will it take to complete this work?
  * Assume you drink beer in order to solve each hard problem, and drink beer with each partner you need to discuss things with. How many beers do you need to drink to get this done.
  * Assume this one story (pick one at random) is 12 inches long. How long is each other story, in inches, feet, rods, or miles?
  * Place all the stories in piles such that all the stories in each pile are "about the same," and order the piles by increasing size. Define the size of one card from your first pile to be 1. Now compare that card to one random story from another pile. How many times larger is the second story (eg, 6 times larger)? Ok, each story from that pile is that size (6). Repeat for all piles.

Whichever we use, we now have a bunch of relative sizes. We know, however, that the brain misses more from larger stories. This results in units that are on some decreasing value scale (something with a character something like logarithmic). We would like to use a linear scale, so that we can treat 2 stories of size 2 as equal to one story of size 4. The scale is roughly linear for small regions. So we'd like to get all the items into the same region.

This means discounting (treating as zero cost) or bundling the small items while we break down the large ones. Once the variance in estimate between smaller and largest is within a factor of 3-4, we are probably within a close-enough-to-linear region.

Now we have an estimate that is precise, accurate, and completely useless.

## Getting to a plan

We know how many meetings we will have or how many inches of paper we need to show the project, but what we really need is time. We need a conversion factor.

There are two ways to get a conversion factor. The most common is to estimate it. We estimate the stories in terms of actual time (hours or ideal hours). We are guessing at the conversion factor. Unfortunately, this is exactly where WYSIATI bites us. We underestimate the conversion factor and get a bad result.

Fortunately, it is very easy to measure the conversion factor. Remember, people consistently miss about the same amount of stuff. So most any sample will be representative. We can pick any set of stories---say, the most important ones, do them, measure how many points we get done-done in a week, and use that to predict the conversion factor for the whole.

This conversion factor does change over time. And there is noise in it. So a recency-weighted rolling average can make it more useful (I use an average of the last 3 iterations in which I double the weight of the most recent).

There is one gotcha on this conversion factor: we will have missed some things. Some if this will show up as changed cost for a story. Great, that's incorporated in the measure. Other will show up as new stories or completely descoped stories. These need to be treated differently. In particular, work added to the iteration is likely to be predictive of work added to future iterations. So for iteration planning, we do not want to count completed effort towards work added mid-iteration. Including this effort would cause us to include more planned work, leaving no buffer for the inevitable adds and causing us to miss our commitment. Discounting this work leaves space for discovered work in each iteration.

Aside: measuring the amount of added work that we then do and also the work added to the project which is not in the iteration can help us identify systemic problems. This data is of negative value in iteration planning and used with care in release planning. But it can be very handy at retrospective time!

Finally, working in a region of somewhat linear character allows us to use the conversion factor via straight multiplication. Factor times cost of work in estimated units equals time. And if we estimated in inches, our conversion factor even looks like speed or velocity: its units are inches per week.

And now we have everything we need in order to make consistent predictions of the future. A set of estimated work that does not fall prey to the planning fallacy, a means of measuring a changing conversion factor via sampling, and a way to apply that conversion factor to an arbitrary subset of the work to project when it will complete.

This can be applied at any scale. The work items need to be in a linear region, but the smallest could easily be big enough to take a whole team of 8 several moons to complete. Often it is applies at two levels at once, resulting in iteration planning within release planning, and two velocities: one in inches per week, and one in cross-team offsites per month. This gets most of the way towards rolling-wave planning.

## Full circle: why not use ideal days?

Simple: who wants a conversion factor with units of days per day?

Seriously, this is the big reason. As soon as you talk about ideal days in your estimation, then you are saying that your process sucks. It is not ideal. You will receive pressure from yourself (and likely also your managers) to improve your velocity. Get more ideal days per actual day. Stop wasting time.

But the source of the delta is not wasting time. It isn't that you only get to code 4 hours per day. The source is the Planning Fallacy and WYSIATI. No matter how good your development process, you will never get a good ideal day per day ratio. And so you will always be striving to improve something that you can't improve, while there are potential improvements elsewhere.

## Do we even need estimates at all?

In a word: No.

My Naked Planning approach (from way back in the last decade) is based on the realization that estimates were waste. So we removed them. We just measured lead time directly.

Additionally, Bill Hanlon (who also works at Microsoft) has data that shows estimates to be pretty much useless as long as the story sizes are in the roughly-linear zone. He looked at 60-ish projects that used relative estimates. He looked at how accurate their predictions were as compared to the actuals. Then he reset all estimates to 1 and recomputed their velocities, made accordant projections and compared those to actuals. He found about a 3% variance in predictive accuracy between full data and just using 1.

Counting cards is as accurate as making estimates and counting them---as long as you are in the roughly linear region. So use estimates if you have to in order to get yourself to break down work to roughly equal-sized pieces. Beyond that, estimates are waste. Prediction has value, but you can get prediction based on data rather than on estimates.

Just estimate in inches. Or count cards. Measure your results. You will be happier. You will also be more predictable, so your customers, partners, and managers will be happier.
