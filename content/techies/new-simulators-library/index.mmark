---
id: 66
title: New Simulators Library
date: 2012-05-03T07:45:31+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=66
permalink: /new-simulators-library/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/198060832104529923
tt_tweeted_date:
  - 2012-05-03 14:45:56
category: techies
tags:
  - Agile
  - file system
  - no mocks
  - Simulator
  - tdd
---
I just published an early relese of my [Simulated.FileSystem](http://arlobelshee.github.com/SimulatableApi/) library. This library makes it easier to separate platform concerns out of my models. It works really well with a [hexagonal architecture](http://alistair.cockburn.us/Hexagonal+architecture).

This library will define a set of ports for common external dependencies, with multiple adapters for each port. The initial release just includes a file system port, with two adapters: native file system and in-memory file system.<!--more-->

The library includes a set of platform tests that ensure that the two implementations behave identically. This allows me to safely use the in-memory file system with my project during all testing and know that it will behave correctly with the real file system.

Previously, I've re-created custom ports for each application. Over time, I've found common abstractions that work well on a variety of my projects. This file system API (which is not typical) is one such.

Future versions of this library will extend the sets of ports and adapters. I have a pretty good port APIs for structured stores (databases and their like), the internet, time, and third-party web services.

Also, this initial release is .Net only. That's the platfform I currently program on most. I'd love to see implementations of the same (or very similar) ports in other languages.

Please let me know if you find this library useful and if you want more ports. I need feedback in order to know whether I should spend my time here or on other projects (such as writing blog posts on culture).

And if you've got an idea for a different project that you'd like to see me do, feel free to ask.
