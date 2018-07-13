---
id: 53
title: "Mock Free Example, Part 3: Fixing Untestable Code Sequences"
date: 2011-07-27T06:05:57+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=53
permalink: /mock-free-example-part-3-fixing-untestable-code-sequences/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/96205890499252224
tt_tweeted_date:
  - 2011-07-27 13:10:46
category: techies
tags:
  - design
  - example
  - no mocks
---
In my character printer, at one point I had some code like [this monstrosity](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_1_ugly_mess.cs "The ugly mess"). I know it's a monster, because testing it

  * Requires at least one test double (the `_character` field).
  * Involves running a bunch of code not related to the unit test at hand.

Many people don't think this code is so bad. They discuss various ways to test it, usually involving more mocks.

I'm going to show another way. Since it doesn't require mocks and this is my blog, it's a better way.<!--more--> Rather than use better testing skills, I'm going to use a better design.

For those of you who have been following along with this blog series, I'm pulling a little bait and switch. I promised I'd use [my character printer](https://github.com/arlobelshee/PrintChar "character printer code on github") for examples, but I'm going to use [a made-up example project](https://github.com/arlobelshee/BlogExamples/tree/master/CodeSequences "my example code project on github") for this post.

The character printer does not show the history of refactoring and thinking. My new example does, which I think will make it easier to see the main ideas. So deal.

Enough intro; back to code.

### Death to Primitives

The first step that I do is pretty much the same as you'd do to get this code to be testable with mocks. I [fix the primitive obsession](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_2_fix_primitive_obsession.cs "code sample fixing the primitive obsession").

Sure, it's not totally fixed, but this is enough to inject some test doubles and start testing units. More importantly, it breaks out some helper classes which have no dependencies and can be properly unit tested.

Here I write those tests. You'll have to imagine them, but they'd consist of several integration/acceptance tests for `ParseCharacterIntoCards`, probably some unit tests for the same function that use mocks, and a large number of true unit tests for the `WotcResponseCleaner` and `PowerFormatter` classes.

Seeing how testable those helper classes are, I want to achieve the same for my main function. So, why are the helpers testable? No dependencies? Not really. The key is that all their methods are side-effect free, pure functions---functions whose results depend only on their inputs, and whose only effects are to return values. How can I achieve that with the ugly code?

### Expose the Structure

Well, the first step is to [discover the underlying structure](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_3_extract_methods_to_show_structure.cs "code example showing method extracting"). I extract a lot of methods, providing names. I don't extract any methods with control structures (perhaps an if, but likely not even that). As a result, my main function is now screamingly obvious. It consists only of control structures and names.

About this time, assuming they have have made it so far, the parallel programmers in this crowd are screaming at their screens about performance problems. Well, you're right, but I'm not going to listen to you.

We'll pick that up next week when we look at the async (and better) approach to this problem. I want to introduce the synchronous versions of these patterns before I go all async, even though the async versions are simpler to write and read in C#. Simultaneous concept count and all that. Read on, then come back next week when I make it all cool and stuff.

### Test the Named Methods

At this point, I can write unit tests for each of those extracted methods. This reduces the scope of my tests---they now execute only the code they mean to test. I can probably delete a couple of my acceptance tests at this point, as they are redundant with the more granular unit tests. However, I can't kill them all.

These named helper methods are not pure, but that's OK. Keep testing them with mocks. It'll be the same set of mocks as before (a cleaner, formatter, and character).

Some of them are simple enough (such as `CleanTheResponse`), that you could just test them with the real dependency. Test all of the cases in your cleaner unit tests. Then lift one example to the test `CleanTheResponse`.

That one example would contain one problem that will be cleaned by each helper method (and no more than that). Remember, you are testing only `CleanTheResponse`, and assuming that the cleaner already works.

OK, so now we can see the underlying structure. How does that help us test the method without invoking dependencies? Well, now we can see a way to rephrase that question: how do we test that structure without invoking any of the named methods?

### Test the Structure

First, what is the structure that we want to test? The `foreach` loop is obvious. However, there's another important control structure in play here: the lowly semicolon. Those of you used to procedural languages probably never noticed it. Those of you used to Haskell have been screaming **USE MONADS, YOU FOOL** at your screen since I first asked this question up in paragraph 10.

The Haskell people are right. Up until now, we've been refactoring to OO designs and ways of thinking. This has helped us pull out a bunch of units and improve our code's testability. OO is great at encapsulating data. It makes it easy to unit test various chunks of data and various data transforms separately from each other. That's what we've been doing so far.

Functional programming, on the other hand, is great at encapsulating control flow. It doesn't help encapsulate state, but it can really help encapsulate control structures from each other so that they can be unit tested. Sound familiar?

Although the `foreach` loop is the obvious control structure, the one that is actually limiting testability is the semicolon. So we're going to eliminate that first.

We're gong to use a monad. Or, as they are known in OO circles, a chain of responsibility pattern (stop hitting me, Haskell people. Yes, I know that a monad is capable of much more than a lowly chain of responsibility, but that's the part of the monad that we need right here, so I'm sticking with the concept that more people already understand. Perhaps this will help them learn monads when they decide to follow the paths of righteousness, truth, light, purity, laziness, and so on).

### Replace Semicolons With Data Flow

I'm actually using a variation on chain of responsibility that I call the data flow pipeline. This is, basically, a direct translation of the semicolon operator into the land of side-effect free, pure functions. (Operator, you ask? Yes, it is. It's an infix token sequence that takes two statements and combines them into a larger statement by performing the sequence operation. Oh, and [some languages](http://boo.codehaus.org/) let you overload it.)

What we're going to do is change each function to take one argument and return one result. And those two will be of the same type. We change this:

```csharp
FirstThing();
SecondThing();
return _fieldsThatHaveBeenModifiedByTheAbove;
```

into this:

```csharp
var data = new AllOfTheStateForAllSteps();
data = FirstThing(data);
data = SecondThing(data);
return data.FinalResult;
```

### Use Uniform Signatures

I change the code to [use uniform signatures](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_4_to_uniform_function_signatures.cs "code example of uniform signatures") by simply pulling all of the fields that each named method modifies, and each input parameter for the function into a new class. This class represents the entire state of a parse.

I altered the signatures one field or parameter at a time. There are lots of intermediate variables, but my sample shows only the final result. Know, however, that you can do this entirely with a refactoring tool. If you find yourself writing a single line of code, then you're taking too-large steps.

This code, BTW, is now in the canonical state monad form. In Haskell they've got special operators that eliminate much of the redundancy, but this is the equivalent in C#.

### The Tests Still Suck

This step doesn't improve the tests. They're pretty much as they were, but slightly worse. Now, each test of a named method creates an entire `PowerPipelineState`, even though it only needs part of it.

This often happens when we do a refactoring from the functional paradigm: it decouples and encapsulates functionality by coupling data. Similarly, an OO refactoring tends to encapsulate and decouple data by coupling functionality. By going back and forth between paradigms, we can decouple both.

But you'll have to wait for an example of that. It comes up in my async version of this. I don't do it here because the "data transform pipeline with non-uniform intermediate data" pattern variation is a lot easier to implement with futures than with simple synchronous methods. So I'll wait until it's easier.

Next we apply a very common functional pattern: code becomes data. This lets us transform behavior into state, which means that we can test behavior by testing the state of the computation. State tests tend to be simpler to write and more resilient to refactoring, so I prefer them where possible. Functional programming lets me use them in some cases where they are impossible.

### Semicolons Finally Die

In this case, I apply the pattern by [lifting the sequence of named methods](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_5_code_becomes_data.cs) into a data structure. Finally, we'll be able to test the correctness of the code without executing any of the methods. We'll simply check that the data structure is what we expect.

Basically, we are turning this:

```csharp
var data = new AllOfTheStateForAllSteps();
data = FirstThing(data);
data = SecondThing(data);
return data.FinalResult;
```

into this:

```csharp
IEnumerable&lt;Func&lt;AllOfTheStateForAllSteps, AllOfTheStateForAllSteps&gt;&gt;
  steps = new[] {FirstThing, SecondThing};
var data = new AllOfTheStateForAllSteps();
foreach(var op in steps)
{
  data = op(data);
}
return data.FinalResult;
```

into this:

```csharp
var pipeline = DecideWhatToDo();

var data = new AllOfTheStateForAllSteps();
state = pipeline.Aggregate(state, (current, op) =&gt; op(current));
return data.FinalResult;
```

Extract the data.FinalResult into a lambda, make it generic on the types of the state variable and the result, make it a class, take the steps at construction time, and rename it to `StateMonad`, and we've got our own little bit of Haskell right here (well, with a lot more syntax and no cool `>>=` operator).

Anyway, I did one more change in this version: I finally extracted the body of the `foreach` loop into a method (`ApplyTransformPipeline`), and then transformed to its equivalent Linq expression.

### Thank You, Monad

At this point, the tests are pretty solid. I can check that `ApplyTransformPipeline` will execute an arbitrary sequence in order (by, say telling it to add 1 and then multiply the result by 2 and seeing what I get). Independently, I can verify that `CreatePipeline` is creating the right sequence of operations in the right order. And with one more trivial refactoring (not done here), I could lift my foreach loop and do the same for it.

Basically, my tests validate that the pipeline is built with the right segments in the right order, that pipeline processing pushes data through any pipeline correctly, and that each segment behaves correctly on its own. There's no value to actually testing any data items going through the whole pipeline, so I delete the acceptance tests.

### Work Around C#

Now I'm going back to OO land for one final refactoring, after which I'll call it a day. I [replace the functions with function objects](https://github.com/arlobelshee/BlogExamples/blob/master/CodeSequences/CodeSequences/_6_split_out_the_classes.cs). I only do this because C# lambdas are a lot more difficult to check for equality than are objects. Thus, it is hard to write the test for `CreatePipeline`. As a side effect, now each step contains just the helper it needs, rather than those all being members of the parser. But I could have gotten that earlier, and directly, had that been my core intent.

### So Much Better (?)

That's the final version: I've successfully turned 20 lines of vanilla C# into dozens of classes and methods, using concepts like monads that no one understands even in the language they come from. Clearly better!

But, well, it is fully unit testable. There are a lot more names, which make it scale better as I add more complexity to my parser (my final version of this method, if inlined, would be around 1-2 kLoC). And several of the new concepts are actually generic programming concepts that can be pulled out, given names, put in a library, and used all over the place.
