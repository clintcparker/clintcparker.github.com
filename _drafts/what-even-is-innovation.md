---
layout: post
title: "What Even Is Innovation?"
---
I was once asked about the most inventive or innovative thing I’d done. Where to start? I’m a middling engineer at best. I fully subscribe to my own pitch as a leader that engineers should prioritize simplicity and obviousness over performance and cleverness.

That said, I have an obvious answer to "What is the most interesting problem you ever solved?" And just to be transparent and fair, I didn't solve this in a vacuum. I worked with a great team and would not have succeeded without their help.

The innovation I'm proud of is a little embarrassing due to the underlying technology. While I was at Mindbody, we uncovered an impactful limitation of scaling Classic ASP web applications. That's right, Mindbody was still very much reliant on Classic ASP, which had been deprecated with the arrival of `.NET`. The solution to this scaling problem wasn't particularly complex, but the novelty and impact qualify as innovative. In the end, we were able to proactively identify, remediate, and prevent future consequences of the limitation.

In late 2017, our VP of Engineering asked me to investigate an issue plaguing another team in his org. I was a Senior Manager overseeing other teams in technically a different department, but I and some of my group had historical experience in the code in question. The nominal problem: a deployed bundle of changes resulted in a 10% increase in CPU usage in production. Rolling the deployment back brought the usage back down, and vice versa. Additionally, the CPU increase was not detectable outside of the production environment. ☹️

I started by enlisting one of the senior engineers on my team, and we began reviewing the changes in the associated deployment. Nothing initially jumped out at us, but on the 3rd pass, I began to suspect that the problem could be related to a change of an `#include` reference file. Please see my early post about conditional `include` references to understand why this is already a potential issue. (And begin to understand my absolute hat of the continued use of VBScript). -- Side note: VBScript is awesome circa 1997. But, like everything else in the universe, we evolved, and the evolution of VBScript on the server was `.NET`. Now, if you want to complain about people _choosing_ to use VBScript after 2001, I'd be happy to drink my sorrows away beside you. Rant over, for now-- This reference file had _itself_ added another reference, which is typical. But in this case, the outer file was almost ubiquitously referenced in every top-level file. Specifically, the heavy usage of the modified file meant that this small change was probably causing a wider-than-obvious impact.

To test the hypothesis that this one-line change was the culprit, we removed that commit from the bundle and redeployed it without issue. The CPU usage increase disappeared! While the immediate problem was solved, I still wanted to know the root cause and prevention methods.

I then endeavored to prove this issue was detectable via static code analysis. My second hypothesis was that this was related to the server doing more work interpreting more lines per request. The structure of Classic ASP requires that every single line be interpreted when served. Therefore, I suspected that more lines interpreted meant more work being done per request and, in turn, higher CPU usage.

We created a NodeJS command line tool to analyze the codebase to represent this. We used NodeJS because it truly is the best way to share multi-platform CLIs. And thank you, [TJ](https://github.com/tj), for `commander.js`! The references in the `include` files created an easily traversed tree. The tree was then flattened and converted to a total number of interpreted lines for any given top-level file.

We enhanced the tool to provide additional insights, such as the theoretical minimum total lines (fully optimized but impractical to maintain) and the specific references to any included file, as well as a bloat factor, which represented how far the structure of a file was from the optimal. The results were output as one CSV file and a collection of JSON files.

The results were astounding! The original (problematic) one-line change increased the total number of interpreted lines from 26 million to 52 million. On the other side of the spectrum, the theoretical optimal number of lines was just over 12 million.

From the insights gleaned from the analysis, we could then restructure the file references to a more optimal state. Finally, we submitted pull requests to the owning team and reduced the total interpreted lines to 19 million.

Lastly, I saw that this specific issue could be prevented with these new insights. So, we created a step in the build process to run the analysis and limit the total interpreted lines not to exceed a variable maximum value.

Over the years, other engineers extended the tool to support visualizations of the reference tree and various library upgrades and bug fixes. It was still a critical build step at the time of my departure.

While none of the technology is particularly glamorous, I am proud of this innovation. Over a few weeks, existing concepts and platforms were reorganized to create something novel and beneficial. We didn't patent anything. We didn't write a new language. Heck, we couldn't even really talk about it for two main reasons: 1. The org didn't want to admit to using outdated technology, 2. Who else was using that tech and would be interested in listening?

So, as I said at the beginning, I subscribe to my own pitch of simplicity. We used basic tools and concepts and put them together in a new way.

P.S. I'm not sure how much we saved the company, but it has to be substantial. At least 10 teams were blocked for 3 weeks from deploying to production. I think they would've continued to run into this issue, even if they found it in this instance, and probably would've resorted to massively overscaling production infrastructure. Yikes!

P.P.S. Let's take a minute to discuss what was probably happening here. I say probably because I don't know for sure the absolute underlying issue, and even if I did, there really isn't any fixing it for this ecosystem. 

VBScript works by retrieving the requested page/resource (`something.asp`) and then processing the contents based on the context/request and rendering the output. Again, top-notch for 1997.

VBScript is a v1 product. It isn't optimized beyond what the engineers fathomed at the time of writing. So, VBScript pulls the initial ASP file from disk and processes it line-by-line. If there is an `#include`, it retrieves that and also processes it line-by-line. Why does it process every line? Because it's a scripting language at heart, and those lines can modify global state outside of a method body( again, see my post on VBScript conditional includes). So, it is doing a lot of work for each page request. The engineers knew about this, so they created a cache of page contents to not have to go to disk every time. 

In our case, though, these two concept collide and clobber each other. The need to process each request creates a ton of work, and the page sizes themselves become massive due to the (substantial but not infinite) recursive nature of the pages. Doing more work, and the cache can't keep up, so it's doing more work in vain. Brutal. 

In the end, they did improve Classic ASP/VBScript ... they created `.NET`. 