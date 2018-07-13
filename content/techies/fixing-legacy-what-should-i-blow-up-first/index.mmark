---
id: 130
title: "Fixing Legacy: What Should I Blow Up First?"
date: 2012-10-16T14:42:23+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=130
permalink: /fixing-legacy-what-should-i-blow-up-first/
category: techies
tags:
  - legacy code
  - refactoring
  - technical debt
---
Another good question came over the wires at work. My reply grew too long and I figured more people would want to see it. Besides, this way I can blog and call it a legitimate business activity.

Problem statement: what patterns and strategies work for choosing when and what to refactor? Does this change at scale?

<!--more-->

## Who Should I Listen To

The people I listen to most for this sort of thing are <a href="http://www.jamesshore.com/Blog/The-Other-Side-of-Design.html" target="_blank">James</a> <a href="http://www.jamesshore.com/Agile-Book/incremental_design.html" target="_blank">Shore</a> (who needs more <a href="http://www.jamesshore.com/Blog/Merciless-Refactoring.html" target="_blank">names</a> or fewer good <a href="http://www.jamesshore.com/Agile-Book/refactoring.html" target="_blank">articles</a> to link to), <a href="http://www.amazon.com/Refactoring-Patterns-Joshua-Kerievsky/dp/0321213351" target="_blank">Joshua</a> <a href="http://www.industriallogic.com/blog/" target="_blank">Kerievsky</a>, <a href="http://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052" target="_blank">Michael</a> <a href="http://michaelfeathers.typepad.com/" target="_blank">Feathers</a>, <a href="http://programmingtour.blogspot.com/" target="_blank">Corey</a> <a href="http://coderetreat.org/" target="_blank">Haines</a>, and <a href="http://blog.thecodewhisperer.com/" target="_blank">J.B.</a> <a href="http://programmingtour.blogspot.com/2009/08/testing-techniques-with-jb-rainsberger.html" target="_blank">Rainsberger</a>. They share 2 key traits:

  * They think deeply about reflective engineering and the systems and humans that do it.
  * They are active coders who work with real products (in all their legacy glory) every day.

I like to think that describes me too. So here's my whack at it.

## What Matters?

I see a couple of aspects to this (listed in descending order of importance):

  * **Value**: In refactoring legacy code (and, honestly, almost no one is working with anything but legacy code), the goal is to do the most valuable changes first. We might not ever refactor everything. So we need to get the high-value stuff first. But how do we find that?
  * **Risk**: Refactoring, like any code change, has the chance to introduce bugs. Not all bugs are equal. Some areas of the code are more difficult to observe, so bugs take longer to discover. Some are more critical scenarios, so bugs have more impact. We need a good way to take risk into account when choosing what to refactor.
  * **Cost**: Some code is just more expensive to change. It has more dependencies, more duplication (or near-duplication), more special cases, has seen less refactoring, is less documented, uses more arcane technologies, or is just written in a language with less tool support. All else being equal (it usually isn’t), we can get better ROI if we work on the easy stuff. In any case, refactoring is a skill. It takes time to learn. So it makes sense to start with some easy problems and to mix in harder problems as skill improves.
  * **Authority**: Depending on the team, there may be some code you aren’t allowed to change. It’s always nice when those boundaries don’t exist (you don’t end up with refactorings that extend just to the point of some boundary), but some of them are necessary for other reasons. This is lowest in importance because often the best answer is to figure out how to expand the team's authority without losing the "other reasons."

Now for some approaches that I’ve seen work and heard about working for others.

## Leave each campsite a little cleaner

Features tend to cluster in most products. And new features tend to cluster with themselves and away from old features. The fact that you are working with a piece of code right now indicates a higher than average probability that you will work with it again soon. Therefore, focus your refactoring efforts on code that you touch while introducing features.

Some strategies of this kind include:

  * Add a refactoring budget to each story. For example, “for every hour that you spend working on a feature, you are required to then spend an hour refactoring some part of the code that you touched while working on that feature.”
  * Pair programming. Often the devs see the messes as they are working. When they are solo, they work around the problem, intending to come back later. And when they finish, they just want to get this code checked in and move the task. Pair partners really help people hold themselves accountable. They may decide to or not to do a particular refactoring, but the decision will be explicit.

## We're on a mission from god

It can be very helpful to have the whole team share a current mission. This helps motivation, allows clear reporting of progress, and allows you to take on one systemic issue at a time. It often makes sense to start with a simple, mechanical mission, and then work to more invasive ones as skill and confidence improves.

