---
id: 109
title: Easily Eliminate Most Mocks
date: 2012-07-15T08:16:30+00:00
author: Arlo
layout: post
guid: http://arlobelshee.com/?p=109
permalink: /easily-eliminate-most-mocks/
tt_tweeted:
  - http://twitter.com/arlobelshee/status/224524869080055809
tt_tweeted_date:
  - 2012-07-15 15:24:33
category: techies
tags:
  - design
  - example
  - no mocks
  - tdd
---
In [previous](http://arlobelshee.com/post/mock-free-example-part-2-simulators "Mock Free Example, part 2: Simulators") [discussions](http://arlobelshee.com/post/mock-free-example-part-3-fixing-untestable-code-sequences "Mock Free Example, Part 3: Fixing Untestable Code Sequences") about [mock-free](http://arlobelshee.com/essay/how-i-learned-to-stop-worrying-and-love-the-mock "How I Learned to Stop Worrying and Love the Mock") unit testing, I've shown techniques that I use to eliminate the hard-to-eliminate test doubles. I've skipped the simple techniques that I apply all the time. Time to fix that.

One technique eliminated about 90% of the test doubles in my code. It's simple. It's been around for a long time. Odds are you already do it but not frequently enough. It even has a name:

**Extract Method**.<!--more-->

Let's start by looking at a common example that is used to motivate unit testing with mocks. I made this one up, but it is similar to many that I've seen (made slightly more ugly, like a lot of code that I see in real projects).

```python
def send_build_analysis(build_result, smtp_service):
  msg = smtp_service.create_email(cc='wholeteam@example.com',
     from='buildbot@example.com')
  if build_result.succeeded:
    msg.subject = "Build %d succeess." % build_result.number
    body = SUCCESS_MESSAGE_BEGIN
  else:
    msg.subject = "Build %d failed: %s" % \
       (build_result.number, build_result.failure_summary)
    msg.to = ';'.join(build_result.committer_email_addresses)
    body = FAILURE_BEGIN_TEMPLATE % build_result
  msg.attachments += build_result.create_timings_chart()
  msg.attachments += build_result.static_code_health_analysis()
  msg.body = body \
     + (BUILD_BODY_INFO_TEMPLATE % build_result) \
     + MESSAGE_END
  smtp_service.send(msg)
	```

## How would you test this?

Easy: it's all set up for dependency injection. Just give it a spy `smtp_service`. Run the function and make sure that it called `service.send()`. Check that the parameter is the email we expect.

## But why coddle the poor design?

The fact that we have to test it with a mock is telling us something.

Or look at it another way: is the name of the function correct? I posit that a more accurate name would be `analyze_build_result_and_send_as_email()`. And this makes obvious the number one problem with the code as written.

It has multiple responsibilities.

## Let's fix that.

```python
def send_build_analysis(build_result, smtp_service):
  smtp_service.send(analyze_build(build_result, smtp_service))

def analyze_build(build_result, smtp_service):
  msg = smtp_service.create_email(cc='wholeteam@example.com',
     from='buildbot@example.com')
  if build_result.succeeded:
    msg.subject = "Build %d succeess." % build_result.number
    body = SUCCESS_MESSAGE_BEGIN
  else:
    msg.subject = "Build %d failed: %s" % \
       (build_result.number, build_result.failure_summary)
    msg.to = ';'.join(build_result.committer_email_addresses)
    body = FAILURE_BEGIN_TEMPLATE % build_result
  msg.attachments += build_result.create_timings_chart()
  msg.attachments += build_result.static_code_health_analysis()
  msg.body = body \
     + (BUILD_BODY_INFO_TEMPLATE % build_result) \
     + MESSAGE_END
  return msg
```

And how do I test this? Well, first of all I verify that `smtp_service.send()` is already tested somewhere. Given that, I don't feel a need to test the outer method (`send_build_analysis()`) at all. I'm bored before I write one test for it.

This simple refactoring changes a side effecting function with complex logic into a tiny function composition, a side-effecting logic that is write-only, and a pure, side-effect free function. Much easier to test. Easier to make the next refactoring (the big function has feature envy and primitive obsession, both of which could be addressed). Also easier to re-use or to extend later.

These are the kinds of trivial refactorings that I use most of the time to eliminate mocks. Sometimes I need the big guns. But often I just need to introduce a method that should have been there anyway.
