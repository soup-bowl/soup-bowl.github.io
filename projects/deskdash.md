---
layout: deprecated
title: Deskdash
---
![](/assets/img/Screenshot_20210515_091230.webp)

**Computer and network information, always visible.**

After maxing out my computer on a full-screen application, I wondered if there was a way to get this information on an external device for monitoring. Unable to find a suitable solution, I made one. Using a Raspberry Pi, a screen, and some code.

Deskdash works in two parts, to get the visual application dashboard, and the hub of information.

## Dashboard

The Dashboard is a **Node.js Electron** application, using Bootstrap for a standardised visual interface. The ‘carousel’ aspect is actually powered by a typical website carousel, adjusted to show the entire page. Using some JavaScript wizardry, the application will load in all the applicable pages with a nice, tidy JSON configuration file.

## Communicator

The counterpart informational API, this **Python HTTP** application provides a low-overhead JSON API that contains system information and – optionally – network scan data that the Dashboard can access. Exchange is done with the option of an agreed secret key, so “can I have the WiFI password?” doesn’t lead to an unintended yield of information.

<div class="aligncentre">
	<p class="button"><a href="https://github.com/soup-bowl/deskdash">Dashboard</a></p>
	<p class="button"><a href="https://github.com/soup-bowl/deskdash-communicator">Communicator</a></p>
</div>

:arrow_left: _Back to [projects]({% link projects/index.md %})_.
{: .aligncentre}