Some strategies of this kind include:

  * Focus on a recurring pattern. The most common and pernicious bug farm is a repeated pattern that appears throughout the code base. This might be a model that everything manipulates, a library that is called (directly) from everywhere, or user messages that get defined where they are discovered rather than in a centralized UI location. Pick one pattern that results in devs writing bugs. It will require changes throughout the code. Change a couple of call sites to discover what you should be doing instead (spike to find the right fix). Then communicate that plan and pull everyone in to applying the fix throughout the code.
  * Lakes and beaches. This is one of Feathers' strategies from <a href="http://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052" target="_blank">Working Effectively with Legacy Code</a>. Basically, you artificially divide the code into chunks (lakes). You lock down the interactions between those chunks --- however messy they may be. These are the beaches. Then you progress through the code one lake at a time. At any given time, each lake is either polluted, being cleaned up, or pure. Features require work in all 3 kinds of lakes; you work differently depending on which lake you're changing right now. In a pure lake, you do the best TDD & clean code that you can do. In a cleanup lake you do that and you also refactor mercilessly. In a polluted lake you follow legacy amelioration strategies (minimum invasive change, etc). At any time, there are only a couple of lakes being cleaned up. At no time do you allow backsliding (no peeing in a clean lake). You only change the beaches once the lakes on both sides of the beach are clean. This strategy is excellent for reporting. You can always state the status of each lake and show progress.

## The code whisperer

All developers share one common trait: they know when code is painful to work with. The difference between good developers and bad ones is how they respond to that pain stimulus.

Bad developers avoid the pain or treat the symptom. Good developers know that pain means something is broken, and they look deep to find the cause of the pain. Then they fix that.

These good developers are code whisperers. The code talks to them. They listen, and they know where your biggest problems lie. Empower them. And help every developer become a code whisperer. They have the capacity; they just need to grow it.

Some strategies of this kind include:

  * Refactor Friday. Set aside a half-day every week for developers to scratch their itch. The only rule is that it has to be a refactoring of the mainline code, and it has to follow our rigorous standards. Other than that, they can address whatever problems they see. Optimally, help developers find other developers with the same itches. Help them form into temporary teams and alliances to go after big problems.
  * Friday play time. Set aside a half day each week for developers to focus on their own skill improvement. The only rule is that they can't work on any production code (for the product or any tools). Everything should be throw-away and full of whimsy. People learn best if they are playing, so focus on maintaining that sense of fun. If you want, set aside some brown bag time for people to report out on what they learned. That way the rest of the team knows who to ask when something shows up in normal work.

## A Principled Existence

There are tried-and-true principles of good design. The actual design used to solve a particular problem depends on the context. But several principles are universal. You can apply these principles to your code base to identify the areas likely to cause problems in the future.

There are also a couple of principles of how you do work. These can similarly be applied as a way to build a strategy.

Some strategies of this kind include:

  * Follow the 4 principles of simple design. Actually, as <a title="Corey Haines interviews J.B Rainsberger about testing strategies" href="http://programmingtour.blogspot.com/2009/08/testing-techniques-with-jb-rainsberger.html" target="_blank">J.B. Rainsberger says</a>, only the middle two really matter (the other two are results). These rules are: Don't Repeat Yourself, and Use Good Names. Most legacy code violates both of these. Make it DRY first, then fix the names, then iterate.
  * Don't be damp. Normal code should be DRY (Don't Repeat Yourself). Test code should be WET (Write Explicit Tests). No code should be damp. Often test code will be partially factored to avoid duplication, but this will make it harder to read. First make the test WET. Move the duplication out into product code (so each test is short), and keep the variation (such as explicit parameters and assertions) in the tests. Then make the product code DRY. Often this will result in adding capabilities to the product code "just for testing." Also, often those capabilities will evolve over the next couple months into critical aspects of the domain model that you hadn't previously noticed were missing.
  * Work tiny. Then work tinier. No matter what you are doing, look at how large it is today (lines of code in methods or files, time it takes to make a change, time it takes to check something in, size of a change that you try to roll across the organization, etc). Find a way to make it smaller, then do those smaller chunks incrementally. For many, many things there is no real minimum size. Refactoring the contents of an if conditional expression into its own named method is often an improvement, even though it results in a function that is less than a single statement in size. There are teams that do retrospectives every single day, and always make one process improvement that is small enough that it is completed by the beginning of tomorrow's meeting. They make a ton of progress in any given week.

## Just do it

