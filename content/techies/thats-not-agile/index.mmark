---
id: 160
title: "That's Not Agile"
date: 2013-10-07T08:48:53+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=160
permalink: /thats-not-agile/
category: techies
tags:
  - Agile
  - context
  - customization
---
One set of people seems very concerned with defining exactly what Agile is. They want a particular set of practices done in a particular way at a particular level of discipline. From them we hear the constant refrain "that's not Agile|Scrum|Whatever" or "Kanban|Whatever is/is not Agile."

Another set of people feel that Agile is a spectrum. A given team may be more or less Agile. They focus on the values and way of thinking. If you think Agile, then you are Agile regardless of your degree of practice. From them we hear the constant refrain "you can't do Agile, you can only be Agile."

They're both wrong.

<!--more-->

## Defining "Agile"

In my mind, Agile has one of 5 clear definitions (these are equivalent):

  1. Work Tiny. Work Provably. Get Done. Work Together. Learn Constantly. Risk First.
  2. A true process of iteration. Analyze the situation. Pick 1 step. Take it. Regain stability so that you can measure results. Analyze the situation again (do not assume previous analysis to be valid).
  3. A high-discipline process of eliminating transaction risks and transaction costs which changes the fundamental economics and enables new ways of working.
  4. An experimentally-derived, high-discipline iterated learning approach to working.
  5. Create optionality. Agile approaches create options and increase the number of times you get to choose which options to execute, thereby increasing the amount of information / data you can use when deciding.

Each of these applies to a set of scopes. Any given implementation provides options in some domain, improves learning and growth in some area, drives transaction costs down in some space, and depends on a low transaction risk in some set. Furthermore, there are some fundamental constraints that come from the work being done.

We can use these scopes to understand different Agile methods: each applies the same approach to a different set of scopes. We can also use them to judge implementations. But we'll get to that later. First let's understand the common Agile methods.

## Scopes addressed by each Agile method

  * Scrum: planning & tracking, collaborating (partial), improving the system.
  * Kanban: planning & tracking.
  * Lean Startup: product innovation.
  * XP: execution, planning & tracking, collaborating, individual learning, team learning, improving the system, team development.
  * Lean software development: improving the system.
  * Crystal Clear: improving the system.

This is why I consider XP to be a complete breakfast, while the other Agile methods are good dishes that could be assembled into a meal. This is also why XP is harder to teach and harder to do: it covers a lot more scope.

## Risk changes by domain

The scopes that matter vary by domain. The best way to find them is by focusing on the risk definition. For your industry, what are the main sources of risk? Where would you gain the most advantage from eliminating risk?

For example, execution risk predominates in software construction. The commonly-used techniques, when applied to even small problems, kill companies (not every time, but often). The same is not true in other professions. Bad accounting can kill a financial  services firm. But the standard practice reduces the risk to the point that very few companies die from it. Thus it is critical that any team writing software use a process that drives risk out of technical execution, while an accounting firm need only apply best practices.

To put it in terms from <a title="A framework for discussing complexity" href="http://en.wikipedia.org/wiki/Cynefin" target="_blank">Cynefin</a>, software construction is complex. Small differences in execution have dramatic differences in future bug counts and cost, and those differences are understandable when looking back, but not predictable when the choice is made. Accounting execution, on the other hand, is complicated. There are well-known ways to perform the activity that reduce the future cost of change without incurring excessive immediate-term costs.

## Aside: notice something odd here?

Consider:

  * These were all created by the software industry.
  * In that industry, execution is the root of success. It is the fundamental risk, and most risk in other scopes can be traced back to a failure to address technical risk. Improving other parts of the project do not have as much impact on cost and risk as improving execution.
  * There are 3 practices focused on planning, 5 on changing the process, and only one that pays attention to execution.

This is out of balance. We don't need competition and choice between planning approaches. Planning isn't that big a deal in software. We need more innovation on execution.

> In software, complexity in planning comes from planning how poor our execution will be and how we will work around it.

## Sitting in judgment

Now for the second part: judging whether an implementation is "Agile." First, why would we do such a thing?

  * To feel superior.
  * Because we are new to Agile, are doing something different than what you are doing, and want to establish which of us should be learning from / change to match / following the other.
  * We are both new to Agile and are interchanging new ideas. We want to establish why we do particular things and decide which of the other person's ideas will be most useful to us.
  * Because we are experienced with Agile and a team has asked us for advice. We want to establish what they are doing and where they can improve, and provide both a theoretical and operational background for the changes we suggest.

