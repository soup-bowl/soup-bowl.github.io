---
author: Casey (Soupbowl)
date: "2020-01-23T00:00:00Z"
tags:
- Linux
title: Linux it up like 2008 with Wubi, which still exists
slug: linux-it-up-like-2008-with-wubi-which-still-exists
---

Wubi was **Marmite** back in the day. With Linux being pitched as an alternative to Windows, people weren’t particularly impressed with using Microsoft technology to boot up a virtual Linux installation. Alongside the genuine concern that a power outage would obliterate your Linux setup, Wubi faced a lot of criticism.

Wubi installed a **full desktop Ubuntu** installation inside a virtual hard drive on your Windows machine. Yep, you could literally **install Ubuntu** like a regular application, and boot into a full Ubuntu OS instead of Windows. Dual booting went from being a nightmarish partition juggle of your main drive, to a literal one-click install.

Wubi fell out of favour around 2012 as the Ubuntu installer made hard drive partitioning ridiculously easy, and virtualisation stopped tanking your PC. But the advent of UEFI pushed Ubuntu back from super easy installation, into needing some technical know-how to setup. A correct setup was also devoid of the Wubi problems such as power outage corruption and NTFS performance impacts.

With a reduced interest in Wubi, development stopped… Until now… Ish.

Welcome, **Wubiuefi**!

## What does WubiUEFI do?

![](/assets/img/EO5kLfjU8AAHaui.webp)

WubiUEFI installs a **full Ubuntu flavour** into a **virtual hard drive**, stored on your Windows machine. It then instructs Windows to add an entry to your bootloader to boot up the installation on this virtual drive.

Literally that simple.

## What’s the Catch?

The hard drive you boot from is a virtual disk, which is being accessed via a Windows NTFS layer. This adds a **small speed overhead** that you will notice when WubiUEFI is installed to a hard drive, rather than an SSD. This also makes the system a lot **more suceptible to data corruption** in the event of a hard power off, like a power cut.

It can also be a pain to configure on a UEFI system with **secure boot enabled**, but not impossible to do.

## Will WubiUEFI break Windows?

WubiUEFI _depends_ on Windows so you can rest assured it absolutely **will not break** your Windows installation! Ubuntu is installed into a **file**, not a **partition**. In other words, this won’t fiddle around with how your system fundamentally works.

WubiUEFI will add an extra item to the Windows bootloader, so when you boot up your PC it will ask if you want to reboot into your Linux install instead of continuing into Windows.

## Can I remove it easily?

Probably one of the best things about a WubiUEFI installation, **yes!** Removing WubiUEFI installations is done by simply popping open Programs in settings, and uninstalling Ubuntu! Job done.

If you want to do the **reverse** however, you may be out of luck. While it’s possible, it’s an incredibly long-winded and risky approach. [It has be done before on older versions](https://askubuntu.com/a/36904), but your mileage may vary. A full manual installation would be recommended if you wish to move _away_ from Windows.

![](/assets/img/Screenshot_20200122_205624-1024x576.webp)

After some jiggery-pokery, my finished Wubi-installed Kubuntu.

## What’s WubiUEFI good for?

WubiUEFI is absolutely fantastic for giving Ubuntu an extended trial without the lack of storage from running a LiveUSB. Even better for giving various different flavours a try, as you can dispose of the installation afterwards should you not like it.

Note that on a decent/fast machine, it may be more preferable to **install Ubuntu in a virtual machine**, as you will not have to leave Windows for this.

If you’re a person who tends to store all their important files aside from the main OS drive, and don’t mind the potential data loss from a power loss, this is a quick and easy way for you to install Ubuntu **dual boot** without having to mess up your partitioning.

And – lastly – **because you can!**

## I’m convinced – How do I WubiUEFI up my PC?

Pop over to Hakuna-m’s GitHub page to find the WubiUEFI installer downloads.

[Wubiuefi](https://github.com/hakuna-m/wubiuefi/wiki)

A lot of work has been put into supporting a vast array of BIOS and distributions, but b**efore continuing** [check out this FAQ](https://github.com/hakuna-m/wubiuefi/wiki/FAQ#how-can-i-check-in-windows-if-windows-is-installed-in-uefi-mode-with-secure-boot-) entry to find out if you have secure boot enabled. If you do, you may want to read the wiki entry on working with secure boot as it may get technical and is not for the faint-hearted.

The links will take you to the release you desired. Download the .exe file from under Assets, and give it a run. Fill in the details of which distro you want, what size and where to store the files, the system will begin to download and prepare your Linux distribution.

If your connection is slow, you may get an error when setup begins. In which case the developer recommends pre-downloading the ISO from the flavour’s website, and keeping it in the same folder as the installer. In which case it’ll use that instead of downloading one.

If all goes well and you reboot, you may end up in the Linux system. **Don’t panic!** Windows hasn’t gone anywhere – first boot on EFI systems will load up Linux, and subsequent reboots will load Windows first.

Let the installation finish and you’ll now have the option of Windows or Ubuntu on your Windows/UEFI bootloader! Neat!

Bored of Linux? Pop open Uninstall programs and features, and remove Ubuntu. It’s that simple.

### There’s no option for Ubuntu on reboot…

Some UEFI systems will handle the OS choice itself, which is especially true of **store-bought machines, new motherboards and laptops**. When you boot and the manufacturer logo appears, but **before** the rotating dots do, repeatedly press either Esc, Del, or F12. One combo will eventually boot you into a menu that will ask what you wish to start, with Ubuntu hopefully being an option.

### I got a big ol’ Access Denied error

I’ll pass you over to their [Wiki page which covers this in detail](https://github.com/hakuna-m/wubiuefi/wiki/FAQ#why-does-a-blue-screen-with-access-denied-error-appear-). Prepare to get technical.
