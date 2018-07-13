---
id: 219
title: "Naming is a Process, part 5: Honest and Complete to Does the Right Thing"
date: 2015-08-27T07:15:02+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=219
permalink: /naming-is-a-process-part-5-honest-and-complete-to-does-the-right-thing/
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

Later parts have gotten us to an Honest and Complete name.

Now let's look deeply at the fourth transition in names, from Honest and Complete to Does the Right Thing.

<!--more-->

In making the name complete, we have now made it possible to reason over the responsibilities of the class/method/variable without having to read its full implementation. This sets us up to change its responsibilities.

At this step I look only at the name of the thing I'm working with. I Ignore both its usage sites and its body. Does this name make sense?

There are typically 2 kinds of clauses we want to eliminate. Each is found by one key question:

  * Is this clause unrelated to other clauses in the name?
  * Is this clause a concern we want to encapsulate?

> **Where to look:** at the name.

Again we just have an insight, write it down, and look for another.

> **Our insight:** one clause we don't want to have this thing expose.

Writing it down requires structural refactoring. We need to keep the name Honest and Complete. If we don't like the name then we have to change what the thing does so that we can use a different name.

> **What we write down:** extract or encapsulate one behavior of the thing.

This usually involves one more refactoring:

  * Inline

### Safely moving a responsibility from a method

When I want to split a responsibility out of a method, I often do the following sequence:

  1. Extract method all the stuff before the part I want to break out.
  2. Extract method the part I want to break out.
  3. Extract method all the stuff after the part I want to break out.
  4. Split the name of the outer method up into names for the 3 parts based on what does what chunks.
  5. Add any missing clauses required to make the names complete. For example, the above split may divide a calculation from the part that writes it somewhere. The outer method may just be named ---AndRecordYield---(). So I now have one inner part named ---AndCalculateYield---() and another named ---AndRecordYieldToService(). The methods are smaller so it becomes more obvious how to be specific in their names.
  6. Inline Method the outer method. Now all call sites use the 3 methods directly and you have split out the functionality.

### Encapsulation

Another common case is to want to encapsulate something. This usually entails not just removing a clause from the name, but actually encapsulating the behavior so callers can't see the effect. The problem is typically that the behavior is performed on some parameter.

An example is the handling of the local cache in parseXmlAndStoreFlightToDatabaseAndLocalCacheAndBeginBackgroundProcessing(). I'd like to encapsulate that cache and use it as a read-through cache just for performance.

The solution is to find some sequence of refactorings to shift that parameter to be a field. Sometimes this involves creating a new class, splitting a class, or moving the method we are working with to a different class. It also usually involves changing object lifetime and removing references to the value from all callers of the method, often several layers up the stack.

The easiest way to do this is typically to refactor until the method uses everything via a field instead of a parameter, then use the auto-fix to remove unused parameter, then go up the call-stacks and continue removing unused parameter as far as you can.

Here is one common sequence, used when we start with a static method.

  1. Use Introduce Parameter Object. Select just the one parameter you want to encapsulate. Name the class Foo and the parameter self.
  2. Use Convert To Instance Method on the static. Select the parameter you just introduced.
  3. Improve the class name (Foo) to at least the Honest level.
  4. Go to the caller of the method. Select the creation of the new type. Introduce parameter to push it up to the caller's caller.
  5. Convert any other uses of the parameter you are encapsulating to use the field off the new class.
  6. When the last usage is gone, use the Autofix for remove unused parameter to remove the now-encapsulated field.
  7. Select any usage of the public field in the calling method and Extract Method the related statements / expression.
  8. Convert to Static on the extracted method, then Convert to Instance Method to move it to the new type.
  9. Repeat 7 & 8 until the calling method no longer uses the field we are encapsulating.
 10. Walk up the stack to the caller of this method. Repeat from step 4. Stop when you get to the initial fetch / creation of the value you are encapsulating.
 11. Move that fetch / creation to be a factory method on the new type (via Extract, Make Static, Convert to Instance).
 12. Repeat from step 4 for any other callers of your original method.
 13. At this point the only references to the value you are encapsulating will be within your new class. The only users of the constructor that takes that value will be factory methods / other constructors.
 14. Convert the constructor to private.
 15. Inline the public property to access the value you are encapsulating. Now all the class methods will just use the field.

The recipe is long, but each step takes 1-2 seconds with proper tooling. No step requires editing code. You can encapsulate even a highly-used value in 2-10 minutes with practice.

You can also encapsulate multiple related values at once. And a variation can be used when you want to split a class or handle similar cases.

### Classes and variables

Refactoring a class to Do the Right Thing usually means executing the Split Class refactoring one or more times. Each split pulls out one responsibility.

Refactoring a variable usually means just introducing a new local variable and changing which one is used when in the method.

### The Naming is a Process blog series

  1. [Good naming is a process, not a single step](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/)
  2. [Missing to Nonsense](http://arlobelshee.com/naming-is-a-process-part-2-missing-to-nonsense/)
  3. [Nonsense to Honest](http://arlobelshee.com/naming-is-a-process-part-3-nonsense-to-honest/)
  4. [Honest to Honest and Complete](http://arlobelshee.com/naming-is-a-process-part-4-honest-to-honest-and-complete/)
  5. Honest and Complete to Does the Right Thing (this entry)
  6. [Does the Right Thing to Intent](http://arlobelshee.com/naming-is-a-process-part-6-does-the-right-thing-to-intent/)
  7. [Intent to Domain Abstraction](http://arlobelshee.com/naming-is-a-process-part-7-intent-to-domain-abstraction/)
  8. Summary and Learning Path (will publish Tuesday, 9/1/2015)
