---
id: 239
title: "WET: When DRY Doesn't Apply"
date: 2016-04-07T16:39:32+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=239
permalink: /wet-when-dry-doesnt-apply/
category: techies
---

Programmers are familiar with the DRY principle: Don't Repeat Yourself. That's great advice for production code. But tests are different. For tests, use WET: Write Explicit Tests. The two lead to different results. Let's look at an example.

<!--more-->

In a talk today, James Grenning presented an example something like this (his was in C, but I'm using C# because libraries:

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void TestLightsBeforeNoon()
  {
    SetSchedule(3, EVERYDAY, 1200);
    SetCurrentDay(SUNDAY);
    SetCurrentTime(1159);
    CallTimerFunction();
    AssertEqual(NO_LIGHT_ID, GetLightTransitionID());
    AssertEqual(LIGHT_NO_CHANGE, GetLightTransitionDirection());
  }

  [Test]
  public void TestLightsAtNoon()
  {
    SetSchedule(3, EVERYDAY, 1200);
    SetCurrentDay(SUNDAY);
    SetCurrentTime(1200);
    CallTimerFunction();
    AssertEqual(3, GetLightTransitionID());
    AssertEqual(LIGHT_ON, GetLightTransitionDirection());
  }
}
```

### DRYing the tests

If we focus on DRY, we might first go to something like this:

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void TestLightsBeforeNoon()
  {
    SetScheduleAndCurrentTime(3, EVERYDAY, 1200, SUNDAY, 1159);
    CallTimerFunction();
    AssertLightChange(NO_LIGHT_ID, LIGHT_NO_CHANGE);
  }

  [Test]
  public void TestLightsAtNoon()
  {
    SetScheduleAndCurrentTime(3, EVERYDAY, 1200, SUNDAY, 1159);
    CallTimerFunction();
    AssertLightChange(3, LIGHT_ON);
  }
}
```

More DRYing would lead to something like:

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void TestLightsBeforeNoon()
  {
    GivenDefaultScheduleAndCurrentTime(1159);
    CallTimerFunction();
    AssertLightChange(NO_LIGHT_ID, LIGHT_NO_CHANGE);
  }

  [Test]
  public void TestLightsAtNoon()
  {
    GivenDefaultScheduleAndCurrentTime(1200);
    CallTimerFunction();
    AssertLightChange(3, LIGHT_ON);
  }
}
```

This is a lot easier to read than the original. Removing duplication has clarified things.

### DRY is not precisely right

But it did so by accident. To see what I mean, let's look at why this is more legible. I see the following reasons:

1.  Hid parameters that are irrelevant to the test
2.  Gave a more explicit name to the assertion
3.  Decreased the amount of code, thus increasing information density

These are all good things!

But when we go back to the fundamental, I think the last one is better because it is easier to read. It is closer to the domain. DRY has led us towards easier to read and use.

But we can do better.

To see how we can do better, let's instead look at what happens if we explicitly target the assessment goal I defined. We want to make tests easy to read and close to the domain. In other words, explicit. Thus:

> Write Explicit Tests (WET)

### Focusing on WET

Let's start at the beginning again:

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void TestLightsBeforeNoon()
  {
    SetSchedule(3, EVERYDAY, 1200);
    SetCurrentDay(SUNDAY);
    SetCurrentTime(1159);
    CallTimerFunction();
    AssertEqual(NO_LIGHT_ID, GetLightTransitionID());
    AssertEqual(LIGHT_NO_CHANGE, GetLightTransitionDirection());
  }

  [Test]
  public void TestLightsAtNoon()
  {
    SetSchedule(3, EVERYDAY, 1200);
    SetCurrentDay(SUNDAY);
    SetCurrentTime(1200);
    CallTimerFunction();
    AssertEqual(3, GetLightTransitionID());
    AssertEqual(LIGHT_ON, GetLightTransitionDirection());
  }
}
```

OK. So what is this trying to test? In English, we would say "the first test shows that when we say to turn the lights on at noon, a minute before noon they are off. The second shows that the same schedule, at noon they are on." And then want to say "---but what I really mean is that when we schedule the lights to come on at a specific time, they turn on at that time."

Interesting.

Did you notice the subtle point? We don't actually want two tests!

There is only one domain condition here. We are just expressing it in two tests because---well, because of habit. Because we think that each test should highlight one initial condition, and the way we've written the code, we need two initial conditions to assess the boundary (we need to specify both sides of the boundary).

So if we are Writing Explicit Tests, we want only one test. And there are also the common things we need to do to make tests explicit:

