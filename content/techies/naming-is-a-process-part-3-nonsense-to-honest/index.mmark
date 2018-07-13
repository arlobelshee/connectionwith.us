---
id: 215
title: "Naming is a process, part 3: Nonsense to Honest"
date: 2015-08-25T07:14:14+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=215
permalink: /naming-is-a-process-part-3-nonsense-to-honest/
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

Later parts have gotten us to a Nonsense name.

Now let's look deeply at the second transition in names, from Nonsense to Honest.

<!--more-->

We have a thing with a name. But its name is useless. In my FAA system example, the method was named preLoad(). This tells me when the system calls the method (not very useful), but doesn't tell me what the method does or why one would want to call it.

I want to make the name honest. It doesn't need to be completely honest. It just needs to tell me one honest thing. I look at the method to figure out one thing that appears to be key to its execution. I just read through the body and see what appears central.

> **Where to look:** inside the body. Look for patterns that repeat here or between this and other methods.

I find it useful to look for variables that are system components ("database," "screen," "network," "service"), look where the return value comes from, and see if something is used many times.

In the example, I noticed that there was a global named db that was used a lot. Several places created recordset objects, set values, and read or wrote them using the db. Since it mixed reads and writes, I named the method doSomethingEvilToTheDatabase().

> **Our insight:** one thing the code does. And perhaps a judgment of how easy it will be to work with, how safe it is, or other useful traits.

That name isn't complete, but it is honest.

It is honest in several ways. It actually records multiple insights I'd had:

  1. The main effect of the method seems to involve the database.
  2. I don't yet understand what it is doing to the database.
  3. I am getting all judgy about how it is treating the poor database. I don't like it.

The second and third insights are as important as the first. Even if I wandered away at this point, a future reader of the code would have some insight. They wouldn't know what the method did, but they'd be properly wary of it.

They'd know that no one knows exactly what it does, it does that thing to the central database, and the last person to touch it thought it was doing some nasty stuff. Good! I've transmitted all the knowledge that I have about this method. I've put them in the proper frame of mind for working with it.

> **What we write down:** a better name, which says one honest thing and is clear about what we don't know yet.

To write down the insight we use one more refactoring:

  * Rename

### Be specific!

The most common way to screw up at this point is to be too general in your name. Specific is good!

The intent of naming in this way is to allow a reader to understand a chunk of code without looking at it, just by looking at the name for that chunk of code. That reader needs specific detailed knowledge. So the name has to be specific.

For example, I could have named my function handleFlightInfoSomehow(). That would have been honest. But it doesn't give a clear insight about what the code is doing.

Looking ahead just a bit, the next step will be to make the name convey everything the code is doing (be Honest and Complete). If we are specific, then the only route to completeness is to add to the name. I keep the same precision, but add more description.

If I am overly general / imprecise now, then it most or all of the things the function does will be already roughly describable by the name. This will make it a lot harder for me to see the things that aren't yet conveyed in the name, which will make it harder to create a name that allows me to not read the code behind it.

### Not just for functions

This step also applies when naming classes or variables. Common nonsense names for classes are anything that ends in -Manager or -Operations. Nonsense variables are usually named the same thing as their type.

In either case, we need to have one insight about this thing. What is one important responsibility of the class? For a variable, what differentiates this one Foo instance from all the other Foo instances that might be out there? How does the code using the variable think of this one? Whatever that insight is, write it down.

### The Naming is a Process blog series

  1. [Good naming is a process, not a single step](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/)
  2. [Missing to Nonsense](http://arlobelshee.com/naming-is-a-process-part-2-missing-to-nonsense/)
  3. Nonsense to Honest (this entry)
  4. [Honest to Honest and Complete](http://arlobelshee.com/naming-is-a-process-part-4-honest-to-honest-and-complete/)
  5. [Honest and Complete to Does the Right Thing](http://arlobelshee.com/naming-is-a-process-part-5-honest-and-complete-to-does-the-right-thing/)
  6. [Does the Right Thing to Intent](http://arlobelshee.com/naming-is-a-process-part-6-does-the-right-thing-to-intent/)
  7. [Intent to Domain Abstraction](http://arlobelshee.com/naming-is-a-process-part-7-intent-to-domain-abstraction/)
  8. Summary and Learning Path (will publish Tuesday, 9/1/2015)
