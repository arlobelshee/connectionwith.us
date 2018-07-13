---
id: 47
title: "Mock Free Example, part 2: Simulators"
date: 2011-07-05T06:59:52+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=47
permalink: /mock-free-example-part-2-simulators/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/88245878539825152
tt_tweeted_date:
  - 2011-07-05 14:00:31
category: techies
tags:
  - design
  - example
  - no mocks
  - Simulator
---
One of the common uses for mocks is to replace expensive or stateful components, such as file systems, networks, GUIs, and databases.

However, I also see a cluster of other problems that arise at interfaces with these types of components, especially when they are system-level services:

  * Primitive obsession. Rarely are these APIs written as methods on an abstract object that return other abstractions. Instead, people pass around a lot of strings & things, which become arguments for static methods.
  * State. Partly because there isn't a place to put it, state tracking becomes a mess. For example, you want to ask a web service for something. Are you logged in? Do you have to do something if you aren't?
  * Lack of encapsulation. Those static methods end up everywhere. And often they end up with duplicate patterns everywhere (e.g., check for login before each call).
  * The API does not feel natural to the application. It doesn't follow the project's idioms, and doesn't just flow into place.

For this reason, I use an entirely different sort of test double: a system simulator. And often these simulators stop being test doubles<!--more--> as the project proceeds.

In the sample project that I'm using for this series, there's one simulator. It wraps the entire WotcOnlineDataRepository. Like many of my simulators, it applies some pattern as a facade for a large chunk of code. Also like many of my simulators, it uses a bunch of the real code in its implementation.

The entry point is [ServiceFactory](https://github.com/arlobelshee/PrintChar/blob/master/WotcOnlineDataRepository/ServiceFactory.cs "Source file"). The real implementation uses [Dnd4eRepository](https://github.com/arlobelshee/PrintChar/blob/master/WotcOnlineDataRepository/Dnd4ERepository.cs "Source file"), and the simulator is [Fake4eRepository](https://github.com/arlobelshee/PrintChar/blob/master/WotcOnlineDataRepository/Fake4ERepository.cs "Source file"). Of course, these classes don't do much. They log in as needed (the fake doesn't need to, but can fake a login error), then the delegate to their various raw service implementations. The only real work they do is to de-multiplex a call for a set of information into parallel asynchronous web service calls, then multiplex the results back into a single response (lines 28 & 29).

[As an aside, I don't like the way that login is handled here, nor do I like how failure is simulated. I have a better idea, which will likely show up in my discussions of async. But the basic idea is to take advantage of the fact that async code doesn't even need to start running when it is called. The contract is only to eventually either return a value or an error. This means that we can return from init immediately, and start accepting calls to fetch data. Eventually, login will fail or complete, and we'll return that error. But we'll keep the other requests around unless they are explicitly cancelled by the application. They needn't fail, nor should the app need to wait for login to complete just to send them. Logging in and asking for data should be completely independent, and can be with an asynchronous API.]

The interesting thing is that each implementation is a completely valid interpretation of the purpose for the whole library, except that the simulator makes some simplifying assumption. In this case, the simulator behaves exactly like the real one would if the remote web service only had information on 3 powers. For all other requests, it gives the same errors as would the real service when it was asked for a power that does not exist. And it can trigger all the other error conditions (login failure) that the real service would. However, because of its assumptions, it can run in memory.

The simulator is a test double. It's an oracle for the real service with much better characteristics for testing (performance, lack of remote dependency, and no variability in responses).

Most importantly, the simulator and simulatable API were built together. Each influenced the design of the other. This led to encapsulating a bunch of work (such as the multiplexing) inside the library, and made a clean, simple interface. Now the rest of the system only needs to use this simulatable API in a small number of places, the API encapsulates its state, and it's generally a lot easier to refactor around.

Also, this sort of simulator won't necessarily always remain a test double. It's whole point is to be a completely valid implementation with superior characteristics but that only works in a limited domain. Often, a portion of the application will be running entirely in that domain. At that point, it can make a lot of sense to use the simulator as the real dependency for those portions of the application.

For example, I had a project where we built a repository simulator for our ORM+database. It just kept all the values in memory, in a set of hash tables. And it kept the objects, not the tables of primitives.

We found several cases where we wanted to operate on nearly the same objects over and over. We would get superior performance from a read-through, delayed-write cache. For example, all of the postbacks for a given page tended to operate on the same objects over and over. And it mostly read from them.

We implemented the read-through caching repository as simply containing two repositories: our in-memory simulator, and the "real" repository. It then did the obvious (and simple) shuffle of data between these two implementations, and knew how to serialize an in-memory simulator's state into View State for postbacks.

Now, we had 3 versions of the simulatable interface. One used the backing store and handled persistence. One was in-memory without a backing store. It was great for testing. And one combined the other two in order to improve multi-read performance. So is the in-memory implementation a test double?

That's the real distinction between a simulator and a simple test double. Both are valid implementations over a reduced domain. However, the simulator's domain is orthogonal to its use in tests; it is valid over some subset of the business domain. And so it often (about 50/50 in my projects) ends up being used to directly deliver business value.

I have, at various times, developed simulators for: the file system, a generic persistent store encapsulated as a repository, time & threads of execution, a set of remote machines providing some services, permission-based security & identity, and the user. Many of these would be reusable in other projects, except that they were all created for my various employers. I'd certainly be interested in developing a set of OSS simulator libraries ready to drop into peoples' projects. If you're interested, raise a hand in the comments.
