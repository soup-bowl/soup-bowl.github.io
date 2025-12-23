---
author: Casey (Soupbowl)
date: "2023-02-13T00:00:00Z"
tags:
- Review
- Development
title: A Year of Cloud Coding in Review
slug: a-year-of-cloud-code-in-review
---

**Over the past year, roughly 90% of my non-professional coding time was done using a Cloud IDE.**

My work extends a crazy, disjointed range of different purposes. I maintain a WordPress plugin, run several ReactJS experiments, made my personal website 100x more confusing, and as a DevOps Engineer - lots and **lots** of configuring and pipelines.

**All of this**, I did in cloud editors. At this point, if it wasn't for getting into Plex, my workstation laptop would have spent the whole year not getting anywhere past 50% utilisation. They have really changed my world in ways I have always been hoping for.

After doing an [article reviewing Gitpod]({{< ref "/post/2022-03-19-gitpod-review" >}}) exactly a year ago, I thought I'd make another post about my experiences a year on. This **isn't just about Gitpod**, as I'm also an avid GitHub Codespaces user. However, a majority share of my cloud development work happened on the Gitpod platform.

Things have come a long, long way since my [**Cloud9**](https://aws.amazon.com/cloud9/), [**Codeenvy**](https://github.com/codenvy/codenvy) and **Codeanywhere** days!

{{<alert class="alert-warning">}}
This article was created before **Gitpod** became **Ona**. This was also created before **Gitpod Flex** was announced, and refers to Gitpod now known as **Gitpod Classic**. My views and experiences expressed in this article reflect their original offering, and I do not support or condone them since.
{{</alert>}}

## The Challenges

{{< figure src="/assets/img/Screenshot_2023-02-13_22-22-06.webp" >}}

Since a lot of my projects are small-scale and of generally a single intention, it was really easy to move into a cloud development layout. I like to maintain **ephemeral workspaces**. This means I want to be able to log-on, do my code, then destroy the environment. Each time I start, I want a brand new environment and a blank slate. This is generally what **Gitpod** and **GitHub Codespaces** push as the optimal way to work. Since I already started converting a lot of these to **Docker** a few years back, it was generally quite easy to get them configured - the codespace generally just starts the Docker (compose) setup.

Now **Gitpod** and **GitHub Codespaces** have entirely different configurations off the bat. GitHub Codespaces container architecture folows the [**Devcontainer.json** spec](https://code.visualstudio.com/docs/devcontainers/create-dev-container). This is a Visual Studio Code initative to make portable, flexible Docker-based development instances that move with your codebase, and so it was pretty much GitHub's natural move to take this on as their cloud spec. There's **way** to many options to discuss, but you can define your usual business such as what the continer runs when it starts, finishes loading and completes, what dependencies it installs, and what it uses as a base Docker image. All in all this is absolutely perfect, but my personal caveat is I find it **very difficult** to understand. I love automating my workspaces so I literally just *open* my workspace and I'm ready to code with zero configuration, and tracking down and understanding settings was a dive into documentation hell.

On the other side, Gitpod uses their own specificiation - the [**gitpod.yml**](https://www.gitpod.io/docs/introduction/learn-gitpod/gitpod-yaml). Generally there is also a large breadth of configuration options here, but in a slightly neater and easier to configure YAML package. I found gitpod.yml **much easier** to get started, and even easier to do workspace automation with. The problem here is that it's another 'thing' you have to have in your repository. Gitpod currently does not support Devcontainers.json ([it's on their roadmap](https://github.com/gitpod-io/gitpod/issues/7721), but they started it before Devcontainers came out), and so you have to maintain two sets of environment setups to account for Gitpod and Codespaces. You can generally write shell scripts that both can inherit from, but you'll then have fun gotchas like [ensuring configurations understand the URL differences](https://github.com/soup-bowl/wp-simple-smtp/blob/develop/.devcontainer/postCreateCommand.sh#L2).

Gitpod also has a pretty neat setup for supporting workspace setups, that they call [multi-repo](https://www.gitpod.io/docs/configure/workspaces/multi-repo). I've not found an equivalent feature in Codespaces so far, so working on projects such as [whatsth.is with a front and backend repository](https://github.com/soup-bowl/whatsth.is) has been easier on Gitpod.

## Configuration

{{< figure src="/assets/img/Screenshot_2023-02-13_22-27-26.webp" >}}

As someone who switches Linux distributions faster than clothes, I certainly don't find configuration a chore. But in my professional experience this can quickly build up until you end up sending significant time configuring workspaces for different projects. This is one of the great things that can be achieved with cloud development - you configure once (or rarely), and you get fresh setups each time.

Now, to be clear here - if you've not skipped this bit then you know I like to destroy my workspace after a particular coding segment is done. This is **recommended**, but in both platforms **not required**. Both Gitpod and Codespaces will retain your workspace and prevent it from being deleted. So while this is my preference, you absolutely can use both platforms in 'monorepo' methods.

My first project I did this with was my [Simple SMTP WordPress plugin](https://github.com/soup-bowl/wp-simple-smtp). To adequetly test my development work, I usually have a Compose setup running WordPress, MySQL & an SMTP server. On my non-cloud setup, I initially configure the instances, then stop and start them where needed. For my *cloud* environment, I decided I'd try and make it so that the server configuration aspects were automated.

Both environments support running scripts at various environment lifecycles. So I'd use an initalisation event (`tasks.init` and `postCreateCommand`) to pull my Docker image and Composer PHP installation dependencies. Both Gitpod and Codespaces support "preloading", and since the resource gathering is the longest aspect, using preloading would mean each new workspace will have **already done this** before starting setup.

I then hook into a post-start event (`tasks.command` and `postAttachCommand`) to get all the business going, which consisted of:

* Starting up the relevant Docker systems (**WordPress**, **database** and **SMTP**).
* Install and setup the **dependencies** and **testing** environment for my PHP-based codebase.
* Running *wp-cli* on the WordPress instance to turn the 5 minute install into the **0 minute automation!**
* Link the development codebase into the WordPress instance plugin directory and activate.
* Deploy envionmental configuration from the new environment.

The whole process takes about ~2 mins (15 when the preloading doesn't run), and just like that - I can go straight into development work, no configuration needed. **And all contributors get access to this immediately**.

Can you see the *power* here? I can replace my laptop at this point, and it would have no impact on my development environment.

## What Couldn't You Do?

At the start I said **90%** of my work... So what about that 10%? The short answer to this is **embedded system** work.

This probably isn't much of a shock, but I've got a few **Raspberry Pi Picos**, **ESP-32**, **Arduino** and a **PineTime** that I tinker with, and generally speaking they don't interface too well with cloud environments. Surprisingly, this is probably not going to be true for too much longer as browsers are [working to support USB devices](https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API). While serial devices are likely not in their scope, it's a great sign of progress that will eventually lead to you being able to edit and configure embedded chips using browser-based IDEs. You'd possibly even be able to do this via **[vscode.dev](https://vscode.dev/)**.

Other times I've not used cloud environments have typically just been due to internet outages. I've been lucky to acrue large amounts of development hours on both platforms, but I could imagine another problem here would be exceeding the allowances that both platforms put in place from them taking the work brunt.

## Which Platform is Better?

Ah, now to the tough question. After splitting my time between both Gitpod and Codespaces, it's extremely difficult to identify a-

Nah I hate that when an article doesn't draw a conclusion. After a year spent with Gitpod and Codespaces, I have to say my particular stand out choice is - **Gitpod**.

I haven't been paid of influenced to choose them, and I technically benefit from committing entirely to the Codespaces platform, but I find each time I start working on a project that the very first thing I reach for is Gitpod. Over the year I've found Gitpod to be more flexible, easier to start with, generally more stable, and comes with a vibrant and helpful community over on Discord. My main negative (which is ironically my favourite feature) will generally be the gitpod.yml deviation. It's a pain to have to configure for both Gitpod and Codespaces in mind (and god forbid the other cloud platforms I've forgotten about). Remember - *your experience may vary!*

But if you're just starting out, now is a perfect time to consider immediately diversifying your choice. With Codespaces you get **60 hours free a month**, and **50** with Gitpod - that's **110 hours of free server time a month**! You'd be amazed how much you can do with just 20-30, but with a combined approach you are pretty much covered for most development excursions **for free**. Combined with the fact you can write code on a much slower machine, you can get started with coding without spending a dime.

---

Have you tried these, how was your experience? Did you find any other cloud environments that you had a good experience with? Share in the comments section below!