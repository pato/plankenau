---
layout: post
title: Installing Raspberry Pi OS Lite headless on MacoS
published: true
date: 2021-01-04
permalink: post/raspberry-pi-os-lite-headless-macos
---

So you got a shiny new Raspberry Pi and plan to use it headlessly for your next
project? Maybe you don't want to use (or have) a mini hdmi adapter plus a
keyboard and mouse like the olden days. Well you don't have to!

This is how to configure and install Raspberry Pi OS Lite (the desktop-less
version of Raspberry Pi OS) without ever needing to touch a monitor or
externally connected keyboard/mouse.

## Getting started

1. First we will need to download the [Raspberry Pi Imager][1] for your target
platform. In my case that was MacOS.

1. Second, we'll want to plug in your RPI's SD card using whatever adapter (or
fancy new M1 Pro/Max machine).

1. Now click the "Choose OS" -> "Raspberry Pi OS (other)" -> "Raspberry Pi Os Lite (32-bit)"

1. Select your storage

## Advanced Settings - aka magic sauce

Now comes the magic that was released in March 2021 with [version 1.6][2]. On
MacOS press `CMD+SHIFT+X` (on windows press `CTRL+ALT+X`). This opens the
"Advanced Settings".

Here I recommend you
* set hostname to something memorable and unique on your network
* enable ssh (you can enable password then later use `ssh-copy-id` or enable public-key auth here)
* configure your wifi (on my mac it attempted to get the password for my network from keychain, although it only succeeded in getting the SSID)
* configure locale to your timezone and language
* skip the first-run wizard (since we've configured all the aforementioned settings and will be headless anyways)

Now you can exit the advanced settings, and click on "Write"! You'll need to
wait for the writing and verifying to finish.

Now you can eject the SD card and put it into your RPI.

## Booting up and connecting

1. Connect your raspberry pi to power somewhere within reach of your wifi

1. Now you'll need to know the IP address it got assigned (you can get this either from your router/modem admin page, your ISP mobile app, or by doing a network-scan)

1. ssh into your rpi using either your configured password or ssh (don't forget to it add your to `~/.ssh/config`)

1. Voila !

[1]: https://www.raspberrypi.org/software/
[2]: https://www.raspberrypi.com/news/raspberry-pi-imager-update-to-v1-6/
