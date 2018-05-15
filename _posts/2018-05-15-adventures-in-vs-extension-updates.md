---
layout: post
title: "Adventures in vs Extension Updates"
date: 2018-05-15T16:22:49-07:00
---

While at [//build](https://developer.microsoft.com/en-us/events/build/content) I was inspired to update my extensions to support VS 2017. I meant to do it last year, but got distracted. The process was really simple, and is [outlined](https://docs.microsoft.com/en-us/visualstudio/extensibility/how-to-migrate-extensibility-projects-to-visual-studio-2017) on the new hotness that is [MS Docs](https://docs.microsoft.com). It took me about 10 minutes to get it all configured an tested. But then…I was sidelined by my CI config. 

For some reason, my [AppVeyor](https://www.appveyor.com/) builds were failing. They were clearly pulling the latest from my repo, but for some reason, the nuget restore stopped working. I probably should've googled the issue, and I think I did, but I was asking the wrong questions. I finally gave up and manually configured the build via the GUI, and then exported that config to YAML. When I went to do the next extension, I finally realized what the problem was. I used the exact same exported YAML, and got the exact same initial errors with the nuget restore. 

Googling "appveyor not using yaml" led me to [this help article](https://help.appveyor.com/discussions/questions/4148-why-does-appveyor-seem-not-to-pick-up-my-appveyoryml). I still don't understand why permissions were an issue to read the `appveyor.yml`, when it was clearly reading an updated `csproj` file. But I do now have extensions that support VS 2017.
