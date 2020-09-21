---
layout: post
title: Taking control of your email address
published: true
date: 2020-09-21
permalink: post/taking-control-of-your-email
---

For the past couple of years I have been trying to de-Google-ify my life, in
other words, remove my dependency on Google for providing services. Mostly due
to privacy and business practice concerns (80%), 15% to see if it's possible
and what alternatives there are, and perhaps even a 5% of being different than
others.

The last major pillar that Google was still supporting with me was Gmail.
Probably the oldest and hardest of their products to switch away from. Tough because
Google owns everything

1. Your "name" i.e., your email address
2. Your existing data
3. Your future data (emails you will receive)
4. The service you use to send emails

You can easily create a new email account at any provider (or even Gmail again)
but disseminating that information to the people that matter is a very tough
task. Although switching has the added benefit of letting go of the
people/newsletters/ad agencies that had it against your desire.

I figured if I was going to switch away from Google, I wanted to have something
better than another 3rd party email address tied to just another service.

## Custom domain

Effectively what I wanted was control of my digital name (email address) as
well as forward control of emails I would receive. I achieved this using a
custom domain, not tied (at least insofar as the email address) to an existing
service; I do not want to be a digital advertisement. Plus I want to have the
ability to migrate my backend provider without having to go through a whole
transition period again of having to disseminate my email address. A custom domain
allows me to transparently change how I send/receive email.

### Domain registrars

I have registered many, many domains by now, through many various registrars
over the years. The two that have made me the happiest and I am willing to give
my patronage to are: [namecheap](https://www.namecheap.com) and
[name.com](https://www.name.com). For this time, I decided to go with namecheap
and registered `lankenau.io` which has the advantage of being first-name
agnostic, which means I can provide email addresses to my family!

Once I had a domain, I had to figure out how to send/receive emails

## Sending and receiving emails

You basically have two options: host your own email server, pay someone to use
theirs. The former *can be* the more secure and private (assuming you find
private way to secure a server, whether in person or VPS), but has plenty of
added complexity in terms of managing and keeping secure, not to mention that
major email services (*cough cough gmail*) have really strict spam detection
that harshly treats low-traffic personal mail servers.

The three options that I considered were

1. [Lavabit](https://lavabit.com)
  - $30/year, 5GiB of storage, end-to-end encryption
2. [ProtonMail](https://protonmail.com)
  - $48/year, 5GiB of storage, 1000 emails/day, custom domains, 5 email aliases
3. [FastMail](https://www.fastmail.com)
  - $60/year, 30GiB of storage, custom domains, unlimited aliases

Ultimate I decided go with FastMail because:

* I could migrate not just my email, but also my contacts, calendars, and notes. 
* Supports 2FA and logging in with cert installation (instead of app passwords)
* Supports my custom domain
* Has plenty of storage

## Configurable routing

One of FastMail's most attractive features to me was their routing
customization.  Basically, I can configure my email so that I can create
infinitely many addresses that will all deliver to my mailbox. That means that
I can create unique addresses per use (for example, while signing up for a
service, or for forms that require an email). This is the equivalent of what I
used to do with Gmail by doing something like
`your_email+random_tag@gmail.com`. Except that now it would be
`random_tag@your_email.com`. Much cleaner, and way less likely to be
automatically scraped off. 

![image](https://plankenau.com/i/mail_routing.png "mail routing configuration")

This also means that if any one of the email aliases gets leaked to some ad
company or annoying publisher, you can blacklist that one particular address
and never receive an email there again!

## Emails for the family

I was also able to set up email accounts for my family members, so they too can
take control of their digital life. None of them were interested in having a
new separate inbox, so for them I set up simple email forwarding, so they can
receive from and send to their new email address, but continue use their
existing provider.

## Final word

It has been some 16 months since I started the switch, and I could not be
happier. Now I have all my calendars, contacts, notes, and most of my new
emails going to my new provider. I still have to have my old gmail account on
my phone and computer in case of old emails, but it is becoming less and less
common. 

There was only one time I was unhappy with the transition which is when
FastMail had an outage with downtime which rendered me unable to send an email.
As a software engineer myself, I know these things happen, so I was more happy
with the transparency and time to fix it, than mad that it happened.

There was also one interesting side-effect from my switch, is that now I know
who leaks my emails! When I get publicity emails to the custom email I made for
just Amazon AWS... I know exactly who did it. *Shame on you amazon*.

If you decide to go down this route, be prepared for some funny stares and
interesting questions whenever people as you for your email in person (e.g., at
stores) and you give them a specifically tailored email. Also it goes without
saying that this setup benefits the most from a good password manager to keep
track of all your custom emails.
