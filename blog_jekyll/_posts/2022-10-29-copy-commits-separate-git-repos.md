---
layout: post
title: How to copy Git commits from one repo to another unrelated repo
published: true
date: 2022-10-29
permalink: post/copy-commits-separate-git-repos
---

I recently ran into a problem involving two separate git repositories: main
repo A and an exploratory repo B. After getting something to work in the
exploratory repo I wanted to copy the commits from B into A, so that I could
preserve the commit history (and associated metadata).

I had two problems:

- Repo A has a different directory structure than repo B
- Repo B was a brand new repo and shares no history with Repo A

So if you (or me at a later point) want to accomplish the aforementioned task
then let's go!

## Exporting the commits from repo B as patches

First let's navigate to repo B

```bash
cd REPO_B
```

Then assuming we can use `/tmp/patches/` to store our patch files.

```bash
git format-patch -o /temp/patches --root
```

Note that we are specifying the target directory via `-o /temp./patches` as
well as telling git to copy all commits starting from the initial commit via
`--root`

You'll see an output with each commit as a `.patch` file.

If you wanted to export just a range of commits rather than the entire history you can use

```bash
git format-patch -o /temp/patches --root START_COMMIT..LAST_COMMIT
```

## Applying the commits to Repo A

Now let's navigate to repo A

```bash
cd REPO_A
```

Now it's important that you are on the branch wherein you wish to apply the
commits (could be your `main` branch or a feature branch).

Now for the "trick" given the different directory structure, say that you
wanted to apply all the commits from repo B into a subdirectory in your repo A
such as `scripts/tools/my_awesome_tool/` you would perform

```bash
git am --directory='scripts/tools/my_awesome_tool' --3way /temp/patches/*.patch
```

If your directory structure is identical between repo A and repo B, then you would simply perform

```bash
git am --3way /temp/patches/*.patch
```

That's it really! Git can be quite nice when it works huh?
