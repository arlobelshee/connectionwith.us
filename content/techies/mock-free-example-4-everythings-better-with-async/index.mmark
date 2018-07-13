---
id: 56
title: "Mock Free Example 4: Everything's Better with Async"
date: 2012-07-17T07:56:06+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=56
permalink: /mock-free-example-4-everythings-better-with-async/
category: techies
tags:
  - design
  - example
  - no mocks
---
In the [previous post](http://arlobelshee.com/post/mock-free-example-part-3-fixing-untestable-code-sequences "Mock Free Example, Part 3: Fixing Untestable Code Sequences") in this series ("last week" to those who didn't read it over a year ago), I made simple code complicated in the effort to make it unit testable. It was all going along fine, until I started bringing functional programming into the mix.

Since that worked _so_ well, I'm going to demonstrate how I really wrote the code, which brings in functional programming, laziness, and asynchronous programming.<!--more-->

This time, instead of pulling in one concept from functional programming, I'm going to pull in a whole bunch of them at once.

## Start With a Decent OO Design

First, let's roll back a number of the changes we made in the last post. I want to go back to step 3, which I've copied to create [step 7](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_7_revert_to_3.cs "Extracted named methods"). Recall that I extracted some classes to fix primitive obsession (in step 2), and then extracted some named methods (in step 3).

At this point, we've got a reasonable OO design. We've identified useful bits of state and made classes / objects for them. We've created small methods that create those pieces of state. We don't have any state manipulators; all of our types are immutible (or, at least, not mutated by the code under test).

However, we've got two problems.

  1. The overall transform process is I/O bound. I want it to be parallel and async.
  2. The top-level process has structure, and I can't test that structure without executing the implementation of each lower-level method.

Kim Wallmark refers to the second problem as "the gobstopper problem." The code is layered. Each test depends on all the lower-level layers. So changes to the inner layers break tons of tests. And your jaw.

Last time I just tried to solve the second problem. And I made a mess (with some good features). This time, let's start with the first problem.

## Swarming

Time to pull in stuff from C#'s Task Parallel Library (TPL). This is C# 4.0 goodness. Fortunately, you all migrated to C# 4.0 long ago.

I note that my top level method is basically structured as:

  1. Start with a set of things (XML nodes in this case).
  2. For each one, perform a sequence of transformations.
      * Each item is independent from all others, so each pipeline can run in parallel with the others.
      * Each pipleine is, itself, a sequence of operations. We want to kick off each step when the one before it finishes.
      * The termination of each pipeline is to modify a view model and notify the view to refresh its databound controls.

So [let's structure the code](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_8_go_parallel_and_lazy.cs "Parallel and lazy") that way.

First, the parallelism. I introduce a couple of PLinq queries. These look like Linq, but actually will be parallelized.

```csharp
public IEnumerable ParseCharacterIntoCards()
{
	return FindAllPowers().Select(ToPowerInfo).Select(ParseOneCard);
}

public ParallelQuery FindAllPowers()
{
	return _character.CreateNavigator()
		.Select("details/detail[@type='power']")
		.AsParallel()
		.Cast&lt;XPathNavigator&gt;();
}
```

`_character.CreateNavigator().Select("...")` uses the Xml parser to find all nodes that match a particular set. This happens synchronously. However, I then immediately call `AsParallel()` on the result. This gives me a parallel linq query. Any further operations that I perform on this set will be parallelized. In my case, that means the two `Select()` calls in `ParseCharacterIntoCards()`.

## Promises, Promises

To define each processing pipeline, I'm going to pull in another concept: promises (a.k.a. futures, a.k.a. `Task<T>`). A promise is a lazily-computed result of a function. Much like `Func` and `Action` allow you to pass around functions that someone can later call, a `Task` is simply a function that has already been called but may not have returned yet.

It is a promise that the function call will eventually finish executing and that you'll be able to get its result at that time.

One of the nice features of promises is that you can easily chain them together. If you have a promise, you know that, eventually, one of two things will happen:

  * The call will complete and will give you a result.
  * The call will fault and throw an exception.

So `Task<T>` lets you schedule a handler for either (or both) of these cases. What is the result of scheduling a completion handler for a promise? It's another promise. Basically, you're telling the work scheduler to do A, then do B with the result of A, and then give me back the result of B. The system gives this to you as a promise for B's result.

So promises make exactly the sort of data flow pipeline that we were looking for. Let's use them.

```csharp
private CardViewModel ParseOneCard(PowerLocalInfo localInfo)
{
	var card = new CardViewModel();
	var powerDetails = GetOnlineInfoForPower(localInfo);
	var powerInfo = powerDetails.ContinueWith(t =&gt; CleanTheResponse(t.Result));
	powerInfo.ContinueWith(t =&gt; UpdateViewModel(localInfo, t.Result, card));
	return card;
}
```

Nice and simple. Our pipeline starts with the local info for each power (as parsed from the Xml document). It then fetches additional data from the web service, cleans and parses that, merges it with the local data, and updates the view model with the result.

The steps are combined with calls to `ContinueWith()`. This is the success handler for the promise. Whenever the promise resolves, it will feed its result into the next step of the pipeline and things will go on.

## Better Than Last Time?

I think this is a lot better than the syncronous version was at this point. We are able to chain the functions together even though they have different signatures. We just pipe the result of one into the next. We don't need to ensure that each function has the same type.

Also, we're using a couple of library classes, so we don't have to see the nasty code that is doing the dispatch work for us.

## Wasn't This About Testing?

Well, yes. So what do our tests look like at this point?

Exactly the same as they did at step 7.

We've got all of this cool parallelism and async joy inside. It is all encapsulated. But there's no way to ask the pipeline what its structure is, so the only way to test it is still to execute it and see what happens.

Last time, we solved this problem by re-ifying the functions. That let us then ask them questions (hey, who are you? Are you ordered correctly?). Let's try that again.

## Questionable Promises

I want to be able to ask each promise what its processing chain is. Unfortuately, `Task<T>` doesn't tell me this stuff, because `Func<T>` doesn't remember this stuff. So I'll need to [build my own lightweight wrappers](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_9_reify_the_continuations.cs "reify the continuations") for `Func<T>` and `Task<T>` that not only string together `Task`s, but remember what they are stringing together.

This introduces a bunch of library code, but doesn't actually change my product code that much.

And now, finally, I can write state-based tests that simply ask the processing pipeline about its structure. `ParseIntoCard()` is a regular public method. Call it and it returns a continuation. Ask that continuation about its structure and you have verified that your data processing pipeline does the right things in the right order.

Add that to the previoulsy-developed tests for each part, and we've got a fully tested system, with no test doubles in sight.

## Conclusion

So, how does this code compare to the [original ugly foreach](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_1_ugly_mess.cs "ugly mess")? It's a lot more performant, since it is fully async and parallel.

I also find it equally easy to read. The top level consists of a node select and then a set of setwise transforms, each with a name. Most of these transforms are simple, but one is a complicated data transformation pipeline. Rather than having to read this into lots of lines in a foreach body, I see the following:

```csharp
return Start.With(() =&gt; GetOnlineInfoForPower(localInfo))
	.Then(s =&gt; CleanTheResponse(s))
	.Then(t =&gt; UpdateViewModel(localInfo, t, card));
```

That is about as easy to read as the fully synchronous, procedural version:

```csharp
var s = GetOnlineInfoForPower(localInfo);
var t = CleanTheResponse(s)
return UpdateViewModel(localInfo, t, card);
```

But it has better performance and can be tested declaratively.

Promises certainly aren't always the right tool for the job. But they are an excellent tool for defining a data flow pipeline---and that is a common pattern.
