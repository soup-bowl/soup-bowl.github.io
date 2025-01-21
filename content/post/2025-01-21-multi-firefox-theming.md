---
author: Casey (Soupbowl)
date: "2025-01-21T00:00:00Z"
image: /assets/img/screenshot-from-2025-01-21-1.webp
tags:
- Development
title: How I Test my Firefox Theme on all Variants at Once
slug: test-firefox-variants
---

**After a chat I had a little while back, I was asked how I am testing [Modoki Firefox][mf] on all the variants at once, without installing Firefox locally.**

Firefox has 4 variants - Regular, extended support (ESR), developer (used to be Aurora) and Nightly. At the core, all of these variants are still just plain ol' Firefox. The difference being that they are different pointers in the timeline of Firefox releases - ESR representing an older, supported version, and Nightly being the bleeding-edge version.

While most people use the regular version of Firefox, testing against Nightly gives the great ability to preview changes coming down the pipe. I can fire up Nightly and see how well the theme will look against versions of Firefox in the near future. Therefore ideally, I wanted to test against all.

But then here's a bit of a shocker - I don't actually use this theme. So I can't _really_ test it on my install.

## Just install them

Yeah, the simplest option here is to just install them. I use Linux, but even on Windows I could just grab the portable binary downloads and just... Well, run them. Right?

The problem here is that then means the install will pickup and use my settings, themes, and various different configs located on my machine, that stops it being a truly native, out of the box feel any more. I can setup a different profile, but this still poses the same risk that I may forget or change a universal setting.

Plus, when I come to remove them, I'm now left with the redundant files all over the filesystem left over from the install. Firefox is genuinely quite a clean piece of software for this, but it's still something I don't want to do that I can overwise ignore.

## In comes Devcontainers!

So what if I can just spin a small environment that I can preview these browser versions in, that gives me a new, fresh, out of box experience that I can get up and go with, already has my needed configs, and I can remove easily should I need to? - [Devcontainers has the answer][dc]!

{{< figure src="/assets/img/screenshot-from-2025-01-21-1.webp" alt="A screenshot of 4 open versions of Firefox, all showing their default homepage. in the foreground is regular Mozilla Firefox. Obscured behind the foreground window, we see the titlebars of two more setups - Firefox Developer Edition, and Firefox Nightly" >}}

Devcontainers is the idea of using a Docker container as a fully-fledged development environment. You can connect Visual Studio Code into it, and it will operate as if you are inside the environment itself. This lets you install anything and everything you want, and it all remains encapsulated inside, and can all be neatly stopped, resumed, and disposed of as you would expect from a Docker container.

Devcontainers also use **[features][dc-f]**, that lets you add on additional features to a base image. So you can use features to say, grab an **Ubuntu** base image, then add in a desktop environment, DinD, anything you'd need to get working. All of this can be done and configured via the JSON file, meaning you don't have to learn how to write and build Dockerfiles to just get going with your code.

Oh and did I mention, because it uses Devcontainers to achieve this, it works in **GitHub Codespaces**!

{{< figure src="/assets/img/screenshot-from-2025-01-21-3.webp" alt="A screenshot showing a Linux screenshot of Mozilla Firefox, open to a page showing a virtual Linux desktop. This virtual desktop also has Firefox running, open to the Modoki Firefox project's homepage on GitHub" >}}

## Firefox Feature

To get working with Modoki Firefox, I setup a new **[Firefox Set][ffs]** feature, designed to install a copy of each Firefox variant inside an Ubuntu-based image. All this does - quite simply - is install all four versions into your environment's `/opt` directory, and - when combined with the [official desktop-lite feature][dtl] - modifies the launcher to know where they are, so you can easily launch them. 

{{< figure src="/assets/img/screenshot-from-2025-01-21-2.webp" alt="A screenshot of an application launcher menu, showing firefox-regular, firefox-esr, firefox-developer and firefox-nightly" >}}

```json
{
	"name": "Firefoxes",
	"image": "mcr.microsoft.com/devcontainers/base:jammy",
	"features": {
		"ghcr.io/devcontainers/features/desktop-lite:1": {
			"password": "noPassword"
		},
		"ghcr.io/soup-bowl/features/firefox-set:latest": {}
	},
	"forwardPorts": [6080],
	"postCreateCommand": "ff-installer-link $(pwd)/IE6/chrome",
	"remoteUser": "root"
}
```

To break this down:
* To start off, our basis container will be a devcontainer flavour of **Ubuntu 22.04** (jammy).
* We call the `desktop-lite` feature to add **Openbox desktop environment** and **web VNC** capability.
* We call my `firefox-set` feature to prepare the 4 installs of Firefox for the VM.
* We expose port 6080 to the user, so you can go to http://localhost:6080 and see the web view.
* `postCreateCommand` executes once the container has been fully built. Here I run my features' `ff-installer-link`
  command, which sets up my projects theme directory (/IE6/Chrome) as a symlink into the userchrome of Firefox.

This means that once you spool up the Devcontainer, you'll get prompted to check out port 6080 in your browser, which
will greet you with a small Linux desktop environment in the browser.

Now, with this setup in place, any change you make will be reflected on **all four** of the Firefox copies. Also, as
part of the feature, Firefox is automatically pre-configured to enable the inspection tools, so right off the bat you
should have the option to run inspector on the UI elements of Firefox.

## Can I use this?

Yes! None of this should be limited to my project, and you should 100% be able to use the same `devcontainer.json` in
your project, with the only primary adjustment being to change the path in `command` to match your personal setup.

Over time I will see what additional capabilities I can add to the feature, such as possibly adding custom setting injections, accounts modifications, the possibilities are ~~limited by my human life hours~~ endless!

Check it out, try it out, and see how you fare with it. Any and all feedback is welcome, and if you experience any bugs
with it you can [report it at my feature page on GitHub][ffs].

[mf]:   https://github.com/soup-bowl/Modoki-Firefox
[dc]:   https://containers.dev
[dc-f]: https://containers.dev/features
[ffs]:  https://github.com/soup-bowl/features/tree/main/src/firefox-set
[dtl]:  https://github.com/devcontainers/features/tree/main/src/desktop-lite
