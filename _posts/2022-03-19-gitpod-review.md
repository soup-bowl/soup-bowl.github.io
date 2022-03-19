---
layout: post
title:  "Bored Waiting for GitHub Codespaces? GitPod has Your Back"
image:  /assets/img/gitpod-screenshot.webp
author: Casey (Soupbowl)
tags:   [Review, Development]
---

I've been on the waiting list for GitHub Codespaces for nearly 2 years now, and I haven't seen anything from GitHub about it. At this point, I'm even wondering if the Codespaces initiative was some kind of desert mirage, and actually doesn't exist at all!

But bored of waiting for something I'm losing the plot over, I saw what alternatives are available. In comes **[GitPod][gp]** to save the day.

{:refdef: class="article-image"}
![Purchased PS One console before modifications.](/assets/img/gitpod-screenshot.webp)
{: refdef}

# What's the Point in (GitHub) Codespaces and GitPod Anyway?

We're in the time of the cloud. 15 years ago we were told by the seers of technology it was coming, and we'd soon live in a time where your website would be hosted on a server not in a cabinet... Just in a cabinet thousands of miles away in someone else's data centre...

All in that time, we've still been coding on our machines. Our machines whirring and buzzing away writing, compiling and debugging our code in front of us, we've been developing on our local machine... At what point did our development work get shifted into the cloud?

Clearly some engineers have considered this, as there's been multiple initiatives to get **Visual Studio Code** and other web based editors into the browser. You can run [your own server version of Visual Studio Code][cs]) (preferably in a Docker/Kubernetes container), or run a [localStorage-accessible variant for quick edits][vd]. Truly Visual Studio Code is the master of portable code editing (ironic since it's written in JavaScript technically).

This is all well and good, but neither of these avoid the typical issue of **configuration**. If you use Codeserver, you typically will need to setup and configure your own Kubernetes cluster or Docker server to operate with. This then comes with the challenges of the security, and making sure you provision the server enough resources to run. Plus, when you gain contributors to the project, will they have access to your cluster or will you go through the arduous process of getting them to set one up? Argh! Headaches!

Well, this is just part of what both Codespaces and GitPod solve. Everyone has a cloud-based editing platform that they can use, authenticated by the Git provider, and shares the same environmental configuration for all your contributors. **Everyone** has the same setup, and can work on the same project **regardless** of their machine specifications and knowledge of containers.

If I've explained this now, you've hopefully stopped reading this article and have signed up for GitPod already!

## Why GitPod over GitHub Codespaces?

**Quick answer**: You can use GitPod immediately, without waiting 2,147,483,647 years for GitHub to launch Codespaces.

But once you've used GitPod, you might not be so quick to leave them for GitHub Codespaces once they launch. I will never be able to do as must justice as GitPod have already done with [their GitPod vs Codespaces informational](https://www.gitpod.io/vs/github-codespaces). But to summarise:

* If configured correctly, GitPod will **cache** your builds. This makes spin-ups **a lot faster**.
* Unless GitHub changes things, GitPod is cheaper on your wallet than Codespaces is. Certainly less complicated!
* You're not limited to GitHub - you can use **GitLab** and **BitBucket** too!
* Decided you want to self-host? [They've got you covered](https://www.gitpod.io/self-hosted/).
  * This is for corporate environments and SysAdmin gurus - this isn't a good pathway for saving a buck.

### Cached builds?

This is definitely one of the prevalent strengths of GitPod. While these cloud code editors keep your workspace going for a few weeks after you've finished, they mostly operate on the basis of a **new workspace per run**. What this means is that each time you start up GitPod/Codespaces, you'll start with a fresh install. As you can imagine, this gets a little time consuming. You'll find yourself starting up your workspace, then grabbing a cup of coffee as it runs. If you did this 5-6 times a day, you'll be as hyperactive as a beaver in a timber store!

GitPod offers you the ability to **cache** your builds. What this means, is that you can define two sets of instructions that run when you start your workspace. One of these sets will run each time you start a workspace. The second will run once, then store the result in a cache ready for further workspace creations. For example, you could whack your `docker-compose pull` and `docker build` instructions in this process, and when the workspace begins the resources are *already present*!

## What Projects work on GitPod?

All **web-based projects** will work on GitPod.

GitPod is pretty much language-agnostic at this point, since for each workspace they spin you up an **Ubuntu** environment complete with pretty much most common language packages (think what you get when you install xcode on macOS). You don't *have* to use this either, as the container comes fully-equipped with **Docker**. That means you can spin up whatever container you want that works with your project. All exposed ports will have the option of allowing just you to see the project, or make the application URL visible outside (like [ngrok](https://ngrok.com/)).

For one of my projects - **WordPress Simple SMTP** - I had configured GitPod to immediately grab [MySQL][dm], [WordPress][dw] and [Composer][dc] docker containers, and compile the WordPress container to contain [WordPress CLI][wc]. This cuts out around about **2-3 minutes of the start-up process**! The rest of my script focuses on minimising the setup process by executing a quick-start shell script on the container, so once my GitPod initialisation finishes, I'm greeted with a **fully installed WordPress instance** with the plugin in question already activated and ready to be worked on. Neat, right?

(If you want to see this script, [you can find it here](https://github.com/soup-bowl/wp-simple-smtp/blob/main/.gitpod.yml)).

So far I've also tried GitPod with [Laravel][tr-l], an [SSO project with WordPress & MediaWiki][tr-mw], a [Jekyll theme][tr-jt], and a whole bunch of other private repository codebases. In fact, this website (currently closed source but runs on Jekyll) is built on GitPod! Once [ReviveToday](https://revive.today) is opened-up the GitPod configuration will be visible.

## Cost & Conclusion

So long as you use it for less than **50 hours a month**, this service is **free** for everyone - private and public repositories alike! Perfect for hobbyist programmers, weekend devs, and as an alternative to running locally when you're out and about with a low CPU laptop. You can pay **€8 (Approx. £6.75) a month for 100 hours** of dev time, or **€23 (Approx. £19) for unlimited usage** and more.

Personally, as someone who uses GitPod outside of my working day job, I've not even come close to meeting the 50 hour limit. I've found it an invaluable tool when I've been working remotely, as it enables me to offload the heavy work to the cloud and spare the battery on my laptop. I was also able to try this out on a tiny Windows 8-era tablet hybrid, and it worked flawlessly to enable portable coding.

[gp]: https://www.gitpod.io/

[cs]: https://coder.com/docs/code-server/latest
[vd]: https://vscode.dev/

[dw]: https://hub.docker.com/_/wordpress/
[dm]: https://hub.docker.com/_/mysql
[dc]: https://hub.docker.com/_/composer
[wc]: https://wp-cli.org/

[tr-l]:  https://github.com/soup-bowl/wp-simple-smtp/blob/main/.gitpod.yml
[tr-mw]: https://github.com/soup-bowl/project-wp-mw-sso/blob/main/.gitpod.yml
[tr-jt]: https://github.com/soup-bowl/jekyll-bootstrap-5/blob/main/.gitpod.yml
