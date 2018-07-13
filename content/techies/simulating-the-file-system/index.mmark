---
id: 51
title: Simulating the File System
date: 2011-07-07T07:07:08+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=51
permalink: /simulating-the-file-system/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/88973304848850945
tt_tweeted_date:
  - 2011-07-07 14:11:03
category: techies
tags:
  - design
  - Simulator
  - tdd
---
I recently posted an entry about [replacing mocks with Simulators](http://arlobelshee.com/post/mock-free-example-part-2-simulators "Mock Free Example, part 2: Simulators"). That one used a Simulator from my running example code. Here's another example, which may make the concept more clear.

This is a file system simulator. I'm building it out as a generic simulator, re-usable across projects. Right now, I'm using it<!--more--> in my Ars Magica character editor (yes, most of my sample code is for RPG support tools. That and my language make up the majority of my non-work code).

The code is on gitHub. It consists of a solution with several projects. For now, I want to look at the [SimulatableApi](https://github.com/arlobelshee/ArsEditorExample/tree/master/SimulatableApi "The project tree.") project. The starting point is the [`FileSystem`](https://github.com/arlobelshee/ArsEditorExample/blob/master/SimulatableApi/FileSystem.cs "Source code file") class.

### What is this?

This class represents a transactional view on a file system. Actually, it represents a transactional view on an arbitrary storage medium, and this is where the Simulator comes in.

There are three ways to get a `FileSystem`. The first two, `FileSystem.Real()` and `FileSystem.Simulated()`, return a new view wrapped around some storage. The last, `FileSystem.Clone()` creates a view from another view. They share the same underlying storage, but each have their own change tracking and undo facilities.

The first thing to notice from just the above is that this is not your typical files & directories API. There is a single instance that represents the entire file system; file & directory objects are bound to a file system, and all the instances related to a single file system share consistent state.

### Views? Transactions? WTF?

Also there's all this stuff about FS views, transactions, change tracking, and undo. What's up with that?

Well, like most Simulators, the "real" and the "simulated" APIs develop together. The simulated API influences the design of the real just as much as the real influences the simulated. And both need to behave identically in all cases, especially including tests.

Since the simulated FS will keep everything in memory, new simulated file systems won't share any of the changes from the old. I want identical behavior for the real file system, unless it decides to leave the area of common assumptions with the simulated one. So, I implemented implicit rollback & explicit commit semantics for the real file system. If you use a real file system in a test and throw an exception before committing the changes, then all the changes will be rolled back from the underlying disk.

This also means that the methods for my file system have to be higher-level than the bare OS ones. So my API ends up including just `Directory.Create()`, `Directory.Delete()`, `File.ReadAllText()`, and `File.Overwrite()`. All of these are easy to do transactionally, regardless of backing store (memory or disk). This also turns out to be a very convenient API, assuming that I can afford to keep the entire file contents in memory, and don't want to immediately hand it to an XmlDocument or the like. If those assumptions change, I'll extend the API.

### Where's the Simulator pattern here?

In actuality, the [simulator](https://github.com/arlobelshee/ArsEditorExample/blob/master/SimulatableApi/_FsDiskSimulated.cs "Source code file") is simulating just the storage, not the whole API. It meets the pattern: it is a completely valid implementation of the [real object](https://github.com/arlobelshee/ArsEditorExample/blob/master/SimulatableApi/_FsDiskReal.cs "Source code file"), as restricted to the domain of certain simplifying assumptions. In this case, we're simulating the case where the file system always starts out with an empty directory as the contents of each drive, and a drive mounted at each possible drive letter.

By this assumption, we don't need to maintain state between file system instantiations, except via Clone. Since there's no other way into the backing store (the API is a closed system), we can implement the simulated API entirely in memory.

### How do we know the Simulator is equivalent?

The final piece to which I wish to call attention is the tests. The most important thing for a simulator is that it behave exactly the same as the real implementation, as long as it is used within the domain of its restrictions. Thus, [the test](https://github.com/arlobelshee/ArsEditorExample/blob/master/SimulatableApi.Tests/FileSystemCanLocateFilesAndDirs.cs "Source code file") runs exactly the same set of tests over the two implementations. If we discover a difference (aka, a bug in the simulator), then we add the test case. We modify the test until it passes with the real implementation, then modify the simulated implementation until it passes the test. We do the same thing when we add new functionality: TDD it on the real system, then modify the simulator as needed to also pass.

[Aside: these tests are pretty unhealthy. Each test isn't too bad, but they're all acceptance tests, and they're all in one class. This is convenient for some things, but is starting to make tests hard to find. It's also reducing design feedback around SRP. So I'll likely refactor the test class soon.]

This is, again, a partially-completed Simulator. However, hopefully it makes the concepts clear, and you can see how you would complete it out for your own projects.
