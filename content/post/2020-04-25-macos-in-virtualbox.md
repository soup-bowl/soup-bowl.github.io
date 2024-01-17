---
author: Casey (Soupbowl)
date: "2020-04-25T00:00:00Z"
image: /assets/img/Screenshot-from-2020-04-21-17-50-11-1024x831.webp
tags:
- Guides
- Mac
title: MacOS in Virtualbox. It just works.
slug: macos-in-virtualbox
use_disqus: true
---

**You can run MacOS in Virtualbox. Because? Because.**

In the [pursuit of Hackintosh](https://blog.soupbowl.io/category/mac/hackintosh/), you need a Mac. That’s well and great, but I didn’t want to screw around with my partner’s Macbook. So what if you want to sandbox something? Virtualbox!

I had **no expectations** that this was going to work. OS X has always been runnable in Virtualbox for a while, but the performance has normally been lacklustre. While it’s not exactly daily-driver level, the performance in Virtualbox wasn’t too bad!

**The macOS Virtualbox option is designed for _genuine_ Apple hardware. [You will not get community support](https://forums.virtualbox.org/viewtopic.php?f=1&t=92649) from Virtualbox if you have trouble with this process, as it’s against Apple ToS.**

**VMware** more your jam? [We’ve got this working in there too]({% post_url 2021-04-10-macos-in-vmware-yep-this-also-works %}).

## :thinking: What do I need?

You **need a donor Mac** to start this process. You will not need access to it permanently, but just during the process of creating an ISO for your VM to setup with. Else, you need:

*   A Mac to create an ISO with.
*   [MacOS Mojave installer](https://apps.apple.com/us/app/macos-mojave/id1398502828?mt=12) from the Mac App Store.
*   [Virtualbox](https://www.virtualbox.org/wiki/Downloads) (Windows, Linux or MacOS).
	*   [Virtualbox Extension Pack](https://www.virtualbox.org/wiki/Downloads#VirtualBox6.1.6OracleVMVirtualBoxExtensionPack) is **required**.
*   At least 4GB of RAM (8GB or more recommended).
*   40GB of free disk space (more preferred).
*   2 core CPU or more.

This guide will discuss installing **MacOS Mojave**, however installation process should be similar for all **MacOS versions**.

:warning: At the time of writing, **Virtualbox** and **Hyper-V** cannot co-exist on Windows. MacOS is also **not installable** on Hyper-V. I use Linux in my screenshots as I use Docker on Windows. This also includes **Windows Subsystem for Linux**, which tripped me up from installing.

## :cd: Creating the ISO

Virtualbox installs generally prefer to use an ISO file, which unfortunately will require some handiwork to get a hold of. Persevere and you will get there!

On the MacOS machine, [download the Mojave installer](https://apps.apple.com/us/app/macos-mojave/id1398502828?mt=12). Don’t worry about actually **running** this application, as we’re going to use some terminal magic to build the ISO from the package.

**This process is not affected by [MacOS Installer expiry](https://support.apple.com/en-us/HT208052).** **If your MacOS installer has expired, you can continue with this guide.**

Once the package has been downloaded, pop open **Terminal** (Utilities folder in Launcher), and run the following commands:

`hdiutil create -o /tmp/Mojave.cdr -size 8000m -layout SPUD -fs JHFS+`

This will create a virtual ‘disc’ stored in your temporary directory. This is what we’ll stuff the Mojave installation stuff into.

`hdiutil attach /tmp/Mojave.cdr.dmg -noverify -nobrowse -mountpoint /Volumes/installer_goes_here`

Now MacOS can ‘see’ your disc as an actual disc, ready for writing to!

`asr restore -source /Applications/Install\ macOS\ Mojave.app/Contents/SharedSupport/BaseSystem.dmg -target /Volumes/installer_goes_here -noprompt -noverify -erase`

We’re now grabbing the installation DMG from within the updater package, and storing it within the disc image. **This will rename the disc image**, so don’t panic that ‘installer\_goes\_here’ has vanished.

Now, detach the image from our MacOS. You can just eject it like regular DMGs. If not, run the command:

`hdiutil detach /Volumes/OS\ X\ Base\ System`

(it may change since OS X is legacy. To check, run `ls /Volumes` and see if it’s there, renamed).

Now for the final process, let’s convert our CDR image to an ISO!

`hdiutil convert /tmp/Mojave.cdr.dmg -format UDTO -o ~/Desktop/Mojave.iso`

You should now have a file on the Mac desktop called ‘Mojave.iso’. Congratulations, you have your installation disc! Copy this over to where your Virtualbox is setup. **The Mac is no longer needed at this point**.

## :hammer_and_wrench: Setting up Virtualbox

:warning: Before continuing, install the [**Virtualbox Extension Pack**](https://www.virtualbox.org/wiki/Downloads#VirtualBox6.1.6OracleVMVirtualBoxExtensionPack), if you haven’t already. This comes with a special USB 3 driver that without, the Mac simply won’t see USB devices.

Virtualbox has the option for a MacOS virtual machine in it’s New VM dialog, but we will need to make further adjustments to make it truly Mac-ready.

Pop open Virtualbox, and Create a new Virtual Machine. Name this **MacOS Mojave**, and set it to **Mac OS X (64-bit)**.

{{< figure src="/assets/img/Screenshot-from-2020-04-25-02-57-54.webp" alt="Screenshot of the 'Create Virtual Machine' dialog from Virtualbox. In the screenshot, 'name' is set to 'MacOS Mojave', 'Type' is set to 'Mac OS X' and 'Version' is set to 'Mac OS X (64-bit)'" >}}

Set the **RAM** to **4096 MB** (or higher if you can achieve it!).

When creating the disk, you can use either format versions. **Dynamic** will not immediately take up the storage size you chose, whereas **Static** immediately reserves the chosen size for the VM. The latter is slightly better for performance.

{{< figure src="/assets/img/Screenshot-from-2020-04-25-02-58-52.webp" alt="Screenshot of the 'Create Virtual Hard Disk' dialog, with 40 gigabytes set to the storage size" >}}

Now you should have a new, primed MacOS machine. But you will need to run some commands now. **This can be hit-and-miss**, and may require some Google-fu. The following works for my **AMD FX** computer:

```
VBoxManage modifyvm "MacOS Mojave" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff
VBoxManage modifyvm "MacOS Mojave" --cpu-profile "Intel Core i7-6700K"
VBoxManage setextradata "MacOS Mojave" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"
VBoxManage setextradata "MacOS Mojave" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "MacOS Mojave" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"
VBoxManage setextradata "MacOS Mojave" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "MacOS Mojave" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
```

**Windows? Change `VBoxManage` to `"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe"` (if you didn’t change your Virtualbox install location).**

The above does the following, in order of command:

*   Sets a known CPU ID set that MacOS will recognise.
*   Especially for AMD machines, changes what MacOS sees as your processor to something it supports.
*   Tells MacOS you’re installing Mojave onto a **mid-2010 iMac**. You can change this to your preference.
*   These two specify a fake DMI, typically found in Apple PCs.
*   A device key to pass system checks.

Before starting the VM, open the VM settings and make the following changes:

*   System > Processor > Processor(s) is **2 or more**.
*   System > Acceleration > uncheck **Enable Nested Paging**.
*   Display > Screen > Video Memory is **128MB**.
*   USB > **USB 3.0 Controller**.
	*   If greyed/not there, you did not [install additions](#setup-vbox).

With all that done, we’re ready to start the VM!

You should be greeted with the following screen:

{{< figure src="/assets/img/Screenshot-from-2020-04-25-03-13-47.webp" alt="The 'Select start-up disk' dialog is shown, with the default 'host drive' currently selected" >}}

Click on the folder icon, and find your ISO created on the Mac before, then click Start.

And wait. yes, this process takes _a long_ time. If your installation stops, try googling the last output message to see if there is a community fix, or post below… Otherwise, this is generally a slow process.

If all has gone well, you should be greeted by the MacOS installer language selection. If so, you’re almost there! On the top menu, open **Utilities > Disk Utility**.

There should be a disk named **VBOX HARDDISK** or similar. This is the VDI you created during the setup process, and not your actual hard drive. So go ahead and full-erase this disk, with **Mac OS Extended (Journaled)** and **GUID Partition Map**.

{{< figure src="/assets/img/Screenshot-2020-04-25-at-03.45.51-1024x673.webp" alt="A screenshot of Disk utility on MacOS, intending to erase VBOX HARDDISK Media. The Name is set to Untitled, Format set to Mac OS Extended (Journaled), and scheme set to GUID Partition Map" >}}

Once the disk formatting has completed, close it down. You should now be able to start the installation!

{{< figure src="/assets/img/Screenshot-from-2020-04-21-16-01-47-1024x831.webp" >}}

Once this is complete and you filled all the required details in, congratulations! You’re running MacOS Mojave within Virtualbox!

{{< figure src="/assets/img/Screenshot-from-2020-04-21-17-50-11-1024x831.webp" >}}

## :question: What works?

#### :heavy_check_mark: Does

*   Screen (No 3D).
*   Regular input methods (mouse sharing).
*   Networking.
*   USB devices.
*   Mac App Store.

#### :x: Does not

*   Full graphics.
*   Audio.
*   Guest additions.

At the end of the day it’s still a **virtual machine**, and a technically unsupported one at that. However, considering the matter it’s still impressive how Virtualbox can cope with MacOS.

Files can be shared using typical Windows share features. If you share a folder on your network from your host machine, your Mac VM should be able to connect to it.

## :star: Special Thanks

This required **a lot of Googling**, and these are the people who saved me at the end of the process!

*   [This How-to Geek article](https://www.howtogeek.com/289594/how-to-install-macos-sierra-in-virtualbox-on-windows-10/), that started this whole process. They have a much better step-by-step guide on this!
*   **Forchia** on Reddit for a [different instruction set](https://www.reddit.com/r/hackintosh/comments/barlbo/stuck_at_end_checkhibernate_in_high_sierra_1013/euco32a/).
*   **miranhasan** on Reddit for [AMD processors](https://www.reddit.com/r/hackintosh/comments/9xvspq/stuck_at_end_randomseed_on_mojave_in_virtualbox/eigwon3/).
*   **kvotheV** on Reddit for [disabling nested paging](https://www.reddit.com/r/hackintosh/comments/aij0v0/stuck_at_start_randomseed_on_mojave_in_virtualbox/ekmy83w/).

## :bug: Troubleshooting

### You get Guru Meditation, “A critical error has occurred while running the virtual machine and the machine execution has been stopped” when machine gets to RandomSeed.

{{< figure src="/assets/img/Annotation-2020-05-22-183438-2.webp" >}}

This is a difficult one, and will require investigation. I checked the logs as the error message said, and discovered:

> HM: HMR3Init: Attempting fall back to NEM: AMD-V is not available
>
> If you’re on an Intel processor, it’ll likely say VT-x instead.

Obviously, check if this is enabled. If you’re on a legacy BIOS computer, it’s a straightfoward scan for AMD-V/VT-x in your settings. If it’s UEFI, you’re gonna have to Google it.

Strangely, on my machine it was **enabled**. Supposedly Virtualbox and Hyper-V can run side-by-side, so at this point I decided to **remove Hyper-V**, to see if that would improve. It didn’t, but I forgot something. For this to work, **you must turn off Windows Subsystem for Linux**!

I completely forgot that WSL uses Hyper-V, and apparently still does when it’s disabled. Unfortunately, it would seem (for me at least) you need to trade it off for macOS in Virtualbox.

_I will retest this when WSL2 is launched_.
