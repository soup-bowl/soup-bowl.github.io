---
layout: post
title:  "Replace LAMP with Docker, the Easy way"
---

**Just about to install LAMP, XAMPP, or MAMP? Stop. Right. Now.** Docker’s gotchu, fam.

![](https://media0.giphy.com/media/lRmjNrQZkKVuE/giphy.gif)

LAMP stacks are great. They are an absolute fundamental to development, unless you enjoy the thrill of writing your code on your production environments.

Seriously, LAMP is the absolute fundamental in the toolbox for website development.

But **do not install it**.

Cancel that download, uninstall that software. Because there’s a **better solution**.

## :cry: Problems with LAMP

LAMP (XAMPP, MAMP, etc included) kits you out with all the essentials needed for running a website. Web server, language runtime and database. It can come with all the additionals you may need such as email and request logging.

Sounds good. So what’s wrong?

An immediate problem here is that the package you downloaded was tailored for your machine. This is especially a pain point for **Windows**, which will grab Apache compiled for Windows. More than likely you’ll be deploying to a server running **Linux**, in which case the environment already does not match. Mac is a lot closer, but is built on BSD which is still **not Linux**.

The chances of hitting a problem due to mis-matched environments is low, but when dealing with complexities such as encoding, you may experience a problem here.

Oh no, you got a cryptolocker virus! You backed up your code like a good human, flipped the bird at the locker screen, and bought a new laptop. Hooray!

You spend some time to install your chosen LAMP stack again… Wait, why isn’t it working…

![](https://media1.giphy.com/media/heIX5HfWgEYlW/giphy.gif)

Here’s a joyful problem – differences in environment. This can be painful when sharing code, as your great new changes are broken on someone else’s machine. There could be a whole range of causes; The LAMP build you now have has a tiny build problem, Dave gave you a corrupted font file, or you didn’t realise you’re using PHP 5 instead of PHP 7.

Wouldn’t it be great if you could have an environment that each machine could share? This way the machine is **identical** on each machine, and does not experience this kind of machine-limitation?

Well I have just the solution for you!

## :whale: Docker!

**Docker** is complicated, so I will keep things short and brief. Feel free to shout at me in the comments for it.

Docker runs a small **server** on your machine, which can run server software as **containers**. This will split out the tasks into various mini-servers, but **share the resources** that each container can use. The minature server is set up by your instructions, and these instructions can be shared with others, rather than lugging a whole VM with you.

So with Docker, we can write a file that tells Docker what stuff we need to work our development site, and it will do all the heavy lifting to give you the environment that you need!

### ooft, my head…

Docker is complex. However, you don’t need to necessarily _understand_ how it works. This guide will cover the basics needed to achieve what you want, and then you can expand on your learning if you want!

## :musical_score: Docker Compose

Here’s a script, **docker-compose.yml** –

```yml
version: '3.6'
services:
	db:
	image: mysql:latest
	environment:
		MYSQL_ROOT_PASSWORD: password
	www:
	depends_on:
	- db
	image: php:apache
	volumes:
	- "./www:/var/www/html"
	ports:
	- 8080:80
```

Now what does this do?

*   Created two containers – www and db.
*   Grabs the latest Dockerhub images of [PHP](https://hub.docker.com/_/php) (using Apache) and [MySQL](https://hub.docker.com/_/mysql).
*   Sets them up based on their default configs.
*   MySQL sets the admin password to ‘password’ based on our environmental variables.
*   Requests from our local machine port 8080 (http://localhost:8080) are fed into port 80 of our PHP container.
*   A directory called ‘www’ is created in our docker-compose directory. Anything in this folder is now in the web root of our container.

### What’s Docker doing?

This powerful little script has just made you a server on your machine that would’ve otherwised taken some time to setup and configure! Yay Docker!

The Docker-compose also creates a **network adapter** for these containers. What that means is that they can freely talk to each other, but your PC can only see what ports you have bound to it. With the above config, you can access port 80 on your www container easily, but none of the rest. However, the www container can happily chat to the db container without a hitch.

Something important to note – When a Docker container is removed, all the data stored within it **is lost**. if you wish to keep it, set up a volume binding – like our www container. Anything stored on in a volume isn’t removed when the container dies. In my example, the database is **not persisted**. In the end example, I’ll show you how to keep it on container deletion.

You can modify the file to add more services if you wish. For example, let’s add mail!

```yaml
version: '3.6'
services:
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: password
  www:
    depends_on:
    - db
    image: php:apache
    volumes:
    - "./www:/var/www/html"
    ports:
    - 8080:80
  mail:
mail:
    image: mailhog/mailhog:latest
    ports:
    - 8081:8025
```

Simple! Using [Mailhog](https://hub.docker.com/r/mailhog/mailhog)‘s Dockerhub container, we now have a great development catch-all email server. We can access the GUI via http://localhost:8081, and configure the application to send email to hostname **mail** on port **1025**.

So we got web, db and mail. That’s all well and great. But how do you **use** it? Simple! Open a command prompt/terminal where your docker-compose file is, and run `docker-compose up`.

That’s it. Literally.

## :muscle: Full LAMP stack

Okay okay, enough with the lecturing. Here’s a full LAMP stack I whipped up earlier (where’s my Blue Peter badge?).

```yaml
version: '3.6'
services:
	db:
	image: mysql:latest
	command: --default-authentication-plugin=mysql_native_password
	environment:
		MYSQL_ROOT_PASSWORD: e9w86036f78sd9
	volumes:
	- "./database:/var/lib/mysql"
	db_pma:
	image: phpmyadmin/phpmyadmin:latest
	depends_on:
	- db
	ports:
	- 8082:80
	environment:
		MYSQL_ROOT_PASSWORD: e9w86036f78sd9
		PMA_USER: root
		PMA_PASSWORD: e9w86036f78sd9
	mail:
	image: mailhog/mailhog:latest
	ports:
	- 8081:8025
	www:
	depends_on:
	- db
	- mail
	image: php:apache
	volumes:
	- "./www:/var/www/html"
	ports:
	- 8080:80
```

Looks awful, right? [Here’s a highighted gist version.](https://gist.github.com/soup-bowl/f3880a446ea27f2088b4243d3e8f2c65)

This is what this bad boy does:

*   Creates a **MySQL Server**.
    
    *   Stored (persisted) in a folder called ‘database’ where your compose file is.
    
    *   The ‘command’ switches new MySQL back to the old auth type, supported by most PHP apps.
*   Creates a **phpMyAdmin** access point.
    *   Web GUI accessible on port **8082**.
*   Creates an **SMTP Mail Catcher**.
    *   Configure your apps to send emails to host **mail** on port **1025**, with no authentication.
    *   Web GUI accessible on port **8081**.
*   Finally, creates a **PHP (Apache) frontend**.
    *   HTTP accessible on port 8080.
    *   Uses content found in folder ‘www’ relative to where your compose file is.
    *   Loads last, after DB and Mail have been setup by Docker.

Run with `docker-compose up` and congratulations – You have a development **LAMP stack** running via **Docker**!

This will serve you for simple applications, but I absolutely insist that you edit, tinker and break this script to truely discover what Docker can give you. If you mess it up beyond belief, then simply run `docker-compose down`, and start again!

## :bug: More command info

`docker-compose` (`up`/`stop`/`down`)

Docker compose is the magical command that translates your yml configuration file into docker commands.

*   `up` runs the containers detailed in the config file (will create them, or start up `stop`ped containers).
*   `stop` pauses the containers, like clicking shutdown on your PC.
*   `down` stops and deletes your containers, ready to start fresh. **Data in volumes are not deleted**.
*   Bonus: `exec <container name> /bin/bash` lets you run Linux commands _within_ the container!

If your docker-compose file has a strange name, or isn’t stored where it expects, you can use `docker-compose -f /path/to/your/docker-compose.yml`. As yml and json are compatible, you an use this command to write your compose file in JSON notation.

Make sure when running these commands, your terminal is local to where the docker-compose file is. Also, my script will create folders relative to where docker-compose file is. You can modify the volume paths to change this.

## :+1: Closing Notes

The great level of flexibility with docker-compose files lets you think outside of the box. With a traditional LAMP stack, you would install it then stuff your PHP scripts into it’s www/htdocs directory. With Compose, you can actually create the docker-compose.yml inside your project directory, and tailor the script around it.

Confused? Say you wrote a WordPress plugin. You can craft your docker-compose to setup a full WordPress environment, and bind the project directory into the WordPress plugin dir. You can then access WordPress with your plugin **already loaded in**!

So get creative with your newfound Docker experience, and let me know what you achieve with Docker. I’m also by no means an expert, so if I’ve missed something please give me a shout and I’ll revision this with all the great stuff you find!

**28 May 2021 Edit:** latest-apache is no longer a supported tag. Thanks to [**Jan Overberg**](https://disqus.com/by/janoverberg/) in the comments for pointing this out.
