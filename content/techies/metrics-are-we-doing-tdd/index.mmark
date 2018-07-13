---
id: 186
title: "Metrics: are we doing TDD?"
date: 2014-05-30T07:08:27+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=186
permalink: /metrics-are-we-doing-tdd/
category: techies
tags:
  - metrics
  - tdd
  - unit testing
---
A manager recently asked me how to measure whether the teams were unit testing. He believes that they are. He has heard strong alignment among ICs and managers. He also knows that the teams have no way to see if they actually are unit testing or how well.

He, like most people, asserted the use of code coverage as the core metric. Both total and per-commit delta.

I agree that we need some optics. I just think code coverage is a crap measure.

<!--more-->

# Instead of code coverage

I’d use something like the following:

  * Lead time to fix (wall-clock time from moment check-in introduced a bug into any branch until when it was gone entirely – including production).
  * \# bugs written per time period (favorite measure is # of stories delivered since bug – treat all bugs the same as manufacturers or construction sites do injury accidents. This also biases teams towards smaller stories, which is a good thing).
  * Lead time to prevention (wall clock time from moment check-in introduced a bug into any branch until when the team had fully and successfully adopted both a change in its process that would have detected any defect of that class early and a change that would have prevented any defect in that class from being written).
  * Total number of UTs / delta UTs per commit and per week (yes, raw count; should remain proportional to product size over time).
  * Total UT run time (should go down over time).
  * Hot spot analysis (run entire test suite under a perf tool; view histogram of code by # of calls. No code should execute more an 5-8 times in a single test run. Initially set “5-8” as some team-specific, higher number; ratchet it down).
  * \# of bugs in the bug DB (should monotonically decrease to 0, then wobble between 0 and 1; no distinction is made based on priority or severity).

Generally, I follow the measure one level out and up approach. We want to see that we are unit testing. Actually, we don't care about unit testing (the [behavior](http://www.sixboxes.com/Performance-Chain.html?)). We care about the results.

# Why I use these measures

If we unit test but don’t refactor, then we will find (some) bugs earlier. If we unit test and refactor then we will prevent bugs---fewer mistakes will be made, so less to detect. So let’s measure those two outcomes as our primary measures.

We get to prevention by treating bugs as indicators of systematic problems and then fixing the system. So let's measure how long it takes us to apply a system fix, from the first moment we could have known the system needed fixing.

Then supplement with a raw count number to ensure this is how we accomplished that objective and 2 measures to make sure we aren’t over-testing (which is the most common way to sacrifice long-term effectiveness for short-term ease while unit testing).

Finally, all of this should pay off in a monotonic decrease in bugs. This is a pretty good measure of level 1 technical debt: being debt-free requires being bug-free (and more). And the point of all of this is to be debt-free so that we can release good products quickly.

# Brownfield vs. Greenfield

Teams with legacy code can get the same results as greenfield teams on everything except bug DB size.

Which is accurate. They’ve got technical debt and will need to pay that off, over time, if they want to be in the fully healthy state. In the meantime, they can show healthy behavior. Their bug DB size decreases monotonically.

# What about gaming the metrics?

That is a problem. Several of these metrics are highly gameable. Therefore, don't report these to management or assess them per-individual. These are team-scope metrics only: report the whole team's total numbers to the team and to no one else.

If others want to see whether the team is good at TDD, then look one more level up and out.

Bugs cause 2 things: customer dissatisfaction and shipping delays (stabilization periods). So look for those.

If a team honestly has no bugs, they will have a low call volume in customer support, their schedules will not include a stabilization period, and they will hit their delivery dates accurately---neither adding nor removing scope, not working hard or slacking, and neither early nor late. This level of execution precision requires eliminating the variance caused by bugs.

If you're a manager and want to see if your team does TDD well, look at customer support call volume and missed promises. The things you care about that TDD is supposed to fix. If you are a team and want to see if you are doing TDD well, then use the team-scope measures above. Don't cross the streams.
