---
id: 75
title: Hamlet On Branching
date: 2012-05-21T08:10:57+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=75
permalink: /hamlet-on-branching/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/204590235210874881
tt_tweeted_date:
  - 2012-05-21 15:11:27
category: techies
tags:
  - Agile
  - branching
---
> To branch, and when to branch: that is the question:

> Whether ’tis nobler in the mind to suffer

> The slings and arrows of poor integration,

> Or to take arms against a sea of features,

> And by swarming end them? To end: to ship;

> <!--more-->No more; and by a merge to say we end

> The heart-ache and the thousand natural shocks

> That code is heir to, ’tis a consummation

> Devoutly to be wish’d. To end, to ship;

> To ship: perchance to sell: ay, there’s the rub;

> For in that blend of code what bugs may come

> When we have combined from these sep'rate goals,

> Must give us pause: there’s the respect

> That makes calamity of sharing main;

> For who would bear the WIP and loss of time,

> The bugs found too late, the buyer’s contumely,

> The pangs of despised blog, the test’s delay,

> The management in anger and the spurns

> That features merit of the unworthy takes,

> When he himself might his quietus make

> With simple merging? who would late bugs bear,

> To grunt and sweat under a weary life,

> But that the dread of something that can't ship,

> The undiscover’d country from whose bourn

> No programmer returns, puzzles the will

> And makes us rather bear those ills we have

> Than fly to others that we know not of?

> Thus conscience does make cowards of us all;

> And thus the native hue of resolution

> Is sicklied o’er with the pale cast of thought,

> And enterprises of great pith and moment

> With this regard their currents turn awry,

> And lose the name of action.–Soft you now!

> The fair Integration! Conflicts, thy presence

> Be all my sins remember’d.

Hamlet faces a choice. He knows what he wants---what he feels will serve his project best. Yet he chooses it not. He chooses the "ills we have" over the "undiscovered country."

## Why?

Because the choice he stands to make---to branch and when to branch---will change him. It will not just change his circumstances. It will change his entire understanding of stability, delivery, and integration with his peers. From his current state he cannot understand those who have made the shift. And most who have made the shift cannot understand his current state.

So stand we with branching.

There are two states: integrate to main only when the code is shippable, and work directly in main and keep every small step shippable. Both work. Both exist to ensure that main is always shippable. But their implementations and ramifications are entirely different.

## To feature branch

In the first camp each feature team works in a branch. Every day or two they take an integration from main. Once their feature is done they integrate it back to main.

The goal of this strategy is to ensure that not only does main always pass tests, but each feature in main is complete enough to ship to customers. There is never a partialy done feature that may block a shipment.

The downside is that integrations between features can only happen once one of those features is done enough for a customer to see. Only upon scope completion (including fit and finish) does a feature hit main and then go to other teams.

Furthermore, integration problems increase super-linearly with the number of calendar hours between full integrations. This is the calendar time from when I write code, check it in, push it to main, you pull it into your branch, and you integrate it with your code.

In this approach there is no way for teams to integrate two features that are both release quality (no bugs) but not release scope (ready for a customer to use). This works only as long as the team is very good at narrow-scoping.

The real goal is simply to do a full integration with all team members a couple of times per day (more than that further reduces integration costs, but 4 times per day is usually cheap enough).

So working with feature branches is fine---as long as each feature completes in 2 hours or so. There are teams that can define their scope this narrowly. They love feature branching. Their code is always shippable and fit to the customer's purpose, and they don't ever need to plan for a release.

## Not to feature branch

Another train of thought has each person commit directly to main. There are no branches.

In this case, each person makes sure that all tests pass with every commit and integrates immediately. This minimizes the time between integrations People will pull from main several times per hour and push as soon as they pass tests. The team can easily exceed 4 full-team integrations per day.

But the team needs some way to disable partly-done features. There will be commits that pass all tests but would confuse users. These commits complete tasks but not stories.

Common engineering solutions exist. An unfinished work flag allows the new way to show up on local dev boxes and the test box, but the old way to show up on staging and production. Web sites build out pages or sub-sites and then only link into those sites when done. GUI applications do the same but with new windows.

## Variations

Local source control (DVCS) and local branches are often stated as a distinct third option. I hold that they are one of the above two in disguise. The most significant bit of your branching strategy is when and how each person integrates to the rest of the team's code.

Is there one source of truth that everyone integrates to often, or are there multiple distinct heads, each in advance of the shippable main?

Local branches don't change the answer to this question. I recommend them for whichever branching strategy you follow. They make it easier to work between integrations. You can commit even when things aren't working, and you can revert at will.

It's just that they don't make it easier for the team to integrate its code.

## The question

This brings us to the question that programmers always ask: which approach is better?

I certainly have an answer to this question. But more importantly I respect both answers. Each approach can be, and has been, used to ship software successfully and frequently.

It's just that the not branching approach is (usually) easier.

Why? I find most teams have a lot of difficulty narrow-scoping their stories. Often projects in their third year with the same team can narrow-scope pretty well. But before that each feature seems to require a bunch of helper code. That takes time. In the branching approach, that time delays integrations and directly causes bugs.

The no branch approach, on the other hand, requires that each feature follow the same recipe.

First, the project has to define a conditional that can be used to decide whether to use the new (bug-free but incomplete) way or the old (working) way. I usually call this Show.UnfinishedWork. Every feature follows this recipe:

  1. Insert a conditional on Show.UnfinishedWork. The "false" branch (the one for finished work only) wraps the existing code.
  2. Copy the current approach into both branches.
  3. Freely change the unfinished branch. Make multiple commits to main. Each needs to not break other devs, but it can break user features.
      * Make sure all tests pass on every commit.
      * Implement the new way as a new unit. Keep the old way unit tests and add unit tests for the new way.
      * Integration tests, especially long-span integration tests, will get in the way. As with refactoring, life is usually simpler without them.
  4. When the feature is done, delete the old way branch, the conditional, and the old tests.

The branching approach requires one-time effort (setting up branches) and then thinking on each feature. The no-branches approach requires one-time thinking (implementing the unfinished work infrastructure and defining the recipe for your domain) and one-time dumb action (follow the recipe).

I, and many others, find the no-branching approach to be simpler. It requires less thought to get a good outcome. It results in fewer released bugs and more frequent shipping. I choose my practices based on results, not on theory or how much they "make sense" to someone new. Therefore, I do not branch.

Your team can do whatever it wants. But ask yourself:

  * Does it ever take more than 10 minutes get code from initial commit to inside a release package and ready for live deployment?
  * Do you, more than once per 6 months, have integration bugs between different people on your team that take more than 5 minutes to find and fix?
  * Do you spend more than 3 team-minutes per quarter on branch management?

If so, there might be a better way.

You just have to enter the undiscovered country that Hamlet fears.