* Hide irrelevant details (specific values that don't matter, data that is required for the code but not relevant for the test)
* Combine method calls or operations that each perform part of an operation, so we can express the full operation
* Give obvious names, preferably from the domain.

Applying this in steps, I'd first get the idea of one test:

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    // Setup noise - not really relevant for the test, but needed to make the system go.
    SetSchedule(3, EVERYDAY, 1200);
    SetCurrentDay(SUNDAY);

    SetCurrentTime(1159);
    CallTimerFunction();
    AssertEqual(NO_LIGHT_ID, GetLightTransitionID());
    AssertEqual(LIGHT_NO_CHANGE, GetLightTransitionDirection());

    SetCurrentTime(1200);
    CallTimerFunction();
    AssertEqual(3, GetLightTransitionID());
    AssertEqual(LIGHT_ON, GetLightTransitionDirection());
  }
}
```

Then I hide irrelevant details --- values that I don't really need. This is a set of Extract Method refactorings (you didn't think I'd actually edit a test by hand, did you? That might accidentally change the behavior of the test!).

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    SetScheduleToTurnOnLightsAt(1200);
    At(1159); // Also sets the day to Sunday, which I don't care about for this test.
    CallTimerFunction();
    AssertEqual(NO_LIGHT_ID, GetLightTransitionID());
    AssertEqual(LIGHT_NO_CHANGE, GetLightTransitionDirection());

    At(1200);
    CallTimerFunction();
    AssertEqual(3, GetLightTransitionID());
    AssertEqual(LIGHT_ON, GetLightTransitionDirection());
  }
}
```

Now there are a couple of partial operations which really should be combined into something that makes the operation clear. And I'm going to use a fluent API style to make it legible. More Extract Method refactorings, followed by Make Method Static, Move Method, and Convert To Extension Method.

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    SetScheduleToTurnOnLightsAt(1200);
    At(1159).CallTimerFunction();
    LightTransitions.Should().BeEmpty();

    At(1200).CallTimerFunction();
    LightTransitions.Should().TurnOnLight(3);
  }
}
```

Now there are some irrelevant details. I don't actually care about the specific time or light. Instead, I care about relative time. Let's make that more explicit. I do a couple Introduce Field refactorings & one eliminate parameter (Extract Method then Inline Method).

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    SetScheduleToTurnOnLightsAt(Noon);
    At(1.Minute.Before(Noon)).CallTimerFunction();
    LightTransitions.Should().BeEmpty();

    At(Noon).CallTimerFunction();
    LightTransitions.Should().TurnOnLight();
  }
}
```

A final pass of clarity. Some better names that make the real intent more clear and hide implementation details (the BA doesn't actually care that we chose to solve this with a timer --- just that the code turns the lights on and off). More Extract Methods and some Inline Methods. And I don't actually care about Noon. Rename variable.

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    SetScheduleToTurnOnLightsAt(ARBITRARY_TIME);
    At(1.Minute.Before(ARBITRARY_TIME)).Should()
      CauseNoLightTransitions();
    At(ARBITRARY_TIME).Should()
      .TurnOnLight();
  }
}
```

Now to finally implement our insight. We don't care about before and after. We care about transition. So let's assert that directly. And \`Lights\` are an important domain concept, so let's bring them back into more explicit focus.

```csharp
[TestFixture]
public class ScheduleTheLights
{
  [Test]
  public void LightsShouldTurnOnexactlyWhenScheduled()
  {
    SetScheduleToTurnOnLightsAt(ARBITRARY_TIME);
    At(ARBITRARY_TIME).Lights.Should()
      .ChangeFrom(LIGHT_UNSPECIFIED)
      .To(LIGHT_ON);
  }
}
```

That is what I call an explicit test. It describes exactly the thing that the business person cares about.

### Wouldn't DRY have gotten me there?

Not really. I find a focus on DRY to lead to removing code duplications and creating abstractions to reduce concept duplications. That's exactly what I want for product code.

But for tests, I want to be able to fully understand the test without referring to anything outside the test method body.

Which means I can't create abstractions. I can use domain terms with their domain meanings (those are abstractions, but are already units in the domain). That prevents a lot of DRYness.

For example, in the original code these tests sat next to a whole lot of other schedule tests. Those ones verified other boundaries or made non-boundary verifications. But they executed nearly identical code, just with different values.

Following DRY would lead us to this as duplication, which we would either eliminate or see as "non-conceptual, code-only duplication" and choose to leave. A tough judgment call.

Following WET just asks "What is each test attempting to say? How could we say that most clearly?"
