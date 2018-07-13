---
id: 134
title: The No Mocks Book
date: 2012-12-18T10:05:18+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=134
permalink: /the-no-mocks-book/
category: techies
tags:
  - design
  - no mocks
  - tdd
---
Recently on twitter, Clayton asked for a good [book about unit testing without mocks](https://twitter.com/claytonlz/status/279590310017896448). I don't believe such a thing can be written, so I'll try to write it in one blog post. First, here it is in one sentence:

> Mocks are a smell. They tell you that your code depends on some semi-related part of the system. Rather than work around the design defect, fix the design.

The trick is figuring out what smell you are observing and how to "fix" it. Basically, what alternatives exist. Down the rabbit hole we go.

<!--more-->

## Understanding the problem

Let's pick a simple chunk of code from this morning (slightly modified to fit here). Here's the original:

```csharp
public static int Main(string[] argv, TextWriter output)
{
  var args = UserIntent.From(argv);
  if(args == null)
  {
    output.WriteLine(Resources.UsageInformation());
    return 1;
  }

  ProjectFile whatToExamine;
  try
  {
    whatToExamine = ProjectFile.LoadFrom(args, FileSystem.LocalDisk());
  }
  catch(FileNotFoundException ex)
  {
    output.WriteLine("Project file '{0}' not found. Please check your path.", ex.FileName);
    return 2;
  }

  var result = whatToExamine.Analyze(new[] { new Rule_HintPathIsNotAllowed() });
  if(!result)
    output.WriteLine("Oops! Found a problem. We'll tell you what the problem is in a future version. For now, we only check for hint paths, so you might want to look at that.");

  return result ? 0 : 3;
}
```

This code is clearly not finished yet. Eventually the rules should probably have some way to indicate what the problem is. But even in its current form, it is very difficult to test:

  1. It uses static methods all over the place.
  2. It has a try/catch block, so we have to test it by injecting exceptions.
  3. It does multiple things:
      1. sequence the operations (read args, then load file, then analyze it)
      2. and handle all user display from that.
  4. It has a bunch of conditional logic, including early returns. It is not legal, for example, to call Analyze when the project file is not found, since we won't have an object to call Analyze on. It will be hard to test each responsibility or case independently.

So let's look at a couple solutions. Mocks first.

## Mocking FTW

I was working on this code with a partner who is a frequent user of mocks. Mocks are a general tool; they can be used to work around any code deisgn problem. As such, he knows that technique well and doesn't see the alternatives. When he looked at this code, he saw "obvious" problems.

Really, just one obvious problem: the static method used to create a ProjectFile.

His needs for code are simple: be able to inject a fake for everything that the code interacts with. Once he's got a fake, then he'll be able to inject whatever in order to test the code --- any code.

There is exactly one evil that he can't let survive: a compiled function call. Any call through any kind of indirection is OK (call through object/interface pointer, call through event, call of a function that is passed as an argument, call through function pointer, etc). But he needs one point of indirection at each call. As he said while implementing his solution: "any problem can be solved by adding a level of indirection."

Thus, he created a ProjectFileFactory interface and a ProjectFile interface. We could then pass in fakes/mocks/stubs for those values. Thus the test can both control the inputs to the function and get callbacks whenever the function does anything. This lets us control all data sources going into the function and all outputs coming out of it. Life is good.

He doesn't need to change this code much. It pretty much stays as it is, we just add 2 interfaces and we are done. We can move on.

## So what's the catch?

Same as the advantage: he doesn't need to change this code much. It pretty much stays as it is, we just add 2 interfaces and we are done.

Think about this for a moment. Here's what has happened here:

  1. Our testing process found a design smell. We were unable to inject some set of the input.
  2. Rather than thinking about the problem, we identified the solution: use a mock.
  3. Actually, we chose the solution strategy as well: optimize for minimum design churn. Change the code as little as possible to enable testing.
  4. Exectute.

Step two rubs many people the wrong way. People will argue that no, they didn't leap to a solution. They thought it through. They are different. They've tried other stuff, and they do other approaches when code doesn't have dependencies. But this code does, and the way to split off dependencies is to use a mock.

That's one option.

There are a ton of different design options. Here are some off the top of my head:

  * Eliminate a dependency.
  * Transform a dependency to a form that is easier to test.
  * Segregate responsibilities differently.
  * Share a context (MVVM, boundary object, coordinator, or similar parttern).
  * Inject the dependency (the usual mocks approach).
  * Weaken the coupling to the dependency, or change it to a different coupling category.

And besides, that's not the step of the thinking that rubs me the wrong way. The part that offends me is step 3.

In step 3, we've not just jumped to conclusions on the design we will use here. We've jumped to conclusions on the metric by which we will measure good design. No wonder mocking seems like a good idea. I agree that it is the best idea _if minimizing design churn is your #1 criterion_. And we've just assumed that that is the rule we'll always use to measure optimal.

Sometimes it is. For example, I use mocks all the time with legacy code, when I'm operating in triage mode, or with public APIs. Those are all cases in which eliminating design churn is a feature. Changing a public API's design approach requires changing the way that suppliers or comsumers think about the code. That is so expensive as to nearly never be worth it. So mock away!

But that's not the usual goal for most of my code. Usually I'm trying to learn from my code. And then I want to incorporate those learnings into my code --- which means changing the design over time (not necessarily reflectively --- BDIM (Big Design In Middle) is OK too).

## The No Mocks perspective --- look wider

As attempt to show the no mocks perspective, here's a conversation that I had with myself as we worked with this code. This is based on a true story. Which means it's completely made up but it reflects my subconscious internal dialogue as well as I can.

Arlo: "What's the problem here? Why can't I test it?"

Arlo: "Gobstopper pattern again."

Arlo: "OK, so what does this code do in response to internal layers? Those will be the responsibilities that I have to test and are hard."

Arlo: "That bloody try/catch block. Exceptions are fine. Easy to test. Code that uses them, OTOH: ugh."

Arlo: <smirks> "Whatever. You'll deal. Anything else?"

Arlo: "It also has 3 distinct blocks, with early exits. Not a sequence function in disguise, and not a good match for a shared context. Each phases passes on different information."

Arlo: "I'm not so sure about that. What about MVVM?"

Arlo: "For a command-line app?"

Arlo: "Well, obviously only the encapsulation and boundary object parts of the pattern. Data binding and view minimization would be silly."

Arlo: "Are you two done? You've ratholed on a point solution again."

Arlo: "Sorry. We both are. You were saying? Or, well, asking. Since you never say anything."

Arlo: "Yeah. I hate that. Wish you'd just tell us the answers and stuff."

Arlo: "Do you think that I know the answers? Or do I just know how to ask you guys questions?"

Arlo: <level glare of death>

Arlo: "Moving along. You've identified the smells: multiple repsonsibilities, unclear function structural pattern, a hard-to-encapsulate dispatch mechanism (exception handling control flow). There are probably a few others. Any of the usual instigators present? Any of the common hangers-on for these kinds of smells?"

Arlo: "Yeah, primitive obsession. All over the place. And with conditionals based on partial information. Also messy data due to the exception flow. And precondition-heavy subsequent steps. Actually, primitive obsession is probably the core problem. Looks like another case of the missing [whole value](http://c2.com/ppr/checks.html)."

Arlo: "OK. So how are you going to decide on a good design? What's your context?"

Arlo: "Always with that question! Shut up about the context already."

Arlo: <aside> "Friggin context."

Arlo: "This time, people are following along [the code comes from a recording session for a company-internal version of James Shore's [Let's Play TDD](http://www.jamesshore.com/Blog/Lets-Play/) series]. They want to learn about TDD and pairing. And that means good design. They want a clear example of good design."

Arlo: "OK, so what are you trying to show these people, then? What myth are you trying to dispel, and how will you dispel it?"

Arlo: "The mock everything approach. They asked me for a no mocks example. I think this would be a good case."

Arlo: "OK, so what? How will you define a good solution?"

Arlo: "No craziness. Don't want to scare them off. So functional programming is out --- these are OO and procedural people. Other than that, simplest is best. They will compare it with the mockist version. And that means especially that the tests need to be simple and obvious. Where possible, so should the code. I'm definately thinking whole value pattern here. Really good names and clear purpose for each part."

Arlo: "Sounds good. So what are you going to try?"

Arlo: "I think there was something in that MVVM aside. We're really looking for a missing whole value. Looking at the intertwined data flows, it seems like the missing value is something about coordination. So a boundary object might work very well. And this is a UI-like situation, so MVVM is one of the in-domain pattern representations of that meta-pattern."

Arlo: <out loud> "OK, here's an idea. One of our watchers asked that we show them no-mocks approaches. I think this might be a good chance to show both. So let's do your idea first. Let's get un-stuck and show them a simple way that they can use what they already know to get themselves un-stuck. Then let's revert and use a dependency-elimination approach in a branch. We can compare them afterwards and decide which to carry with us."

I assume you were able to follow when characters entered and exited the stage since I included the character names.

Other than making it clear that my multiple personality syndrome makes lets me talk with myself really quickly, I hope this makes clear what I'm considering when I design.

## So what?

At the end of my internal dialogue I had thought through the design a bit and come up with both a significant simplification of the design and a better basis on which to judge good designs for this code in this project. This design simplification goes a lot deeper than the simple introduction of interfaces that we needed for mocks. It actually separates responsibilities and tests them separately.

Now, I haven't actually executed the new design yet so I don't know exactly what it will look like. But it'll be something like:

```csharp
public static int Main(string[] argv, TextWriter output)
{
  var data = new AnalyzerViewModel();
  data.DetermineUserIntent();
  data.LoadProjectFile();
  data.Analyze();
  return ReportBackToUser(data, output);
}

public static int ReportBackToUser(AnalyzerViewModel data, TextWriter output)
{
  data.Messages.ForEach(output.WriteLine);
  return data.ErrorLevel.ValueOr(0);  // uses helper extension method that is not shown here.
}

public class AnalyzerViewModel
{
  public List Messages = new List();
  public int? ErrorLevel = null;
  private ProjectFile _analysisTarget = null;
  private UserIntent _args = null;

  public void DetermineUserIntent(string[] argv)
  {
    _args = UserIntent.From(argv);
    if(_args != null) return;
    Messages.Add(Resources.UsageInfo());
    ErrorLevel = 1;
  }

  public void LoadProjectFile()
  {
    if(ErrorLevel.HasValue) return;
    try
    {
      _analysisTarget = ProjectFile.LoadFrom(args, FileSystem.LocalDisk());
    }
    catch(FileNotFoundException ex)
    {
      Messages.Add(string.Format("Project file '{0}' not found. Please check your path.", ex.FileName));
      ErrorLevel = 2;
    }
  }

  public void Analyze()
  {
    if(ErrorLevel.HasValue) return;
    var result = whatToExamine.Analyze(new[] { new Rule_HintPathIsNotAllowed() });
    if(!result)
    {
      Messages.Add("Oops! Found a problem. We'll tell you what the problem is in a future version. For now, we only check for hint paths, so you might want to look at that.");
      ErrorLevel = 3;
    }
  }
}
```

This code may still not be done, but that one refactoring is. I have introduced a coordination point. Currently, it is more than a simple coordinator. The 3 helper methods probably don't belong on it --- they are probably really model functions. But this will be good enough for now.

I now don't bother testing the top-level function. It is blazingly obvious code. Its test would be just a duplication of its code. Instead I'll test it by simply letting the customer read it and tell me whether I got the steps right.

The 3 helpers all operate just on the values in the view model class. So I can test them independently by creating a view model class in whatever state matches the input for my case, running the function, and then verifying the resultant state of the view model.

Finally, I test the ReportToUser method by simply giving it a view model with whatever I want and ensuring that it diligently writes that out and returns the error level.

And now back to the question that started this whole discussion.

## So where's the book for this?

There isn't one. I don't think there really can be one. The topic is either too large or too small for a book.

If we say that the no mocks topic includes only the parts related to testing, then this article pretty much covers it. We're done here. All you need to know is that mocks indicate smells are present, the most likely one is primitive obsession, you should fix the design rather than just working around it, and read the existing design literature to know how.

If we say that the no mocks topic includes enough that you can actually implement mock free unit TDD code, then we have to incorporate most of the design literature. Pretty much any design topic that is related to breaking coupling will be important at some point. And that's most of the literature.

Perhaps there is space for a middle ground. We could pick a set of common examples and show some common solutions. We re-print everything about our most useful patterns (whole value, events, function-typed arguments, a simplified form of the state monad, Maybe<T> and maybe execution, async and continuations / tasks). That's a nice book to write, since about 7/8 of it has already been written by someone else. Just need to take the idea and wrap it in your own words.

Does this sound like a useful book? Or is this article plus that list of pattern names / keywords enough?
