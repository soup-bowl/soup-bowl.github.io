![image](https://user-images.githubusercontent.com/11209477/147856239-c7eb65c9-ba89-44fa-bf32-1e68568dc48b.png)
The main **[soupbowl.io](https://www.soupbowl.io)** website, but in automatic build-and-deploy [Jekyll][j] flavour.

## 🧪 Compiling with Jekyll
Installation of Ruby, Gem, Jekyll, etc is **not necessary**, as the **Docker Compose** script included with the repository will run the process for you. Upon running `docker-compose up`, the `_site` directory will be created and re-populated upon each edit.

## NGINX Configuration
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
}
```

[j]: https://jekyllrb.com/
