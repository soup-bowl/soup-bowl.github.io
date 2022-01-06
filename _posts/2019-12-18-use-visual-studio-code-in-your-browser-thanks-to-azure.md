---
layout: post
title:  "Use Visual Studio Code in your browser, thanks to Azure"
author: Casey (Soupbowl)
tags:   [Development]
---

Yes, the Electron-based Visual Studio Code – an app built in HTML and JavaScript – is not usable in a web browser. What a weird world we live in.

You may sitting there in your coffee shop, staring with contempt at your weakling tablet and thinking “boy, I wish I could run Visual Studio Code on this powerful lemon”. Well Microsoft apparently listened to you and your gaping wallet. [You can now use Visual Studio Code, online](https://visualstudio.microsoft.com/services/visual-studio-online/)!

The aptly named [Visual Studio Online](https://visualstudio.microsoft.com/services/visual-studio-online/) – designed to confuse the real Visual Studio developers up and down the land – runs the **full Visual Studio Code experience** within your web browser. But how, you probably didn’t ask?

Visual Studio Online hooks up to a Azure cloud instance that will run a full copy of Visual Studio Code. Basically, the web version (basically a pseudo-copy) will stream all the changes back to this real copy. Woohoo, programming – Netflix style!

## But I’m too poor to afford Azure…

Don’t worry, my financially-challenged friend. No regular human can afford Azure.

You can install [Visual Studio Online plugin](https://marketplace.visualstudio.com/items?itemName=ms-vsonline.vsonline) on a computer of choice, and use that as your streamable programming buddy. This means you can use your home PC, a virtual machine, Raspberry Pi, just about anything that can run the latest version of Visual Studio Code.

To do this, you still need a Microsoft Azure account on a minimum subscription of pay-as-you-go. You don’t have to rent out any of their expensive packages, you just need the account to link your remote VSCode setup to.

## First Impressions

Microsoft are keen to point out this is **insider quality**, and is not yet ready for production usage. This is also made obvious by the fact it is **not compatible with Firefox**. Likely this stems from the regular editor being built upon Electron.

I tried this out by setting up an Ubuntu Hyper-V container, installing Visual Studio Code with Online, and hooking it up to my Azure account.

![](/assets/img/Untitled-1024x768.webp)

As far as what I tried, it works just as I would expect the desktop version to work. Extensions all appear to be the same, project and installation settings work (I assume client settings are per-browser, as it lost mine frequently), and the terminal works really well on the existing machine.

![](/assets/img/2019-12-18-3-1024x645.webp)

This works really well combined with **[Docker](https://www.docker.com/)** and **[ngrok](https://ngrok.com/)**, or with a forwarded port open via the home broadband router. All my extensions were compatible, and even Intellisense kept up well despite both a struggling VM and broadband.

This currently isn’t mobile friendly, so don’t expect to do any on-the-fly miracles with your phone. However, this works a treat on tablets for those remote working moments without a primary machine.

I’m really impressed with Visual Studio Online so far, and I can categorically say this will replace my AWS Cloud9 via SSH editor that I used to use.

Any thoughts, or want me to try anything out? Please, let me know via the comments below!