Especially for small teams, the main obstacle is usually getting started. Changing legacy code is risky. It has caused major public embarrassments in the past. The team has become more and more conservative over time, but this is causing problems too. If you're in this situation, then just get started. Accept imperfection, learn as you go, and get better over time. Don't wait to get all the safety nets in place. Just make sure that everyone is ready for the bumps ahead and will use them to learn rather than to blame.

Note that these strategies are all dangerous in some way. They take on higher risk to reduce up-front costs. This can make sense or can be a really dumb idea.

Some strategies of this kind include:

  * (Correctness) Test in Production. If your quality is already very high or if you have a subset of your customers that want to be forgiving, then you can just make changes and see what happens. Monitor things carefully, and roll back the instant you see a problem. This strategy has all sorts of problems and can kill products (if your customers aren't as forgiving as you thought). But it can also work. Note: this is different from (Scenario) Test in Production. In that case you have two or more known-correct implementations and you want to see which will work better for your customers.
  * Write spikes. If you don't know how to make a change well, just make it in a spike. Create a reference implementation that people can use when developing real solutions to problems of this kind. Since it's a spike, you can check it in and share it but it doesn't need to be correct. The idea is the thing.
  * Code Retreat, Coding Dojos, Katas, and similar experiences. Don't try to refactor your existing legacy. Do some experience to learn in an easier domain. Once you've learned the skills, come back to apply it to your code.
  * Test the snot out of it, but get to root causes. This is similar to the way that people are commonly working today. Keep the QA group that you throw code to. Have them keep finding problems. But every time they find a problem, start a conversation in the dev team (with some people from QA) about how you could have prevented that problem. Preventions should include refactorings that you could make, safer ways to go about executing refactorings, and learning things to fill in holes in the team's thinking.

## Ask tech support

There is one group at a company that knows about every bug in the product and how much of a problem each one is. It's not dev. It's not QA. It's tier 1 technical support. Most companies don't take sufficient advantage of this information.

Some strategies of this kind include:

  * Add tech support to the planning council. Make sure they've got a voice in all the prioritization discussions. In fact, they usually have the highest business value stories, so their stuff often ends up at or near the top of the queue. In particular, tech support is very good at finding <a title="Paying Down Code Debt" href="http://arlobelshee.com/post/paying-down-code-debt" target="_blank">short-term gains</a>.
  * Have devs perform top-tier tech support. When a problem gets to them, they fix it. Not just for the user, but in the code. Between calls they look for similar problems in the rest of the code. They raise these categories to the attention of the whole team, then whittle away at them.

## Follow the money

In most products, there are some parts that handle money or drive the user actions that cause them to pay you. These are usually the highest risk impact locations. They would cause the most problems if they broke.

Therefore, traditional approaches to dealing with legacy code have avoided making any improvements on them. But new features have resulted in minimal change on top of minimal change. So they, ironically, end up as some of the nastiest bug farms in the product.

Some strategies of this kind include:

  * Work on the money parts. These are high risk, high reward. They are mission critical and probably some of the worst code in the product. So they make good targets.
  * Avoid the money parts for now. Make the majority of the product flexible and good. Each change makes it safer and easier to make the next change. So save the nastiest, riskiest code for the end. It will be less risky then.

### Mitigate Risk

Most of the above strategies focused on value or on a combination of risk and value. Another option is to ignore value and focus on risk alone.

Some strategies of this kind include:

  * High impact XOR high probability. Making a change can have a high or low probability of introducing problems. And those problems can have a high or low impact on the company. Consider focusing on changes that have either a high probability or a high potential impact, but not both. Changes with both are simply too risky to take on. Wait until other changes reduce the probability of error. Changes with neither high probability nor high potential impact are probably not worth doing. Leave them messy until you've fixed everything else. Many of them will quietly fix themselves. The rest won't really cause problems for the team.
  * Accredited experts only. If the organization is still learning to refactor, then some people will be able to make changes much more safely than others. It can make sense to have a "special club" of refactoring experts. Only people in this club are allowed to refactor the high risk areas. Everyone is allowed to refactor the lower-risk areas. The goal is to get everyone in the organization into the club. People get in by proving their refactoring skill to someone who the club trusts to certify new people's' skill. It often makes sense to bring in a team at a time as that team proves that all of its members can work together at the required level of proficiency. The number of accrediting people should be proportional to the size of the organization in question.

So there's my (partial) list of strategies for choosing what to refactor and when. Not all of these apply to any given situation. But each of them is a great solution for some situation.
