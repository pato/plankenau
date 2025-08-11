---
layout: post
title: Claude Coding an iOS App
published: true
date: 2025-08-11
permalink: post/claude-coding-an-ios-app
---

I have been using Claude Code quite a bit over the past 2 months, both for side
projects and at work, to varying degrees of success. I have used it for working
on large legacy code bases, small greenfield code bases, TUI apps, web apps,
MCP servers, just to name a few of the use cases. But a frontier I had not
explored is iOS app development.

## App Idea

<p align="center">
	<img src="https://plankenau.com/i/weight-analyzer-screenshot.png" height="400">
</p>

The app itself is nothing special, it is a simple weight visualizer. The idea
came to me when I found myself frustrated at the lack of features of the Apple
Health app for visualizing my health data. For example, I find it very limiting
that you can only view data in 1 day, 1 week, 1 month, 6 months, or 1 year
view. I was really interested in seeing long-term trends and changes in my
weight and found there was no way to do that with the default app.

Similarly, I wanted to know a few key statistics around the data, for example
the minimum, maximum, or average over a timespan, as well as the rate of change
per week. So rather than just complain, I took a shot at building it with Claude code.


## MCP integration

One of the take-aways from my previous adventures is to focus on closing the
feedback loop, i.e., claude code does best when it can process the result of
its changes in the most direct way possible. For a TUI that might be processing
the text output, but our only option for an iOS app is screenshots. I thought I
was going to have to first write an XCode MCP server for Claude Code, but
unsurprisingly, someone has already written one!

I opted to try [XcodeBuildMCP][xcode_mcp], which is [open
source][xcode_mcp_gh], and seemed to have lots of features, such as interacting
with the simulator (for example simulating gestures or clicks) as well as
taking and processing screenshots.

This MCP ended up critical to being able to be productive at all for the
development, so I highly recommend it.

[xcode_mcp]: https://www.xcodebuildmcp.com/
[xcode_mcp_gh]: https://github.com/cameroncooke/XcodeBuildMCP

## How did Claude do?

I started out by giving claude a high-level overview of what I wanted to be
able to get out of the app, how I wanted it to look, the design language I
wanted it to use, and the fact that I wanted it to be following all the latest
guidance and practices. As all my projects, I started out in plan mode to have
it do some reading and brainstorming over how to set it up. I also nudged to
read up online about best practices for SwiftUI development and HealthKit
integration.

Once I had a decent plan, I asked it to break it down into individual steps
making sure to compile and fix any issues along the way. And amazingly, the v0
was really good! For a few-shot prompting, I was impressed.

It was an overall positive experience. I think I must have spent
around 8 hours, to from first prompt, to having the app ready to submit for iOS
app review. And considering my experience with iOS app development is pretty
minimal, this is significantly faster than I would have taken to build it
artisanally.

That said, it was not without hiccups. There lots of challenges I encountered
with Claude working on this, some of which I hadn't experienced in other
domains.

### Laziness

I had lots of times that Claude Code would end up being lazy and say things
like "The real approach would be too complex, so I am going to do this
instead", often times the instead was some awful hack or terrible
hard-codedness. And of course he would never remember his own hacks, so I still
had to review almost all the code he would write.

My workflow is roughly one commit per cycle of asking Claude Code stuff, so at
least it is easy enough to review the deltas.

I often found myself having to be verbose in my instructions to get him to
"behave", for example prompts like:

```text
that is better, but it doesn't seem to work perfectly. i struggle to select
some of the data points and i still cannot click the edge ones. Can you
re-think this, analyze critically, and develop like a senior engineer would in
a principled way. Make sure to use your MPC tools to be diagnose and validate
your changes
```

Or having to constantly repeat myself (for things that were already in the
`CLAUDE.md` too):

```text
Can you always remember to rebuild the app in the simulator so I can test?
```


### Struggling to interact with the simulator

There were many times that Claude would spend multiple rounds of taking
screenshots, trying to click on things, and having it not work, rinse and
repeat. I understand there is inherent imprecision of trying to figure out
where to click from images, but I had explicitly given it instructions to use
the MCP server's tool for describing the UI, and yet he would often "forget".

This is also burns lots of tokens really fast, which also meant that I did
experience rate limits, despite being on the 100GBP/month plan.

This meant that I had to babysit it quite closely and often interrupt it's
testing, manually test, and then report back.

Another class of failures would be that it would mis-interpret screenshots,
thinking that things were working perfectly when they weren't or failing to
recognize that the simulator was showing a totally different view.

For example, here is a snippet where he confidently thought he fixed the graph
overlapping on top of the date labels despite it being clearly still broken.

![Image](https://plankenau.com/i/weight-analyzer-fail.png "failing to parse screenshot")

### Getting completely stuck in circles

I also had lots of times that he would struggle really hard at solving
problems. For example, I wanted to be able to support multi-finger gestures
like the Apple Stock app, so you can select two points and compute the
difference/growth between the two. But after like 20 minutes and many git
reverts, I had to give up because he was getting nowhere and butchering the
application along the way. This happened a few times when I had just drop the
entire feature idea. Having it explicitly search the web for examples didn't
seem to help and having it break it down step by step didn't either.

You can see my graveyard of Claude attempts in my git branches :)

![Image](https://plankenau.com/i/weight-analyzer-graveyard.png "git branch graveyard")

## Random tools I used to productionize the app

### Generting the app icon

Along the way I found myself in need of an icon for the app. And after many a
failed attempts at having Claude Code (or Claude Desktop) generate sensible SVG
icons, I gave up and instead asked Claude to do deep-research for ways to make
icons for free. And it found a really great resource for generating app icons
called [Icon.Kitchen][icon_kitchen]. 

<p align="center">
	<img src="https://plankenau.com/i/weight-analyzer-icon.png" height="80">
</p>

[icon_kitchen]: https://icon.kitchen

### Generating nice looking app store screenshots

After some Claude deep research I ended up on [AppScreens][app_screens], which
has a limited free tier, but for 20 GBP you can get very professional looking
screenshots, which for me was worth the trade.

[app_screens]: https://appscreens.com

![Image](https://plankenau.com/i/weight-analyzer-screenshots.png "professional screenshots")
