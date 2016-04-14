---
layout: post
title: Encrypted Meeting Recordings
published: true
date: 2016-04-13
permalink: post/encrypted-convos
---

So I recently got myself a USB voice recorder so that I could record some meetings. It's a neat
little device that passively records, and mounts as a USB storage device at the same time as
charging.

I didn't want to have to manually copy the recordings every time I plug it in to charge, so I
wanted to write a system to automatically move the files off the device. However, due to the nature
of the recordings I wanted to make sure that only I would be able to listen to them, which meant I
had to encrypt them with GPG.

The end-result is that I can use my brand new raspberry pi 3 running headless with a daemon that
waits until the device is plugged in, then moves the file to the computer, encrypts it using my GPG
public key, and then shreds the local unencrypted copy.

### Setting up the encryption key

I am assuming you already have a GPG key pair generated, if not there are
plenty of only GPG introductions (basically `gpg --gen-key`).

The basic steps are as follows:

1. Export your public key with `gpg --export -a "Your Name" > public.key`
1. Copy it to your your raspberry pi with `scp public.key user@pilocation`
1. Import it on your raspbeery pi `gpg --import public.key`

### Daemon

I chose to use `devmon` from the `udevil` package, which will automatically mount the drive and can
optionally run commands.

I started it as follows

```
devmon --exec-on-label RECORD /home/pi/encrypt_recorder.py
```

You can use a different way of identifying the device either with `--exec-on-device` or
`--exec-on-drive`. Check out `man devmon` for more info.

### Recorder Script

This is what runs once the drive has been mounted.

<script src="https://gist.github.com/pato/f6ffbf999447abf342d3ce138fd46ece.js"></script>

Place it on your home directory, or somewhere accessible (and change the daemon command accordingly)
and make sure you set the `encryptEmail`, `src`, and `dst` varibles correctly.

### Done!

Now whenever I plug in my USB recorder, the daemon will pick it up, mount it, and move the
recordings, encrypt them using my public GPG key, and shred the original file.
