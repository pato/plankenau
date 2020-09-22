---
layout: post
title: Defining a cargo git dependency against enterprise github
published: true
date: 2020-09-22
permalink: post/rust-cargo-dependency-against-enterprise-github
---

# Defining a git dependency

Defining a git dependency via your `Cargo.toml` is ridiculously simple and powerful.
It's as simple as

```
[dependencies]
rand = { git = "https://github.com/rust-lang-nursery/rand" }
```

And if you want a specific branch

```
[dependencies]
rand = { git = "https://github.com/rust-lang-nursery/rand", branch = "next" }
```

# What if it's not on public github

Maybe you have an enterprise (on-site or otherwise) alternative to github.com,
and want to specify a dependency. And perhaps this service has a non-standard
authentication method. I found myself in such a situation... For the sake of
examples we'll imagine I wanted to add a dependency at
`https://customhub.com/rust-lang-nursery/rand`.

### Solution 1: git submodule

My first attempt at the solution was to add a git submodule to my repository
containing the dependency that I wanted to add.

```
git submodule add https://customhub.com/rust-lang-nursery/rand
```

Then in your `Cargo.toml`

```
[dependencies]
rand = { path = "./rand" }
```

This works, but it feels wrong. And git submodules are a bit of a pain (you
have to manually synchronize them, you end up tracking your dependency's code,
and have to ignore it from linting and/or code coverage reports.

If you find yourself wanting to remove a submodule, for example `rand`, you can
do so as follows:

```
git submodule deinit -f rand
rm -rf .git/modules/rand
git rm -f rand
```

### Solution 2: using SSH client to fetch

Assuming we ourselves are able to authenticate to our repository, we can have
cargo use the local `git` command to fetch, which will go through our normal
`ssh` configurations and setup.

If the project's git url is as follows:

```
git@customhub.com:rust-lang-nursery/rand.git
```

We will want to specify our dependency in `Cargo.toml` as

```
[dependencies]
rand = { git = "ssh://git@customhub.com/rust-lang-rusery/rand.git", branch = "desired_branch" }
```

Note the protocol prefix `ssh://` and the fact that instead of `:` to define
the location, we are using the url separator `/`. The error messages are not
friendly when misconstructing the URL

Note that you might also need to set the environment variable
`CARGO_NET_GIT_FETCH_WITH_CLI=true` (either in the command, or in your session)

Alternatively you can also set it in `~/cargo/config`

```
[net]
git-fetch-with-cli = true
```

You can read the cargo docs for this setting
[here](https://doc.rust-lang.org/cargo/reference/config.html#netgit-fetch-with-cli)
