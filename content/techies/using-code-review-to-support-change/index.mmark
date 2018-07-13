---
id: 185
title: Using code review to support change
date: 2014-05-29T07:15:27+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=185
permalink: /using-code-review-to-support-change/
category: techies
tags:
  - change
  - code review
  - culture
  - habit formation
  - learning
  - mobbing
  - pair programming
---
Someone I know had the following conversation recently during code review:

>   * **[WontFix]** **//depot/[elided].cs: Line 232**
>       * **[reviewer]:** Unit test this directly
>       * **[author]:** the integrations test this. Don't see any direct benefit of UT it directly. (26 minutes ago)

He wanted advice on how to get past this. His goal is to get his team to write direct unit tests, as opposed to multi-unit component and integration tests. But how? And what does he do in code review to help the team accomplish that in specific cases?

<!--more-->

# Code reviews aren't about learning or change

First the dirty little secret of code reviews: no one’s mind is ever changed during a code review (CR). People can be reminded about something they already believe and go change the code to match their belief. But they won’t change their thinking. Several aspects of CR give this result:

  * CR is an after-the-fact check; the dev has moved on (or wants to).
  * CR is a critique. Most people highlight the mistakes (we are trained to), not the successes. This builds conflict and inhibits rewarding risk-taking.

Learning is all about taking a risk and getting feedback before a decision is made. CR fails both parts.

# So why code review?

Simple: code review is excellent at helping people maintain their own agreements.

The hardest period in making a change, especially as a team, is in changing the habit. Getting agreement about the problem or the solution is relatively easy. Actually changing the habit and applying the new way of thinking consistently takes effort.

Code review is a great way to reinforce habits, because:

  * CR is an after-the-fact check. The dev has already corrected any mistakes he noticed. This is defense in depth.
  * CR is detailed. No summarized info, we can see all the specifics for each case.
  * CR is semi-public. It is seen only by trusted people trying to make the same change, but all of them can see it. So you can get social support for admitting and fixing your mistake and others can learn from it.

Habit forming is all about setting up social situations to help backstop individual responsibility. The individual is responsible for changing their own habits, but the social systems give them feedback and support as they are learning to notice specific mistakes and fix them. CR does this well.

# Highlight successes, not failures

Side note: don't highlight mistakes in CR. Hunt for successes and highlight those.

Then share the CRs widely. Much like every mistake will be made by someone on your team, every good behavior will be done by someone. Highlight those moments of success and repeat them.

Now people can follow examples to the good things, rather than trying to figure out the good thing from hundreds of bad examples.

Bad examples are useful after the team has nearly attained mastery. Cleaning up the final errors to achieve perfection has its time and place. But they're only useful once the bad example is the minority case.

A great example of this is when a team is first starting to write dev automated tests.

At this point it doesn't matter whether they write the test first or after, whether the test is a unit, component, or integration test, or really about anything else. We're just trying to establish the habit of devs writing automated tests at all (or, rather, doing so consistently).

So call out the people who write tests. Ignore whether those are "good" tests. If you start seeing "good" tests, then call those out too. Highlight that not only did this person write tests, they also refactored the code to create units, and then wrote unit tests.

Celebrate the tests that everyone wrote. Celebrate the refactoring that this person did. Celebrate the greatness of these tests. Ignore the failures and people will change their habits to align with the celebrated successes.

# How to change the way we code

We want multiple systems. CR helps us maintain our agreements. We want another system that is good at learning and at making agreements about habits to change.

The key is to get agreement and alignment outside of the specific case. We need total alignment---consent or consensus, not just majority.

So I’d bring this review result up to the whole team in a way that scrubs the names. Start a discussion about unit testing and ask why people unit test and why they don’t.

Ask the team whether this kind of judgment call makes sense---should we evaluate whether a UT is required in this case, or should we just blanket require it and assess whether an integration test makes sense? Don’t push a particular result or agenda; let the team decide what it wants.

Then help hold the team to that standard during CR. Get the rest of the team to do the same.

# Why this works

This is intentionally manipulative. It is a way for the team to take advantage of their own psychological biases.

First, people decide things based on the information readily accessible to them (What You See Is All There Is). People's subconscious minds (which make the decisions that we then rationalize) don't take any other information (or absence of information) into account.

During the discussion, specifics of cases are out of context (as long as you don't bring them in). This drives the team towards optimism. They are more likely to agree / align to something that is right in general but may not apply to some specific case.

They are willing to try things that agree with their beliefs and with 95% their experience, even if there would be contradictions with some of their experience.

This helps the team make an agreement that aspires to 1-2 steps beyond what they can do today. The team chooses to try to be a little better than they are---in whatever way they think is better.

Get them to state that agreement as a simple rule, and ask them to name the rule. Make it pithy and short (less than 5 words). This makes it easy to access, so the subconscious will treat it as high-importance: it will always be something the subconscious sees.

Second, we are preying on our own commitment bias. Once a person has committed to a thing, even in just a tiny way, they will make subsequent decisions in a way to support that initial decision.

By ensuring that the team made at least a consent decision, every single person on the team has made a partial commitment to the agreement. Now their subconscious will push them towards follow-on decisions that support that agreement.

Everyone has biased themselves in favor of the direction they wanted to go.

Third, we are now all on the same side. There is no us/them conflict.

When a CR comes up you say “this needs a UT,” they say “Nah, covered by integration,” and you say “Never let a mess grow” (or whatever your rule is). They’ve already agreed to that, so you are reminding them of their agreement.

Suddenly your words are peer support helping them meet their agreement, rather than a critique trying to get them to do something that they don't see as relevant and preventing them from completing this task. They are much more likely to make the change.

# Of course, we can do better

I could hardly leave this topic without discussing pairing.

Pairing works well because it has the good parts of a code review for habit formation, but a fundamentally different character for agreement and learning. The discussion happens before a decision is made. The two people are on the same side, trying to get stuff done well. Feedback is frequent, and most of the feedback is about things done well, not mistakes made. Pairing supports both learning and habit formation.

Of course, it still misses agreement. Getting a simple rule across the full team requires some structure beyond the pair. Retrospectives are the usual solution. Use your retrospectives to generate either one experiment to try or one habit to change (either to be completed before the next retro), and do them often (no less frequent than weekly; I currently like every 2 days). The main focus is on executing those experiments and habit changes, and that's where pairing works.

Another option is mobs. I wonder (speculation alert!) if this is a big part of the secret of why mobbing works. Not only do you get the continuous learning advantages from pairing, but full-team agreement becomes continuous. You no longer wait for retrospectives to discuss things. You no longer discuss in abstract. Instead you make a decision in the moment and move on.

Of course, that would lose the advantage of losing specific context when talking. Which could make it harder to slight of mind yourself into cultural shifts. But who knows: perhaps the reduced cost of making a decision opens up incremental culture shift options that don't require even the small acts of faith involved in setting a new habit that you don't yet live and trying to live up to it.

# Don't use code review to drive change

Back to the original topic, CR is a bad way to drive change. Heck, driving change is a bad idea in and of itself, but that's a topic for another entry.

CR is a great way to help a team establish a habit that they have already decided to establish---assuming that habit is visible in the code. Pairing is better, but CR can serve some benefit if used correctly. And, of course, all of this applies when you are pairing too.

The hard part, of course, is changing your own habits around how to give a code review. How could your team support yourselves in that?
