---
layout: post
title: Migrating my Blog to Jekyll
published: true
date: 2016-03-05
permalink: post/migrating-blog
---

## Why

Today I migrated my blog from [Nibbleblog](http://www.nibbleblog.com/) which is a PHP file-based blogging
system to [Jekyll](http://jekyllrb.com/) which is a markdown static website generator. My blog was
the last dependency my website had on PHP so I had been intending to move it to something else, and since
I already had all my posts in markdown I figured Jekyll would be a reasonable transition.

## How

### Installing Ruby 

My server is a Digital Ocean droplet running Ubuntu 12.04, so my version of ruby was way too outdated to install jekyll.

To install the latest version I used [ruby version manager](https://rvm.io/) then

`rvm install ruby-2.2.1`

### Installing Jekyll

To install jekyll I first set my rvm version `rvm 2.2.1`

Then `gem install jekyll`

### Git Hooks

I use Git to deploy my website (I wrote about my setup [here](http://plankenau.com/blog/post/using-git-to-deploy-a-website)). So naturally I wanted to add the jekyll compilation to my receive hook.

Hooks are run on the server under the `git` user account, which meant that rvm would not be able to load
my custom version of ruby by default so using `which ruby` under my account I was able to get the full path
and add the command to the end of my `post-receive` hook.

`/usr/local/rvm/gems/ruby-2.2.1/wrappers/jekyll build --source /var/www/plankenau.com/public_html/blog_jekyll --destination /var/www/plankenau.com/public_html/blog`


### Setting up Jekyll


Jekyll is really simple to set up, especially in a blog-like fashion so I'll point you to their [docs](https://jekyllrb.com/docs/posts/) on how to set up posts.

But broadly I have a `blog_jekyll` folder which contains all the jekyll configuration files and blog post source code,
which when compiled will generate my `blog` folder with the resultant html files.

### Adding a custom 404

One thing that I was missing after migrating was custom 404 support. 

First, I created a `404.html` page with 

```
---
layout: page
title: 404
exclude: true
permalink: /404.html
---
<h1>Sorry it appears the page you are looking for is no longer here</h1>
```

Then I created a `.htaccess` file in my blog folder containing:

`ErrorDocument 404 /blog/404.html`

This will tell apache to redirect 404 errors to your custom page

Finally I had to modify `_includes/header.html` to not display the 404 page in the navbar by
adding a check to ensure the page is not excluded before adding it to the navbar

```
{% raw %}
{% for my_page in site.pages %}
	{% unless my_page.exclude %}
		{% if my_page.title %}
			<a class="page-link" href="{{ my_page.url | prepend: site.baseurl }}">{{ my_page.title }}</a>
		{% endif %}
	{% endunless %}
{% endfor %}
{% endraw %}
```


### Maintaining backward-compatibility

After migrating, I realized all my previous blog post links would be broken.
My old blog used to have links of the form `/blog/post-{num}/{title}` whereas
all my current blogposts would have links of the form `/post/{title}`.

In order to be able to handle my old form of links, I edited my `.htaccess` file to contain

`RedirectMatch 301 /blog/post-.*/(.*) /blog/post/$1`

Which will match the old style of links, take the title and redirect it to the new form.

### Source Code

All the source code and intricate details behind my blog are on [Github](https://github.com/pato/plankenau)

