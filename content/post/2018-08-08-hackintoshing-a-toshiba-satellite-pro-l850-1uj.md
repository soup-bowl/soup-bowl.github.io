---
author: Casey (Soupbowl)
date: "2018-08-08T00:00:00Z"
image: /assets/img/IMG_20180803_134221.webp
tags:
- Hackintosh
- Mac
title: Hackintoshing a Toshiba Satellite Pro L850-1UJ
slug: hackintoshing-a-toshiba-satellite-pro-l850-1uj
---

**:warning: This project has been resumed. [Please see the latest version of this]({{< ref "/post/2020-04-25-toshiba-satellite-pro-l850-hackintosh-revisited" >}}).**

While I am a technical person, the Hackintosh community is scores ahead of what I know. The work put in by the awesome community supporting the movement for macOS/OS X on other machines is incredible. I’ve watched the progress since I was 11, but never branched into it. Recently, it all changed.

![macOS High Sierra about screenshot, showing the version details](https://blog.soupbowl.io/wp-content/uploads/2018/08/macOS.webp)

I write this now on a Hackintosh **laptop**. This isn’t any old laptop however… This is a laptop that is not _technically_ supported. I googled for hours to see the achievements of other Satellite owners and found nothing. However, with trial and error (and years of configuring crap experience), I was graced with the Apple logo appearing on my non-Apple laptop.

[Laptop Specification (PDF)
](https://blog.soupbowl.io/wp-content/uploads/2018/08/Satellite-Pro-L850-1UJ.pdf)

**Notice:** _Since 2019 I have removed Hackintosh from my laptop, this is primarily as I have received by MacBook White back and so now use the laptop for Linux distributions instead._

**Notice:** _Since 2020, my MacBook white exploded so I’ve returned to this, [which can be seen here](https://blog.soupbowl.io/2020/04/toshiba-satellite-pro-l850-hackintosh-revisited/) (Hackintosh, not my laptop exploding)._

## Back Story

I recently traded my trusty MacBook White mid-2010 for my girlfriend’s university laptop Toshiba Satellite Pro L850. Since leaving uni she no longer needed a laptop in general, and was happy to take a lower-spec Apple machine to compliment her iPhone. Receiving a much higher spec machine in return, we swapped. I immediately (no joke – first **two hours** of receiving it) turned it into a Linux machine, using Ubuntu and later, elementaryOS.

I then wished to contribute to a Windows extension development, in which I needed Windows again for. eyeing up the old trusty Mac again, I realised I was in the best position to Hackintosh – pre-existing Mac and a machine that can be clean-wiped. And so it began.

## How?

I would like to take this moment to say this would not be possible without the amazing community work that goes into it. I simply configured this laptop to use Hackintosh, the real developers and hard-workers can all be [found at the TonyMac86 community](https://www.tonymacx86.com). If you’re impressed by this, or tried it yourself, please direct all the praise to those amazing people.

### What Does & Doesn’t Work

Take this with a pinch of salt, as Apple never intended for you to install this. Whatever does work is an absolute miracle, and often smaller problems can be overcome with additional hardware.

![](https://blog.soupbowl.io/wp-content/uploads/2018/08/IMG_20180802_222431.webp)

### Does Work

*   Main Display Graphics (Intel HD 4000) with Clover config.
*   Keyboard (set to ISO, keys don’t match up 100%) and trackpad.
*   Wireless Internet (temporarily, resorted to dongle).
*   Battery status.
*   USB ports (you wouldn’t believe how problematic that can be).
*   CD/DVD drive.
*   Webcam.

### Doesn’t Work

*   Laptop Detection, for power management (In Progress).
*   Brightness Controls (In Progress).
*   Standby (Kernel Panic).
*   Brightness controls (Lucky for me, seemingly defaults to mid brightness).
*   Sound (Untested, does seem to be fixable).

For most of the non-working elements, any USB peripherals claiming to be Mac-compliant _should_ work in their place. Your experience may differ.

### Quick Steps

*   Enabled UEFI, but disabled secure boot in BIOS.
*   Download the macOS High Sierra installer from the App Store, on the existing Mac.
*   Download and run [Unibeast](https://www.tonymacx86.com/resources/unibeast-8-3-2.383/) (set for UEFI).
	*   Also copy [Multibeast](https://www.tonymacx86.com/resources/multibeast-high-sierra-10-3-0.388/) onto USB.
	*   While EFI is apparently mounted, I copied over the neccessary kexts and [this configuration file](https://github.com/RehabMan/OS-X-Clover-Laptop-Config/blob/master/config_HD4000_1366x768.plist) into the CLOVER directory (don’t replace the existing config.plist).
*   Make a cup of tea.
*   Drink said tea.
*   Plug USB Stick in Toshiba, repeatedly tap F12 on boot, and boot via USB.
*   In Clover, go to options, config, and select the configuration you copied earlier (most likely, the currently deselected one).
*   Select ‘Boot from Install macOS High Sierra’.
*   Wait (another tea moment) for macOS to start.
*   Open Disk Utility (click View > Show All Devices at the top).
*   Select TOSHIBA and click erase.
	*   **I erased the entire hard drive**. If you wish to keep stuff or dual boot, please see a guide for dual booting as this will **erase everything**.
*   I chose single HFS+ partition (I named it the classic Macintosh HD), with a GUID partition map.
*   Once complete, run the installer.
*   Once finished, boot via USB stick again.
*   Same again with Clover, this time select ‘Boot from <partition name>’.
*   Congratulations – You’re running macOS!
	*   You will be reliant on the USB key to boot. Check out Remove USB Reliance to stop doing this.
*   (Optional) [Setup Windows dual boot](https://hackintosher.com/guides/hackintosh-dual-boot-windows-10-and-macos-high-sierra/).

Many, many, many steps to go through, but so long as everything is done correctly, this should be a completely rewarding experience afterwards.

## Required Kexts

[Kexts](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KEXTConcept/KEXTConceptIntro/introduction.html) are basically driver packages used by macOS to understand what your various input devices are telling it. Without usable kexts, if macOS doesn’t know what a device does it will simply ignore it. There’s no Windows Update to grab them for you.

Clover and Unibeast does a Hell of a job packaging all the essentials in to your USB key, but especially for this laptop there are some missing essentials. Most notably, the keyboard and trackpad won’t work, which can make things slightly problematic.

The following are the kexts I have successfully added and used with my installation:

*   [Lilu](https://github.com/acidanthera/Lilu/releases) – Dependency for most third-party driver kexts.
*   [VoodooPS2Controller](https://bitbucket.org/RehabMan/os-x-voodoo-ps2-controller/downloads/) – Enables keyboard and trackpad post-Clover.
*   [ACPIBatteryManager](https://bitbucket.org/RehabMan/os-x-acpi-battery-driver/downloads/) – macOS can see the battery now.
*   [ATH9KInjector & fixup](https://github.com/black-dragon74/ATH9KFixup/releases) – Boot arguments not necessary.


Instead of installing them on the system, I opted (and is not recommended) to install them into Clover. Clover will inject these on boot, so you never need to install them in Mac and risk update breakage. The big downside however is that you risk breaking the boot process, which can make things tricky to resolve. My personal approach is to try riskier kexts on the USB Clover first, and if successful I then copy them to the HD Clover. You can also tell Clover to boot without these kexts, but this may leave FakeSMC behind and refuse to boot.

If you wish to install kexts to Clover, then [grab this utility](https://www.tonymacx86.com/resources/efi-mounter-v3.280/) to mount your EFI partition. Then you can whack your additional kext files into **CLOVER > kexts > Other**. Clover will then inject these into the boot process.

![](https://blog.soupbowl.io/wp-content/uploads/2018/08/Untitled.webp)

## Boot via Hard Drive

If you haven’t already got frustrated about needing to boot via USB, then your patience knows no bounds. However, you can set up Clover to reside on your main hard drive EFI partition rather than just the USB drive.

Personally, if you can do so I would recommend either leaving the USB drive as it is or taking an image backup after successfully being able to boot via Hard Drive. The reason being is that you can use this memory stick as a rescue device, and boot your laptop again in case a faulty configuration or a software update kills the boot process.

In the quick steps you would have a copy of Multibeast if followed to the letter. You can use this to modify your Hackintosh configuration, and one of the major features is the ability to install Clover on the working drive.

In Multibeast, click on Bootloader, and then Clover UEFI (Legacy if you did not enable UEFI). Then click build. Once finished, your EFI partition on your main disk will have its own bootable Clover. Don’t stop just yet though.

Plug in your bootable USB Installer drive and use the EFI Mounter utility to mount the EFI partition on your USB drive. Grab both the config.plist you select on boot and all the kexts from ‘Other’. Now eject the USB Drive, and run the utility again to mount the EFI partition of your hard drive. Simply copy these files to the same places they were at on your USB drive.

So far, on each boot up I currently go into Config and change the config selection. There are ways to modify the main config to boot straight into macOS, however all my config file modifications ended in disaster, so I’ve kept it operating this way.

## Personal Verdict

Hackintosh deserves a new name. While originally it was a small list of supported machines, today the amount of eligible machines is insane. As long as the system remains stable to use, then I would absolutely continue to use macOS as my primary.

If you have a spare laptop and technical expertise, I would totally recommend trying it out. The experience is rewarding, and slightly baffling at the same time. Nothing is weirder than seeing the macOS login appear without the use of virtualization technology.

_Last Changed: 25th April 2020 (now tracked elsewhere)._
