---
layout: post
title: "Name-on"
date: 2018-08-31T16:22:49-07:00
---

### But Y tho?
I needed a unique name generator, so I built [one](https://name-on.site/).

I had used the Heroku unique-name generator before, when building [bad ideas](https://badideas.herokuapp.com/). I loved how it removed a mental hurdle from getting something out the door; coming up with a name. Personally, I’m horrible at naming things, so this was a necessity. I don’t want to get hung up on picking a good name, and the defaults are equally as bad (ConsoleApplication23, anybody?).

I’d also been wanting to get back to dot net core. The last time I had played around with it, they were still using the `dnx` command line tool and `project.json` files. So this project seemed small enough, and valuable enough, to actually keep me on task for the duration of v1.

### The command line
I was stoked to be able to layout the project structure from the command line. I’m just so much more optimistic about a tool when there’s a CLI behind it. Even if I’ll never script it, the idea that i _could_ is very appealing.

I scaffolded the whole project via the `dotnet new` and `dotnet add` commands. I was also able to build and test in the same manner. It was a nice break from VS 2017.

### Structure
I found lists of adjectives and nouns online. And thank to some recent practice with regex crosswords, quickly stripped everything but the words themselves.

I added some tests for uniqueness, which is about 99.985%. I also added protection for never getting the same name twice in a row.

I was able to create a CLI for OS X, which was came in handy when publishing to Azure, and needing names for everything.

For the web app the `dotnet help` lists a template called `razor` with the description “mvc with razor pages.” I’ve used the Razor syntax since it debuted, and thought, “of course I want razor, not `aspx`.” Apparently though, Razor Pages is a new thing. I actually really liked it for build the web app component. I still created a controller for the API, but was happy I stumbled onto this new paradigm.

I really went over the top with the completeness. Azure for hosting. Custom domain through NameCheap. SSL through CloudFlare.

### Next Steps
The [README](https://github.com/clintcparker/name-on#name-on) has a roadmap, which includes packaging the CLI and improving the site. PRs are welcomed.