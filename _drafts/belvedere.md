---
layout: post
title: "Belvedere"
---

I recently created [name-on](https://name-on.site) using the DotNetCore command line tools and VS Code. It was surprisingly easy, and I love scaffolding from the command line.

I also recently got my WSL setup working, which involved setting fish as my default shell, and revisiting some of the functions I have made in the past. 

My quick experience with the DNC CLI seemed like the perfect thing to functionalize. I like having a standard structure to my apps:

* class library
* command line
* web app / API
* test project

DNC has the concept of tmeplates and extensions, but what can I say, I wanted to write this with fish. So I did.

I picked the name belvedere by looking up scaffolding in a thesaurus. Apparently its a "raised turret atop a house," and comes from 1590's italian.

Belvedere will create all the necessary projects, with the correct intra-project references, a solution, gitignore, and README. It also intializes a git repo and commits the created files.

You can find the code here: .....