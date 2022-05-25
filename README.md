# Soupbowl Website

![image][h]

![Website](https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Fsoupbowl.io)
[![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fsoupbowl.io)](https://securityheaders.com/)
[![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade-score/soupbowl.io?publish)](https://observatory.mozilla.org/analyze/soupbowl.io)

The main **[soupbowl.io][s]** website, but in automatic build-and-deploy [Jekyll][j] flavour.

This site is currently hosted using **[Cloudflare Pages][c]**.

## 🧪 Compiling with Jekyll

Installation of Ruby, Gem, Jekyll, etc is **not necessary**, as the **Docker Compose** script included with the repository will run the process for you. Upon running `docker-compose up`, the `_site` directory will be created and re-populated upon each edit.

## Cloudflare Pages Setup

Custom changes for CloudFlare support:

* `_redirects` file for setting up [Pages-syntax redirections][cr].

## NGINX Configuration

**This is legacy and does not reflect the latest setup.**

The current configuration for this site is as follows:

```
server {
	listen 80;
	listen [::]:80;
	server_name beta.soupbowl.io;
	return 301 https://$server_name$request_uri;
}

server {
	include snippets.d/soupbowl-cert.conf;
	add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
	server_name beta.soupbowl.io;
	root /www/beta.soupbowl.io;
	index index.html;
	error_page 404 /404.html;

	location / {
		try_files $uri $uri.html $uri/ $uri/index.html =404;
	}

	location = /404.html {
		internal;
	}
}
```

* First `server` block is to enforce HTTPS.
* First `location` block is to catch URLs that do not end in '.html' and try them as if they did.

[h]:  https://user-images.githubusercontent.com/11209477/147856239-c7eb65c9-ba89-44fa-bf32-1e68568dc48b.png
[s]:  https://www.soupbowl.io
[c]:  https://developers.cloudflare.com/pages
[cr]: https://developers.cloudflare.com/pages/platform/redirects
[j]:  https://jekyllrb.com/
