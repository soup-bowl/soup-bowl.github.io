---
layout: page
title: Chromeboard
---

{:refdef: class="article-image"}
![](/assets/img/79EK6Hx.webp)
{: refdef}

Using a dedicated extension page, the extension will cycle user-selected websites continuously. Intended for wallboards that cycle through pages on display.

## Installation

**UPDATE (2018/06/08)**: Chromeboard has been [removed from the Chrome Web Store due to copyright infringement]({% post_url 2018-04-23-chromeboard-an-experiment-killed-by-security %}) (who _didn’t_ see that coming?). After rebranding this project will be renamed and reuploaded.

The latest version release (0.3.2) is currently available in the Chrome store.

To test the latest development build extension, installation is relatively simple:

1.  Download the zip of this project and extract where desired.
2.  Compile LESS files (Supports autocompile syntax, and regular compilers).
3.  Enable Developer mode (checkbox in Extensions).
4.  Click ‘Load unpacked extension…’.
5.  Navigate the file browser to the extraction location.

This will allow you to test out the unpacked developer version of the app. Please note this software is in alpha and you may experience issues. Please let me know via GitHub issue tracker and I will have a look accordingly.

## How to Use

Once installed, a new icon will appear to the right of the Chrome address bar, called ‘Chromeboard’. Clicking this will take you to the page scroller. Hidden at the top right on this page is the settings button represented by a cog (also reached via ‘Options’ in Extensions). Click ‘Add Entry’ and type in a full URL (including HTTP/HTTPS) and save, and Chromeboard will show them in a loop. You can add as many sites to the rotation as you want.

## Known Issues

### Some common/popular websites do not show up

Unfortunately this can be a limitation issued by the website. This extension uses iframes to show the corresponding website content in the tab page. However, websites have a right to issue a header request blocking such iframe embeds. As such, the extension will simply display a blank page.

To determine if this is the cause, try refreshing the tab page with inspector console open. If you get “Refused to display in a frame because it set ‘X-Frame-Options’ to ‘SAMEORIGIN'”, then this page will unfortunately not allow embedding.

### Icons seem to have disappeared.

This is a known issue with the extension itself ([#15](https://github.com/soup-bowl/Chromeboard/issues/15)).Until this issue has been resolved, simply refreshing the page (F5) is enough to bring them back. This only seems to happen on leaving settings or first opening, so a refresh tends to aleviate the problem.

### How can I use this headless (kiosk) on a single-purpose device?

Once the extension is installed, clicking on the icon takes you to the tab rotation page. Drag the app page icon (to the right of ‘chrome-extension’, a circle with an i in it) to the home button to set it as your homepage, or alternatively copy the address and set it as your homepage in options. Now when you re-open Chrome, it should immediately go to the tab rotation page.

For Windows, create a batch script (wallboard.bat) and store this command in it. Since Chrome is not stored in the global path, you will need to add either chrome to the user/system path variable, or store the full path of chrome.exe in the batch script like so:

    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -kiosk --disable-session-crashed-bubble --disable-infobars


Alternatively, for a Linux machine, create a shell script to execute the following command (assumed Chromium, change if necessary).

    chromium-browser -kiosk --disable-session-crashed-bubble --disable-infobars


This will open Chrome/Chromium in kiosk mode, and hopefully open the rotation page once loaded. To escape, press ALT-F4.

---

[Source Code](https://github.com/soup-bowl/chromeboard)

:arrow_left: _Back to [projects]({% link projects/index.md %})_.
