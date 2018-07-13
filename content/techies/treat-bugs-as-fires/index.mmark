---
id: 168
title: Treat bugs as fires
date: 2014-03-10T08:19:48+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=168
permalink: /treat-bugs-as-fires/
category: techies
tags:
  - Agile
  - anzaneering
  - bugs
  - refactoring
  - risk
---
A couple centuries ago, fires were seen as a natural side effect of cities. If you put that many businesses and houses together, sometimes it would just all burn down. Cities were useful, so you accepted that every once in a while a whole lot of people would die in a fire.

Much of the software world is in the same state today. Bugs are seen as a natural side effect of code. If you build systems that solve that many interesting problems for people, sometimes it will just all screw up. Software is useful, so you accept that every once in a while a whole lot of people's work will die in a bug.

The people building and debugging software today have similar methods of working to the people building and de-firing cities then. But today, fire fighting and city planning are different. They prevent fires. Fires still happen, but no cities burn down and few people die. Let's do the same with bugs.

<!--more-->

# The big insight

The big insight was that fires are optional.

The number of fires in a city and how far each spreads is determined by how the city is built. The system had one set of people putting out fires (fire fighters) and another set making them (city planners). Sure, the planners never meant to make a fire, and never actually lit one, but they set up the system so that one tired cow could (and did) use an oil lamp to burn down most of Chicago.

# What changed

Building codes. Fire fighters created a new tool to prevent fires. Then they made fire system makers use this tool.

Modern fire fighters react to fires by doing 3 things:

  * Mitigate: get the people out of the burning structure and ensure it will not cause other structures to burn.
  * Repair: put out the fire with as little structural damage as possible.
  * Root cause: find the cause of the fire and add it to the data about why fires start.
  * Make safe systems: identify common causes, understand the system, and change the system such that they will no longer happen.

Mitigation starts as soon as the first responders get to the scene. Their job is to protect humans and minimize total damage. They recognize that some pain will happen---it is too late to create safety---but they can minimize it. The team makes heroic efforts because human life is at stake. They risk lives in order to save them.

Repair starts as soon as all the equipment and full fire crews arrive, and after basic mitigation is complete. The job is to protect the fire fighters first, and property second. People make great efforts, but not heroic efforts. It is not worth risking a fire fighter's life in order to save property. Some risk is certainly still present, but the fire fighters take time and take precautions.

Root cause begins after the fire is out and all damage has happened. The job is to find out what made the system unsafe. The fire investigator takes as long as necessary to find all the contributing factors to the blaze. This is added to the data. It is easy to think of this step as creating safety, but it is not. This step is just understanding what was unsafe.

Finally, lots of  people look through the fire investigation data. The job is to create safety: not one fire at a time, but to create systems that reinforce safety all the time. They look for common causes. They figure out system changes that will alter the circumstances that lead to fires. Every year they update the national building codes. They cause everyone involved in the building of cities to be trained in how to do work without setting up situations that lead to fires or that make it easier for fires to spread. This reduces risk throughout the system. Work is iterative and based on data. Every year the new structures are a little safer than the old. Over time, the whole city becomes safe.

# Bugs are fires

Let's translate the traditional / mainstream software development approach to the realm of fires. It'll be pretty embarrassing for the software devs, but this is really what we do.

Many people will argue that fire fighting is more critical than software dev. After all, fire fighters are risking lives to save lives. Sure, but software hurts millions of people every day. We hurt our users when we lose their data or identity, hurt our stakeholders when we miss deadlines and mess up their plans, hurt our team members when our live site bugs force people to work in the middle of the night, and cause psychological damage to everyone in the company when we manage via power and authority rather than collaboration and empowerment. We should start thinking about our job in terms of creating safety.

In fact, the emerging <a href="http://www.industriallogic.com/blog/anzeneering/" target="_blank">Anzaneering</a> trend is doing exactly that.

# How software teams fight fires

Here is the typical sequence of actions for a production bug. Teams vary on this, but not generally in ways that make significant improvements (well, XP teams often do better, but we'll leave that for later).

  1. Alarm bells ring. A fire (bug) has been detected in our city! Of course it is the middle of the night or we were busy on something else, because that is when fires happen.
  2. Wake up someone at random. This person likely lacks the skills to deal with this fire, since we have people who specialize in only one kind of fire, but we don't know what kind of fire we have here.
  3. Decide whether this fire is big enough to deal with. Most often, this is an alarm we have seen many times before. And each time the fire only affects 1 person, so we will just let that person burn to death. Go back to sleep.
  4. If we choose to continue, pick one: mitigate the fire or put it out. Don't do both.
      * If mitigating, chop up the structure as necessary to prevent further loss of life. But don't fix things. Just stop the bleeding.
      * If putting it out, chop up the structure and spray stuff at it until the fire stops spreading. Accept whatever damage it did in the meantime; don't even bother looking to see what the damage really was.
      * Decide to put it out but that you can't put out this kind of fire. Ring alarm bells to wake up everyone. Each person tries to spray stuff at the part of the structure they know and see if the fire goes out. When one person starts making progress, everyone else stands around and watches, because no one wants to be the fire fighter who went home while someone else was still working.
  5. Record that the fire happened. Do this in the middle of the night right after fighting the fire. So while exhausted. Just get the basic info in to comply with our reporting requirement, then go back to sleep.
  6. Let time pass.
  7. Triage the set of all reported fires. Some have been put out. Some have been partially put out. Some are mitigated but still burning brightly. Order them by the number of people who have already burned to death. Pick a couple to put out; let the others burn up more people.
  8. During work hours, put out the few fires that passed triage. Feel guilty and frustrated while doing so, because your real job is to build more city. Putting out fires is preventing you from building your development.
  9. People will be moving into your new development soon. So build it fast. Cut corners. Put up row housing made of flammable materials. String the wires through the middle of rooms. Just get it done!
 10. Repeat.

Does this seem familiar? Does it seem responsible?

# What we should do

There are software devs who follow a different approach. They focus on fire prevention, not fire cure. Sure, they have to put out fires. But they use each fire as an opportunity to learn how to prevent fires, and then they build new parts of the city in a way that prevents the fires they have seen.

Over time, these teams live in cities that don't burn down. They go weeks and months between alarms going off. They rarely even have building code violations (risks found by QA or build verification tools).

They big idea is to change how we think of bugs. Bugs are optional. We choose how many we will have. There are practices (pair programming and mechanized refactoring) that dramatically reduce the probability of future bugs. We just have to choose to use them.

Personally, I choose to live in a city with low risk of burning to death, even though it means I have to change the way I work.
