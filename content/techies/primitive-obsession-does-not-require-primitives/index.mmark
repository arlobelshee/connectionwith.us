---
id: 11
title: Primitive Obsession Does Not Require Primitives
date: 2011-03-06T10:09:07+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=11
permalink: /primitive-obsession-does-not-require-primitives/
category: techies
tags:
  - design
  - primitive obsession
---
Primitive obsession is a problem because it results in duplicate code, poor cohesion, and poor coupling. What should be well-defined operations on some value become littered through the codebase and inextricably linked with other operations. Although this is commonly the result of using built-in language primitives where a more domain-related type would do, that's not the only way to get there.

If you've got an object (class or struct, yours or from a library) with any of the following characteristics, you probably have a primitive obsesssion problem:<!--more-->

  * It's passed around just about everywhere.
  * It has several public accessors (aka, non-encapsulated fields in disguise).
  * There are two or more lines of code that manipulate it and appear frequently together (whether adjacent or not).
  * It supports many infix operators.
  * Different instances of the same type have different meaning; they would not be substitutable for each other.

A good way to find these obsessions is to run a code-coverage tool over your unit test suite. Ignore % coverage; that's useless. Pay attention to hot spots: functions that are called as a result of many tests. Those are probably members of primitives that should be fixed.
