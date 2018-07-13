---
id: 39
title: How I Learned to Stop Worrying and Love the Mock
date: 2011-05-31T06:58:16+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=39
permalink: /how-i-learned-to-stop-worrying-and-love-the-mock/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/75561913110638592
tt_tweeted_date:
  - 2011-05-31 13:58:58
category: techies
tags:
  - design
  - fluency
  - mocks
  - proficiency
  - tdd
---
I learned something very useful from Marty Nelson's blog entry on the [proficinecy levels of TDD](http://softwaregreenhouses.com/2011/01/30/using-wayk-to-describe-tdd-fluency/ "Fluent TDD"). It was the first time that I saw a construction which included mock objects as a good thing and that also passed my sniff test. So, I hereby recant: Mocks are no more Evil than are nuclear bombs. I've learned to love them, as the tools of mass destruction that they are.

Actually,<!--more--> I really liked Marty's formation and information. And I liked James Shore's presentation for

[proficiencies of Planning](http://jamesshore.com/Blog/Proficiencies-of-Planning.html "Planning fluently"). So I'm going to steal from both of them, and change just enough that I can say it's my own work.

The important thing that both of these authors point out is something that they stole from [Where Are Your Keys](http://whereareyourkeys.org/) (a game for learning to speak languages). Achieve, and celebrate, fluency at each level of proficiency.

Someone who speaks French like Tarzan, but is able to ask simple questions and understand responses, has achieved a hugely important level of proficiency. If he can do it while late for a train and really having to pee, he's got an extremely valuable proficiency. That person is much more likely to enjoy his trip to Paris.

Sure, we'd all like to be able to discuss morality with Sartre. And it's good to celebrate fluent discourse in epistemology, aesthetics, and other high-falutin' topics. We should celebrate it to the same degree as we do the person who can ask for a restroom rather than just using the nearest stairwell.

One more aside, then I promise I'll get back to the joys of a good nuclear mocking.

For those of you who have not played WAYK, it consists of a pair of simple games with a large number of simple techniques. These techniques apply at the meta-level of the game. They help organize the thinking around learning a language. They provide specific actions, or specific patterns of behavior, that a player can do to improve their rate of achieving fluency. There are lots of good ideas here, with evocative names such as Lunatic Fringe, Angel on the Shoulder, Full, Technique Technique, Obviously!, and Craig's List.

The one that both of these authors used is [Travels With Charlie](http://vimeo.com/6351731 "Willem Larsen demonstrating Travels With Charlie"). This technique's purpose is to organize levels of proficiency at a skill that you're trying to learn. This lets you notice, and celebrate, success along the way. It lets you identify what you need to learn next, and what to fall back on when you're having difficulty. And, it distinguishes proficiency (what you can do) from fluency (how automatically you can do it).

Here, then, is my view of the road to TDD mastery.

### Level 1: Zog Run Test

At this level, the coder knows what an in-language automated test is. He is able to use a test framework, such as JUnit, to write tests over parts of his code. His tests may not run everywhere, they may not run quickly, and they may have all sorts of other problems. However, the developer is writing tests, and he's not using a UI automation tool to do so. Some of his tests will survive a UI change.

**Focus**: "we write automated tests."

**Skills**:

  * Write automated tests using a developer-oriented test framework.
  * Tests don't go through the UI controls, so are unaffected when that changes. However, they may not be far removed from the UI.
  * Can test easy pieces of code: procedures with few dependencies.
  * Can write a good state-based test (verify state before and after calling code under test).
  * Running tests is easy; the developers can use a single command to run all the tests in their system.
  * Developers run tests frequently.
  * Developers put tests around tricky areas of code, so that they get feedback before QA can do a test run.

**Signs and portents**:

  * Many areas are still too hard to test, due to dependencies. These are typically tested indirectly, from a higher level.
  * Most erroroneous changes cause a test failure. However, many of them cause multiple tests to fail.
  * The suite of tests is usually still pretty quick, because the tests don't hit the things with external dependencies.
  * The tests aren't that useful as documentation.
  * Tests use Assert.IsTrue().

A development team that is fluent at a given level exhibits the signs and portents for that level. It is also able to apply the skills consistently and automatically---the developers need not pay attention to the skills, but use them when focusing on their work.

### Level 2: Coverage is My Sun, My Moon, and All My Stars

The dev team is concerned with coverage. They've seen some benefits from their testing, and now want to get everything under test. They're starting to see the benefits of tests in supporting refactoring. They may start using red-green-refactor; they're almost certainly at least doing red-green (failing test before code). TDD stands for test-driven development.

**Focus**: "we test our code."

**Skills**:

  * Can test any part of the system, though often with a multi-unit test.
  * Can plug in tests at many levels of the code; each test tests from there "down."
  * Developers see themselves as partly responsible for quality. They don't just code stuff and then toss it over the wall to QA.
  * Can test both behavior and state, but doesn't distinguish between them.
  * Can use tests to localize defects.
  * Can use tests to replace most uses of the debugger.

**Signs and portents**:

  * The team attempts to get everything under test---even if they don't see a good way to do so.
  * Most erroroneous changes cause a test failure. However, many of them cause multiple tests to fail.
  * Tests take a long time to run.
  * Tests use Assert.AreEqual().
  * Tests depend on environment. They might break when run on "someone else's box."
  * Tests sometimes depend on each other. Order of execution matters.
  * Tests are often long sequences of operations interleaved with assertions.
  * Tests have a lot of duplication.
  * Tests commonly use SetUp and TearDown.
  * Many to many relationship between tests & classes under test.
  * Uses code coverage to find places where tests are missing.

### Level 3: An Earth-Shattering Ka-Boom!

A team fluent at this level suddenly starts writing decomposable code. They are able to hear the needs of the tests, and use them to reduce dependencies between code elements. This decreases coupling and increases (class-level-) cohesion. They start thinking of TDD as a design activity, and refactor both the code and the tests. They usually have a fair amount of legacy test built up from earlier levels, which they now refactor. TDD influences only the surface design; it doesn't result in fundamental changes yet.

**Focus**: "our tests and code work together to make each other maintainable."

**Skills**:

  * Can use test doubles to break dependencies when testing.
  * Can write a unit test for any part of the system, though often by artificially breaking dependencies.
  * Can use dependency injection to reduce test setup complexity.
  * Can see the value in reducing coupling & dependencies.
  * Can get legacy systems under test, safely.
  * Use of stubs, DI, or similar techniques to allow testing without a database, filesystem, or other external resource.
  * Learns from TDD how to write better tests.
  * Test ccode is kept as healthy as regular code. Little duplication in either.
  * Distinguish between state tests and behavior tests.
  * Distinguish between unit and multi-unit tests, and prefer the former.

**Signs and portents**:

  * Testability is a reason to refactor code.
  * 1:1 relationship between test classes and code classes.
  * Most bugs cause exactly one test to fail.
  * Build time speeds up again, as slower tests have dependencies replaced with mocks.
  * Uses code coverage to find hot spots---places where too many tests cover the same code.
  * Tests are either 3-line simple state tests, or longer mock-based tests that end with a mock.VerifyAll().
  * Use of most of the equality-style assertions (Assert.Contains, Assert.Equivalent, etc), as well as of the mock verify assertions.
  * Strongly OO design.
  * Tons of interfaces; a fair bit of inheritance.
  * SetUp and TearDown are commonly used to set up infrastructure (such as test doubles), but no longer to initialize the system under test.
  * Often writes their own test framework, mocking framework, DI tool, or some other "better way to do unit testing."

### Level 4: Knock on the Sky and Listen to the Sound!

A team fluent at this level is finally able to listen to what the tests are telling them about the design. Where above they could hear the tests talking, now they can hear what the tests are saying. Thus, the code and tests express multiple kinds of decomposition in multiple ways. They have method, class, and module cohesion. The degree and type of coupling matches the cohesion in the underlying domain. The distinction between test code and production code blurs; a fair amount of code is actually both. Testing now actually is a design activity; TDD stands for test-driven design.

**Focus**: "our testing teaches us about the domain and about the health of our design."

**Skills**:

  * Can write a true-unit test for any part of the system; testing produces fundamental changes in the code under test.
  * Name stuff well.
  * Use tests to express intent & to design how a thing should be used.
  * Listen to the testing process to receive design feedback. When received, refactor appropriately---which sometimes means not refactoring.
  * Use techniques from both OO and Functional paradigms to enable decoupling without violating encapsulation.
  * Use many different ways to attach program parts together, depending on the desired coupling level.

**Signs and portents**:

  * Can safely check in after every red-green-refactor cycle, every minute or two.
  * 1:1 relationship between test classes and system responsiblities. When this isn't a 1:1 mapping between test class and system class, treat that as design feedback (violation of SRP).
  * Sees the need for a mock as design feedback (system has too much coupling).
  * Sees the difficulty to name a test class as design feedback (lack of cohesion of responsibility).
  * Sees the need to do behavior testing as design feedback (typically a method that combines query with update).
  * Uses simulators, anti-corruption layers, bounded contexts, and other mechanisms to remove cross-boundary dependencies. Tests provide design feedback to identify when those are needed.
  * No remaining use for DI or mocking, so they tend not to get used.
  * Testing updaters becomes a combination of testing the simple updaters at the end of binding sequences, testing the state of bindings, and testing that the code results in the right events firing (or continuations, or whatever).
  * Tests use custom assertions & conditions. Often those condition objects are used by both test and production code.
  * Very little inheritance and few interfaces. Lots of composition. Often a fair amount of function dispatch (events, higher-order functions, fields with a function type, etc).
  * SetUp and TearDown are rarely used. The team eliminates duplicative initializations by eliminating initialization.
  * Throws away their custom "better way to do testing" tool, and usually most of their 3rd-party testing support libraries as well. The only tools they use regularly are a library of assertions, a way to indicate that something is a test, and two runners (command-line in build and in-IDE for dev).

So, in the end, there is a good use for mocks (& DI). The value in the third level is learning to write cohesive, loosely-coupled code. In order to use mocks, you have to achieve at least a minimal amount of cohesion (so that you have something to mock) and decoupling (so that you can put the mock in).

A lightweight mocking framework---one which is unable to mock out static methods and other tightly coupled constructs---can help a team learn to write decoupled code. They are not the only way to gain proficiency at level 3, but they are a way that provides direct feedback and guidance during the learning process.

Also, mocks allow a team to start learning to write maintainable tests without having to learn good design yet. It's a lot easier to learn these separately.

Mocks are weapons of mass destruction. They can be usefully applied to a code base in order to explode it into lots of testable bits. We should celebrate fluency at this level of proficiency. A team which is very comfortable with mocks can blow any system into little pieces extremely quickly. The functionality of each fragment is much…simpler, and thus a lot easier to test.

The team should be valued for their capabilities. They'll get a lot done. They'll be able to build things out of the rubble, then shift them to another purpose fairly quickly. They'll certainly move faster than a team that is trapped in a vine-infested legacy jungle.

Mocks aren't Evil. They're one of the most effective ways to turn a jungle of intertwined vines and obstructions into easy-to-test green glass.

So I invite you all to celebrate the mock. Wave your cowboy hat as you ride it all the way down. And then take what you've learned and find a way to accomplish your ends with a little less collateral damage.
