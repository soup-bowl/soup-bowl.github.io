---
layout: page
title: Nutab
---

![](/assets/img/0170219.png)

## Description

Nutab replaces the background page with a beautiful full-sized wallpaper-esque image. In addition, the regular bookmarks bar is changed into an favicon dock, with an icon to load up the Chrome apps page.

Background photographs are sourced from the free and incredible [unSplash API](https://source.unsplash.com/).

## Installation

[![Available on the Chrome Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_340x96.png)](https://chrome.google.com/webstore/detail/nutab-new-tab-replacer/gakefcipoclekkcillingdakceienkkm)

The latest version release (0.1) is currently available (albeit hidden due to Alpha) in the Chrome store.

To test the latest development build extension, installation is relatively simple:

1.  Download the zip of this project and extract where desired.
2.  Compile LESS files (Supports autocompile syntax, and regular compilers).
3.  Enable Developer mode (checkbox in Extensions).
4.  Click ‘Load unpacked extension…’.
5.  Navigate the file browser to the extraction location.

This will allow you to test out the unpacked developer version of the app. Please note this software is in alpha and you may experience issues. Please let me know via GitHub issue tracker and I will have a look accordingly.

## How to use

Once the extension is installed and activated, it should be running from the get-go. This will immediately take over your new tab page.

While the search bar isn’t there for this extension, the search feature still exists. When the new tab opens, simply type straight away and the familiar UI will appear. Otherwise, click on the address bar rather than the old Google search bar and the same thing will happen.

To change the bookmark bar layout, open up the bookmark manager (ctrl-shift-o) and edit the layout of ‘Bookmarks Bar’ folder. The tab page will adhere to the layout found in this folder, which includes showing the first level of subfolders. When hovering over a bookmark, the ‘type to search’ text will change to the name of the bookmark (no named bookmarks will show the URL instead).

---

[Source code](https://gitlab.com/soup-bowl/nutab)

:arrow_left: _Back to [projects]({% link projects/index.md %})_.
