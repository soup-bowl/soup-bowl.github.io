---
layout: post
title:  "Chromeboard, an Experiment Killed by Security"
author: Casey (Soupbowl)
tags:   [Development]
---

You wouldn’t be wrong if you’ve come to the assumption that I’ve stopped supporting [Chromeboard](https://blog.soupbowl.io/chromeboard/). [You can see from the commit log](https://github.com/soup-bowl/Chromeboard/commits) that I haven’t made a significant change since March of last year. This was largely unintentional, but there was a main reason as to why I chose to unofficially abandon the extension – I call it ‘[Issue 9 of Death](https://github.com/soup-bowl/Chromeboard/issues/9)‘.

![](/assets/img/20180423-Capture.webp)

This is the reason why a rough 5% of the internet websites actually work with this extension. I’ve stopped working on the plugin because simply, in the current approach it will soon become completely unsustainable.

In this general interest post, I’ll explain what SAMEORIGIN is, how it relates to browser security, why it killed my plugin and what the future for Chromeboard is.

## What is SAMEORIGIN?

Let’s quickly cast back to the internet 1995-2005. Put your mental image of a phone away, because WAP was a horrific mess that _nobody_ used. I particularly remember around ’02-04 being a hot spot for friends and family being frequently affected by online scams and such. Back then though, we weren’t aware of these as much as we are now.

A popular attack at the time was the ol’ classic, ‘YOU’VE WON A PRIZE!’ hoax. You’ve clicked it, realised it’s a hoax and left. However, the browser has used this to make a request to your banks’ website that you have an authentication cookie for, and make a payment. As far as your banks’ website cares, **you** made that request. This is just one example of many Cross-Site Scripting (XSS) attacks.

One approach is this SAMEORIGIN header. This lets the source server (the website you visited) specify how the content it provides is controlled. If the policy is specified to the current website, it means that attacker sites cannot use an IFrame to attack unsuspecting customers.

And that last sentence is the exact reason why the Chrome extension does not work on a majority of websites.

## You’re Harvesting Our Data?!

Not at all. In fact, Chromeboard doesn’t really care _what_ you’ve specified. However, in order to be able to switch tabs without taking full control of the web browser, it loads up all your specified cyclical tabs into one page. And the only way this can be feasibly achieved is through the use of IFrames.

If a website has a defined SAMEORIGIN policy, it will disallow Chromeboard to render it. The most common reason will be because the IFrame location is not the same URL as where the page is coming from. Ergo, the website deems the extension is trying to spoof attack you and thus blocks it.

So Chromeboard is effectively made redundant, but for a completely legitimate reason.

## Chromeboard Future

For now I can confirm that the Chromeboard extension is abandoned, but the project is **still ongoing**. The progress has disappeared because an [API is being developed to manage the websites](https://gitlab.com/wallboardlive/api).

My plans for Chromeboard going forward are:

1. Chromeboard settings are definable via a stateless REST API.
2. Chromeboard primarily becomes an Electron app (ARM focus).
3. Chromeboard browser plugin pivots the approach.
4. ???
5. Not-for) profit!

Electron being a full application instead of being just a browser allows me some flexibility in approach. I can keep the app as a Kiosk terminal, however it is able to run web instances which allows Chromeboard to be seen as a web browser instead of a spoofing client. Since wallboards mostly reside on the IoT, I will be ensuring that this works on the [Raspberry Pi](https://blog.soupbowl.io/category/raspberry-pi/).

I will keep posted as things develop, but hopefully this will clear up as to why progress for the Chromeboard plugin has completely stopped.

[Nutab](https://blog.soupbowl.io/nutab/)? Oh my, that’s a completely different story.

**Note: Since this article was published, Chromeboard was issued a takedown due to copyright infringement (Chrome in the name, and in the logo). It has since been rebranded as Wallboard Lite.**
