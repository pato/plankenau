---
layout: post
title: Making your Android silence itself while you have class
published: true
date: 2014-09-07
permalink: post/class-silencer
---
College started again, which means keeping track of classes, homework, examinations, and projects. There's a lot of stuff to deal with, and having to constantly silence my phone for class, and unsilence afterwards, is something repeatable that should be automated.

What I Want
---------------

I want my phone to "know" when I have class, silence itself during class, and then place itself back to full volume afterwards.

How I did it
------------------

Once I had all my classes on Google Calendar, I set their descriptions to 'class'. Then I set up a tasker context for calendar entries, and
if they contained the keyword in the description, then set my phone's ringer to vibrate and the media volume to 0. Then once the event is
finished, restore both volumes.

Requirements
--------------

In order to build this, we are going to need two apps

*Tasker*

An awesome app that can be used to create basic "scripts" (essentially if this then that) to automate tasks on your phone.
It's a paid app on [Google Play](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en) but you can download
a 7 day trial from their [website](http://tasker.dinglisch.net/download.html). I am not one for purchasing mobile apps, but this one I definitely recommend.

*Google Calendar*

I use Google Calendar to keep track of classes, meetings, and events. Tasker will be able to "know" when I have class based on my calendar

Setting up Tasker
----------------------

As I mentioned earlier, Tasker is based around the idea of simple if this then that programming. The first thing we need to do is set up a profile (the this).

1. In the profiles tab, press the + button to add a new context.
1. Select State -> App -> Calendar Entry
1. Enter 'class' (or any other keyword as the description
1. Hit back


<img src="http://plankenau.com/i/bz36ST.png" alt="state" style="max-height:450px;">


Now we need to add the task to be run

1. Add New Task, name it something like Silence Phone
1. Press the + button to add a new action
1. Select Audio -> Silent Mode
1. Set it to either Vibrate (phone will not ring, but vibrate) or On (no notifications at all)
1. Press the + button to add a new action
1. Select Audio -> Media Volume
1. Set it to 0
1. Hit back


<img src="http://plankenau.com/i/nq14FN.png" alt="state" style="max-height:450px;">


Now we need to add an exit task to restore your volumes

1. Click on the existing context's task, and select Add Exit Task
1. Name it something like restore volume
1. Select Audio -> Silent Mode
1. Set it to off
1. Press the + button to add a new action
1. Select Audio -> Media Volume
1. Set it to 10
1. Hit back

Your profiles tab should now look this this


<img src="http://plankenau.com/i/how9AM.png" alt="state" style="max-height:450px;">


Setting up Google Calendar
----------------------------------

Now in order for the context to be triggered, we need to have calendar entries with 'class' (or whatever keyword you used) in their description.

This obviously requires you to have your schedule on Google Calendar. For UT students, I highly recommend [UT Utilities](https://play.google.com/store/apps/details?id=com.nasageek.utexasutilities&hl=en) which can export your schedule to Google Calendar. Otherwise, you can manually create your schedule using repeated events.

Whether you are creating or editing your events, make sure the description matches the keyword exactly.

In my case it looks like this:

![calendar][]

That's It
-----------

And we're done! Now your context will be triggered whenever you have class and your phone will go to silence mode. Then when your class finishes, the volumes will be restored! No more worrying about having your phone ring during class or forgetting to turn on sound afterwards!




[state]: http://plankenau.com/i/bz36ST.png
[task]: http://plankenau.com/i/nq14FN.png
[finished]: http://plankenau.com/i/how9AM.png
[calendar]: http://plankenau.com/i/cl8FSU.png