Obviously the first is useless. And the second is as well. It is judgment that comes from fear: I judge you because I fear that I am doing it wrong. I am trying to establish a strict leader / follower relationship. It would be better to establish an idea interchange relationship.

The third and fourth have a lot of value. It is easiest to transfer ideas when they are both grounded in a framework and grounded in concrete experience. A gap analysis (\*shudder\*) is a good and simple framework, as are the Agile values & principles. Add concrete experience (or storytelling, which serves a similar role) and ideas can move.

In that case, we judge whether someone is Agile in order to provide a framework for understanding which ideas will be useful and how. What each thing will improve.

## Remember scopes

Nuance helps when establishing a framework. Complexity is a problem, but we need nuance. Recall back up at the top those people who talked about Agile as a spectrum? They are trying to evaluate for the purpose of helping teams understand how to improve. The problem is that one spectrum isn't enough.

An example would be useful here.

Say that you are a team that does Scrum-based planning, mostly. You use absolute estimates rather than relative, so you have higher variance than full-Scrum implementations. But you are doing much better than before Scrum so you are satisfied. You are also doing retrospectives once per month, which provide complaints to management or PMO teams. Those teams then make process changes with which you comply. You don't do TDD or refactoring, so are building up technical debt. You are unaware that this is even a problem. You are somewhat Agile.

Now suppose there is another team at a different company. They perform full waterfall planning. This is working very well for them. They consistently make promises and deliver on them: on scope and on time. When they will fail to deliver, they adjust scope early & notify their partners. They perform retrospectives twice per week. Each one results in one change and a decision about how to measure that change. They enact those changes before the next retrospective, measure the results, and keep or roll back the practice accordingly. This has also helped them to start seeing their technical debt. They have learned to have devs write automated tests and run them regularly. They write those tests before the code, but those tests are not unit tests: they often check more than one method and more than one result. They find that code is difficult to test in isolation, so they test it "normally" (via automated small integration tests run by a unit test framework). Design changes to make something separable would be expensive. The team does regular code reviews and those find issues. But because those are performed as a check-in guard rather than as the code is being written, it is always more expensive to incorporate the feedback than to ignore it. So many suggestions don't get implemented and learning happens at a slower pace than possible. They are somewhat Agile.

Who is more Agile? How does each team compare to industry norms or rockstars? You can't measure this on a single spectrum.

Now we come to scopes. The first team is Agile in planning and not Agile in team improvement. Although their implementation for planning could be improved, they are living the values and will likely get there. Their implementation of team improvement, however, is missing some fundamental mind-shifts. Responsibility is in the wrong place as a result (PMO empowerment rather than team empowerment). They will not be able to get better incrementally; they have to make a transition to an Agile approach. The team is neither Agile nor very competent in software execution. That would be fine if they were accountants, but not in software. They need some awareness exposure. They will never ask for it, but someone needs to notice this gap and show them that Agility is possible in this scope.

The second team is Agile in team improvement. They're also implementing it pretty well; there likely isn't much room for improvement. They are not Agile in planning. But they are implementing it very well; they likely do not need to change to Agile planning. It wouldn't provide them business advantage. They are Agile at software execution, but not very good at it yet. They will likely get better, as long as someone introduces them to refactoring soon. They are not Agile at learning and discipline. They depend on code reviews as their only technique; this is neither iterative nor disciplined / measurable. Additionally it is not working that well for them, though they may not see that. An Agile transition of learning and discipline could help them a lot, but they will likely require both awareness and some convincing (lots of examples).

Now we have a lot more information about these teams. Which stories should each tell to help the other? Which places do both teams need help? How can they ask for that advice / set of stories? As a coach or speaker, what are the topics for which each team simply needs awareness that there is a better way? What stories can I tell to give that awareness, even though I may only interact with them for 10 minutes?

Agile is not one thing. But it is one idea. There is a clear definition---hard to describe, but singular. The key idea is to understand that that idea can be applied in many different scopes. Each method applies it to some scopes; each team needs to apply it to some scopes. We should start understanding these scopes if we really want to understand Agility and how one team can help another get better.

Which is, after all, the point of all this jibber-jabber.
