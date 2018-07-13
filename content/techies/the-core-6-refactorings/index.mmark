---
id: 243
title: The Core 6 Refactorings
date: 2016-05-02T11:11:47+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=243
permalink: /the-core-6-refactorings/
category: techies
---
Not all refactorings are created equal. Some get used a lot more than others. This is especially true with highly-indebted code. There's a reason for this. Sets of refactorings are commonly used together to solve classes of problems, and some problems are more common than others. If you are learning to refactor, learn your tool in sets.

The most important set to learn are the Core 6 Refactorings, plus 3 critical utility functions.

These 9 operations will allow you to do the most important part of working with indebted code: read by refactoring. Fluency in these 9 is all you need.

<!--more-->

## The Core 6

The Core 6 refactorings are:

  * Rename
  * Inline
  * Extract Method
  * Introduce Local Variable
  * Introduce Parameter
  * Introduce Field

These are the Core 6 because the most important thing we need to do when [reading indebted code is to name it](http://arlobelshee.com/good-naming-is-a-process-not-a-single-step/). We execute our core understanding loop: look at something, have an insight, write it down, check it in. The write it down step is always a transformation on names.

## CRUD for Names

The core 6 are simply CRUD for the domain of names.

  * Create: Introduce Local Variable, Extract Method, Introduce Parameter, Introduce Field.
  * Read: (performed by the human; no refactoring needed)
  * Update: Rename
  * Delete: Inline

In a typical refactoring IDE, Rename and Inline operate on anything which is namable, but there is a distinct Create operation per kind of thing you want to create.

In typical OO languages, there are 4 things* we can name: local variables, methods, parameters, fields. There are also classes, but those are different. I think of variables, methods, parameters, and fields as scalars. They are atomic, simple things. Classes are compositions; they compose scalars together.

Thus, the core 4 namable things define places where you can describe a single thing. Classes define places where you can describe the relationship between several things.

When reading indebted code, the first challenge is to understand each atomic thing. Thus we really need CRUD for names of scalars: the Core 6 Refactorings.

## + 3 Utilities

There are 3 other things that your computer should do for you. You should never have to do these things.

  * Format your code
  * Type basic language stuff / get things precisely right
  * Look up what refactorings you can use and their keystrokes

The IDE has commands for these too:

  * Code Cleanup / Format Document (used for structured, non-code files, such as XML or JSON)
  * AutoFix (later add Generate Code and Live Templates)
  * Refactor This

## Stop wasting time formatting (or arguing)

The first allows you to define your coding standard as a set of options, then check that in with your source. Run one command on a file or a whole solution and all of your code will meet your standard.

If your group decides to change the standard, update the coding standard options file and re-run the format over the entire solution, then check that in as one commit. Completely safe, and you can change an entire 10k file codebase to whatever coding standard you want in about 10 minutes.

Do this and coding standard will stop being a religious war.

At first, there will be a lot of reformat the world commits, as people make some change to the style and apply it. But each is safe and cheap. People who care about some aspect of the style will simply change that style. Everyone else can stay out of it.

And pretty quickly the conversation will terminate successfully. The team will have found a style that works for everyone. 100% of the code will be in that style. And the IDE will keep it that way. Religious war over. This usually happens inside of 3 days, at a total team cost of about 30 minutes per person.

From then on, whenever you edit a file, just run the Code Cleanup command on that file whenever you want / when you are done. You no longer need to format source code yourself. Ever.

Let me repeat that: if you find yourself typing indentation, newlines, space around parens, or anything else like that, you are wasting your time. Do something smarter. Let the computer handle the BS formatting tasks for you.

> If you find yourself typing indentation, newlines, space around parens, or anything else like that, you are wasting your time.

## Stop wasting time getting things right

Computers are good at guessing what you might have meant. Better yet, your IDE will give several good guesses and let you choose which one you meant. This means you don't have to get everything right. Just close enough.

Auto-Fix is your friend. Here are some things you can do with it.

  * Never write a variable declaration. Just write the expression (the thing on the right side of the initial assignment) and the auto-fix to have the IDE write the rest of the line.
  * Never write a method declaration. Just call it where you mean to (perhaps from a test) and then auto-fix to create it.
  * Never remember what namespace / import something is in. Just use it, then auto-fix to get the imports.
  * Never worry about what namespace your class should be in. Just move the file to the right folder, then auto-fix to correct the namespace declaration.
  * Never write a new class. Just instantiate it with a call to new, then auto-fix to create the variable, then auto-fix to create the class, then auto-fix to move it to its own file, then drag that file to the right project, then auto-fix to update the namespaces.

A computer's job is to get things precisely correct. Your job is to figure out what to do and convey your intent expressively. You are not a computer. Don't do its job for it.

## Learning refactorings

It takes humans time to memorize things. The computer already knows them. So use its memory to train yours.

If you want to make some change to your code, but don't know how to do that without editing the code, then ask the IDE. Put your cursor in the thing you want to change, and choose Refactor This.

Refactor This shows you all the ways your IDE could transform the code around the insertion point. It also shows you the shortcut keys to do each transformation.

Use the menu to find the thing you want, then close it and use the keystroke to activate that thing. Train your muscle memory to use that keystroke. Pretty quickly you will have memorized all the keystrokes for the things you do often and have found many other things that you can do when you need them.

## What if I don't have an IDE?

If you use an editor instead of an IDE, then you are actively making the choice to waste time. Your editor may manipulate text better than an IDE. It may start up faster. But it can't manipulate code as quickly as an IDE.

And you can fix the startup time by simply leaving your IDE open, or opening it before you grab your coffee / go to standup.

More importantly than wasting time, using an editor forces you to do things that human brains are bad at: precision and details. When you edit code directly, you have to get every detail precisely correct. You have to remember and focus on all those details. Which leaves you very little brain for focusing on intent.

Automated refactorings allow you to transform code in known-safe ways, without depending on your precision to get everything right or your detail-brain to have written unit tests for every important case. With tools, tests are unnecessary for refactoring.

Auto-fix and Cleanup Code allow you to ignore language syntax and human readability details. Express your intent to the machine, then let it handle the details.

And if someone tries to tell you that you aren't a good programmer because you can only write your language with your language's tools, remind them that you are a great programmer. So good that you don't try to be a computer. You use your computer to be a computer. You know, like a programmer does.

## Summary

Great programmers use their tools. Some aspects of those tools are more important than others. Attain fluency with those and you will accomplish awesome things with little effort. Start with the Core 6 Refactorings + 3 handy utility operations.

_Do you want to learn to pay technical debt in a way that reduces your development cost in the short term? Learn to [Read by Refactoring in the Legacy Code Workshop](https://www.industriallogic.com/onsite-workshops/legacy-code/) that I and my co-workers host for companies around the world._
