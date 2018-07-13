---
id: 22
title: "Tests --- What Part First?"
date: 2011-03-17T05:21:55+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=22
permalink: /tests-what-part-first/
category: techies
tags:
  - tdd
  - working tiny
---

At a talk today, the presenter put the following simple unit test on the screen and asked me what part I would write first.<!--more-->

```csharp
[Test]
public void ThrowStrike()
{
  // prepare
  var frame = new Frame();
  // act
  frame.Throw(new PerfectThrow());
  // assert
  Assert.AreEqual(0, frame.PinsStanding);
  Assert.That(frame.IsStrike);
}
```

I immediately answered "the last line." He then went on to the next person, who answered that he'd probably write that whole test as the first pass. However, upon 90 seconds' reflection, I found that my answer wasn't satisfactory.

In particular, if this is the first test that uses frame, my first line would be one that isn't even in this final test. In the interests of showing how to Work Tiny, here's what I'd do.

```csharp
[Test]
public void ThrowStrike()
{
  Assert.That(new Frame(), Is.Not.Null);
}
```

From here on, I write most of the code and most of the test using ReSharper. First, the above test fails (to compile). Thus, I tell R# to create the class (and put it in the right project, namespace, etc). Now the test passes. Time to check in.

Yes, I really do commit at this point. I've added a tremendous amount to the system: two new files, one new (passing) test, and a domain object with a name. Certainly enough for one commit.

Next, I introduce variable, to get:

```csharp
[Test]
public void ThrowStrike()
{
  var frame = new Frame();
  Assert.That(frame, Is.Not.Null);
}
```

Then I type in the "act" method call, and have R# create the method and the PerfectThrow class. Actually, I'd never design the class' API this way, but I'm working towards the above test.

```csharp
[NUnit]
public void ThrowStrike()
{
  var frame = new Frame();
  frame.Throw(new PerfectThrow()); // act
  Assert.That(frame, Is.Not.Null);
}
```

At this point, I've got passing tests and a bunch of new code again. Time for another commit.

Finally, I change the assertions to the ones that I want to make. This gives me the final test. Again, R# generates the methods for me. Again, the test passes with empty Throw() method and IsStrike and PinsStanding that just return constants. So I commit again.

```csharp
[Test]
public void ThrowStrike()
{
  // prepare
  var frame = new Frame();
  // act
  frame.Throw(new PerfectThrow());
  // assert
  Assert.AreEqual(0, frame.PinsStanding);
  Assert.That(frame.IsStrike);
}
```

And then I write the next test. So far, my tests don't make me do any computation in order to pass them. Thus, I don't do any computation. To change that, I add the second test.

This part is pretty similar to the usual bowling kata that everyone talks about &#8212; fake it till you make it and all that. The only real difference is that I actually write each test in multiple commits, generating code as I go. And some of my intermediate states include code (such as the null assert) that don't show up in the final code (or with expressions extracted into methods, etc).

The main advantage of such tiny increments is that it is harder for me to get lost in the weeds. I am never more than 60 seconds of work since the last commit (with green tests), nor one line of code to implement from the next green. I never need to write a lot of code at once. Thus, whenever I have an insight, I can refactor. I don't have to spend any time getting the code green again. Reverting to last green is a real (and common) option.

Heck, I might write the next bit of the test out a couple of times, reverting each to last green, until I find the one that I like. I like Tiny.
