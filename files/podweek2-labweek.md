# CS: Pod of Delight
## Week 2: Lab week

Welcome to lab week!
I wasn't sure if I was going to be able to project, so I figured I'd type it up
and print it out :)

### Linux

Super basic intro to linux.

Linux in it's most technical sense is a kernel, though nowadays people have
extended the meaning to encompass GNU Linux which is an operating system.

It's open source (under GNU license) and was created and currently dictated by
Linus Torvals (you've probably seen him flick off Nvidia on YouTube).

It bridges the gap between hardware and the userland software that you run on
your computer.

Includes many tools and programs (gcc, ls, cp, mv, ssh, etc...)

Comes in many distributions (distros), for example:

  Ubuntu - most popular consumer one
  RedHat - most popular enterprise one
  Arch Linux - best one, super bare, super fast, super awesome
  Debian - probably second most popular consumer one
  Tails - privacy oriented, "volatile" os
  elementaryOS - basically a beautiful ubuntu

## Window Managers

A window manager (wm) is a userlevel program that handles the positioning,
stacking, and focus of X windows

  Stacking - ie: windows, gnome, unity
  Tiling - ie: bspwm, xmonad, herbstluftwm
  Dynamic - ie: awesome, dwm, i3


## Lab machines

The lab machines run Ubuntu, and have a lot of window managers at your disposal.
Before you log in (in the login-manager) you can chose which window manager you
want.  Awesome is the best :P just saying

Login with your csid (the one you requested not your utid or ut email) and your
password (ofc).

Based on your window manager, you should now see something :) Woo!

If you are using gnome/unity, press Ctrl+Alt+T to open a terminal

If you are using awesomewm, press Gui+Enter to open a terminal

## The terminal

Your best friend.

This is where you will probably spend most of your computer time.

It is actually a virtual terminal, (not a true terminal to your computer which
you can access with Ctrl+Alt+F{1-7})

You type commands, they are executed, and you see output. That's it!

## Basic commands

cat : print the contents of a file
  cat /etc/hosts : display your computer's local dns hosts file

cd : change directory

  cd - : switch to your last directory

ls : list contents of directory

  ls -lah : list all contents, one entry per line, show sizes in human readable

touch : create a file, change modification time (even in the past!)

pwd : see your current working directory

mkdir : create a directory
  mkdir -p ~/Documents/cs/pod/of/delight/is/awesome :
    create child folder and any parent folders if necessary

whoami : see your current username

rm : delete a file
  rm -rf : force remove a file
  rm -rf / : delete everything on your system (jk it will stop you)
  rm -rf / --no-preserve-root :
    actually delete everything on your system (jk you don't have sudo rights)

sudo : escalate a command and run it as superuser (root) (can't do this on cs
    machines, don't try)

man : look up a command's manual page (most helpful command yet)
  man cd : look at the usage and manual for cd

apropos : search commands based on their manual pages
  apropos copy : search for commands that copy

ssh : secure shell, used to remotely log in to servers, etc...
  ssh pato@almond-joy.cs.utexas.edu : login to a shared lab machine

scp : secure copy, same as cp but allows you to do it across the network
  scp ~/Documents/mylocalfile pato@linux.cs.utexas.edu:~ :
    will copy mylocalfile to the home directory on server

sshfs : mount a remote filesystep locally
  sshfs pato@sloth.cs.utexas.edu:~/myclass ~/mylocalmount :
    will mount the remote folder locally

ln : create system link
  ln -s source destination : create soft system link (essentially a pointer,
    much like windows shortcuts)
  ln source destionation : create a hard link (indifferentiable from original
    file)

chmod : change file permissions
  chmod 777 : make a file readable, executable, and writeable by everyone
  chmod 655 : make a file read and write for owner, read for group, and read
    and execute for everyone

grep : search content of files
  grep "duck" animals : search animals file for occurences of grep  
  grep -Ir "pato" : search recursively for occurences of grep

ps : process information
  ps aux : display currently running processes

wc : count lines, words, paragraphs, etc...
  wc -l : display only lines

file : see the filetype of a file

xdg-open : equivalent of "double-clicking" a file, will detect filetype and
  open it in the default program

## Piping

All commands in linux take in input (stdin) and spit out output (stdout,
stderr).  Therefore you can chain comamnds in linux to get lots of things done

ie: find ./ | grep "specific file"
    ps aux | grep firefox
    cat input | wc -l

## Routing

Like piping, you can also route inputs and outputs

ie: echo test > test.txt : redirect stdout to test.txt
    program 2>&1 : redirect stderr to stdout
    program &> /dev/null : redirect all output to /dev/null (data sink of doom)


## SSH

Used to login to remote machines such as lab machines, servers, etc...

Usage: ssh username@machine-hostname-or-ip

Can either use password or pubkey authentication

Once you log in, it's as if you are physically at the computer typing commands!

If your host computer has X server installed, you can also ssh with X forwarding
and run GUI programs over the network!

ie: ssh -X pato@almond-joy.cs.utexas.edu

## SSH Keys

SSH can use RSA-based public key cryptography to establish authentication

Generate a pair of keys: private and public.

Distribute your public to servers you want to log in

You can then log-in from any machine where your private key is present

Generating a key-pair:

  ssh-keygen -t rsa -b 4096 -C "email@emailprovider.com"

Then follow the prompts and stick to the defaults.

This generates two files under ~/.ssh: id_rsa and id_rsa.pub.

Distributing your public key:

  ssh-copy-id username@machinehostname

This copies over your public key to the server and concatenates it to
the ~/.ssh/authorized_keys file

Now you can log in to that server remotely!

## SSH reverse SOCKS proxy

Can use SSH to establish a SOCKS proxy and route all internet traffic (and DNS
    lookups) through a remote machine

Can be done using ssh commands (look up -R and -D on the manpages), but easiest
way is using sshutle (open-source transparent proxy server)

Look up sshuttle by apenwarr on github. :)

## Your webspace

All cs accounts come with free webspace!

Anything you put in your ~/public_html folder can be accessible from the world
via http://cs.utexas.edu/~yourcsid

Try visiting http://cs.utexas.edu/~pato

Put anything you want in there, but make sure that it has the right permissions
to be access

Typically you want 655 or 755 something like it so that it can accessed by other
people.

Careful, if your files have group write permissions (the 2 bit is on for the
middle permission ie: x7x) then anyone on cs network can edit your website!

## Other useful utilities

These are not part of gnu/linux but can be super handy!

htop - manage resources and processes on machine

powertop - manage power and see power consumption on laptops

apt-get/pacman/yum/brew - package managers, used to install new packages

sl - steam locomotive

ack-grep - like grep but built for searching code (ignores binary files, etc)

## ViM

Learn ViM or eMacs and your life will be easier. (more on this later)

## Alright it's getting late, I think that's already enough info :)
