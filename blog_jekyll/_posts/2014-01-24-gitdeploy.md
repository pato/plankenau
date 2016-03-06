---
layout: post
title: Using Git to deploy a website
published: true
date: 2014-01-24
permalink: post/using-git-to-deploy-a-website
---
I recently redid my personal website and ended up deploying it to both my personal [domain](http://plankenau.com) and my UT [website](http://cs.utexas.edu/~pato). In order to facilitate development and deployment I set up Git post-receive hooks on my servers so I could update my website with one command: `git push web`. This post will explain how you can do the same.

Setting up git locally
--------

The first step is to git track the local copy of your website (only required if you haven't already initialized git on the local copy)

Using your favorite shell, navigate to the local copy of website on your computer and start git

    git init
    git add .
    git commit -a -m "First commit!"

You have now initialized git, tracked your files, and committed your work!

Setting up git on server
----

Assuming you have a web server that you can ssh into we can the proceed on the server

    cd ~
    mkdir deploy.git
    cd deploy.git
    git init --bare
 
This will create a folder and initialize a barebones git repository within.

We then create a post-receive hook that will be called whenever you deploy and will update the latest version of your website

`cd hooks`

Then use your favorite text editor (vim, emacs, nano, etc...) to create 'post-receive' that will contain the following:

    #!/bin/sh
    GIT_WORK_TREE=~/public_html/ git checkout -f
    chmod -f -R o+x ~/public_html

The first line specifies that this is bash executable

The second line sets the GIT_WORK_TREE environment variable to wherever your public html files are located (usually in /var/www or ~/public_html)

The third line is optional, it gives the "others" group permission to execute files. This is a failsafe to ensure that apache can execute .php files.

In order to activate this hook, we must make it executable

    chmod +x post-receive

Pushing to server
----

Returning to the local copy of the website

    git remote add web username@yourserver:~/deploy.git
    git push web +master:refs/heads/master

That's it!

Deployment workflow
----

Deploying to your website is now a breeze! Your typical development workflow will be

1. Edit files like you normally would
2. `git add .` (if you create new files)
3. `git commit -a -m "your message"` to commit your changes
4. `git push web` to deploy!
5. Rinse and repeat
