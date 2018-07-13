---
id: 49
title: Testing Well-Written ASP.Net Pages
date: 2011-07-04T13:50:18+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=49
permalink: /testing-well-written-asp-net-pages/
category: techies
tags:
  - approval test
  - ASP.Net
---
Llewellyn Falco recently posted on [testing ASP.Net pages with Approval tests](http://blog.approvaltests.com/2011/07/testing-aspnet-pages.html "Approval Testing Bog"). His post talks about how to test the ugly pages out there: the ones that ignore all the MS guidance and just define everything in a big, ugly, page Load handler. I'm not sure what I'd recommend for testing well-written ASP.Net page view & templating. Perhaps something like the following?<!--more-->

Starting assumptions:

  * The site is mostly defined in user controls. These controls are fully aware of your model, and encapsulate one way of interacting with it. They expose an API to allow their holder to control presentation, but not an API to allow their holder to see what the user is doing.
  * There's a rich master-page hierarchy that extracts top-level layout similarity.
  * The only thing that pages do is to include the right controls in the right places, initialize them with the right values, and bind events from one to another. There's a very occasional exception, where a page includes some system control (such as a button), and binds its events up to model actions.
  * The pages all use the full ASP.Net 2.0 page lifecycle, which means that almost nothing ends up in PageLoad.
  * Each control has a view model, which performs all of the logic. This is persisted into the ViewState. Control event handlers consist of only delegations to methods on the view model (no logic).
  * Our objective is just to test the display & templating. We've already got tests for the view models & the model.
  * There's some legitimate reason we're not just using ASP.Net MVC (I'm including this assumption so that I don't get a bunch of "just upgrade to the better system" comments).

First, I'd make each control expose a uniform TestSupport interface. It consists of one function: `DisplayPresentationValuesOnly()`. When called, this function changes the control completely. It eliminates its entire render, and just outputs a single div, which looks like `<div name="ControlNameHere"><span name="PropertyName">the value goes here</span>...</div>`.

The top-level page test notices when it is in test mode. If it is, then in Init (not Load), it calls `DisplayPresentationValuesOnly()` on all of its controls. It also calls it on the master page. The master page version of this function forwards the call to all of its controls. Any non-encapsulating controls remain on the page, but any encapsulating ones are replaced by their input values.

Now your approval tests can test the controls and their pages completely independently. For the pages, you just need to hit whatever cases will cause the controls to have different presentation properties (typically, not many---usually most of those exist to alter the look between pages that share controls, or to define where to look up data).

You probably want to make a driver page for each control to allow thorough view testing of that control. Each such page has no master, includes nothing but the one control, and exposes methods to allow you to set the control into different presentation states. It'd be implemented a lot like your current test proposal. It would not call `DisplayPresentationValuesOnly()` on its control, so you'd see full control renders.

Now, all that's left to test are the event bindings (the few on the page & the many on the controls). I'm not sure exactly how I'd do this, but my goal would be to substitute out the view model for one that just traces event calls, and then render that sequence of calls. Then find a way to properly trigger postbacks, preferably without doing a lot of round-trips. For each, you call one event, and make sure that the right methods are called on the back-end.

Another option is to split view state saving from page event processing. We did this on one project. It allowed us to verify view state, which means that we'd verified that postbacks would restore state to exactly what it had been before PreRender. Then, we could multiplex multiple postback cycles into a single request. This could be used for view testing, although we didn't.

The test fixture setup would make an initial request to get an initial page state. Then each test method would postback from that initial state with a whole sequence of events. The test driver method would take a sequence of events, and loop over them, calling them interleaved with calls to `PreRenderComplete` (if the control has cleanup code). This would allow a single request per test, even if it is doing a series of UI events to check out a workflow.

Combine this with the view model replacement, and you get a single request that just gives a trace of the calls to the view model. Then acceptance test these call sequences on the view model and you're done.

Again, this is an un-tested idea. On my ASP.Net teams, we just pulled all the logic out of the render then didn't test the views. We tested the logic and called it a day. But this is how I'd go about testing the view / display if I wanted to. Partially it maintains granularity. Mostly it's to maintain the 1:1 relationship between test and potential failure.
