---
layout: page
title: Pressify
---

![](/assets/img/devices-pressify.webp)
{: .article-image}

**Did you realise WordPress sites come pre-rolled with an epic API???**

Pressify uses the power of the **[WordPress REST API](https://developer.wordpress.org/rest-api/)** ([JS library](https://github.com/WP-API/node-wpapi)) and **[Progressive Web Apps](https://web.dev/progressive-web-apps/)** to form a portable app viewer for WordPress-based sites.

Check it out in action!

For a site to work, it has to meet the following criteria:

* **A WordPress site** with the **WP-JSON API** endpoint visible.
  * This is 'on' by default, but some security plugins suggest disabling it for 'security' reasons.
* The API is **not** behind a **strict CORS policy**.
* The WordPress site hasn't customised the default access policies.
  * A typical custom config will be to require authentication for viewing endpoints, which this tool will not handle.
  * The tool is built to handle these scenarios, but will degrade the experience.

<div class="aligncentre">
	<p class="button"><a href="https://pressify.app">Website</a></p>
	<p class="button"><a href="https://github.com/soup-bowl/pressify">Source</a></p>
</div>

:arrow_left: _Back to [projects]({% link projects/index.md %})_.
{: .aligncentre}
