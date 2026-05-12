---
layout: post
title: Cracking the Revolut UK Savings Accounts Tiers and Costs
published: true
date: 2026-05-12
permalink: post/revolut-uk-savings-account-solved
---

<p style="text-align:center"><a href="https://plankenau.com/revolut.html"><img src="https://plankenau.com/i/revolut_uk_comparator.png" height="400"></a></p>

Now that Revolut got their [UK banking license][1], I wanted to see if it would
make sense to use them for the purposes of opening a savings account. They have
fairly competitive rates and the fact that they pay out interest daily is quite
a nice flexibility for shorter term holdings (most banks pay interest only
every month or even months and sometimes you will not accrue any if you take it
out before the full period).

One interesting factor to consider is that revolut has a tiered interest rate,
which depends on which Revolut plan you pay for. For those unfamiliar, the
Revolut tiers give you access to nicer cards (stainless stell or even platinum
coated), reduce costs (e.g., forex on weekdsn, and reducing/removing foreign
transfer fees), and a multitude of 3rd party deals (e.g., NordVPN, ClassPass,
WeWork, etc..).

To me that meant that this is an obvious optimization case, where I wanted to
compute which amounts you would need to have in your savings account to both
break even, and to justify paying for the next tier up.

I wanted to approach this purely from the perspective of the savings account,
so to simplify the solution I treat the value of everything else the Revolut
plans as 0.

Solving it is as simple as calculating the daily accumulating interest rate,
and comparing the expected returns (minus the effective tax rate) versus the
Revolut plan costs.

My first solution was a hand-written Rust implementation (because I still love
Rust) that prints a nice ascii table.

But I realized I knew a few people that might be interested in the break even
points, so I used OpenCode + GLM 5.5 (my current agentic harness for personal
projects, after I recently cancelled my Anthropic subscription), and told it to
make me a single HTML file version with graphs and inputs to help people figure
out which plan makes the most sense for everyone.

Disclaimer that the interest rates and tax rates are only correct as of the
current time of writing, and this is not financial advice.

You can check out the tool and figure out for yourself here [Revolut UK Savings
Plan Comparator][2].

[1]: https://www.revolut.com/news/revolut_receives_uk_banking_licence/
[2]: https://plankenau.com/revolut.html
