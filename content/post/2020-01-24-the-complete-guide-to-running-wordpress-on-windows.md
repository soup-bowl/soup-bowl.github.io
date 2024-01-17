---
author: Casey (Soupbowl)
date: "2020-01-24T00:00:00Z"
tags:
- Development
- Guides
- Windows
title: The Complete Guide to Running WordPress on Windows/IIS
slug: the-complete-guide-to-running-wordpress-on-windows
use_disqus: true
---

So you’ve discovered to your absolute horror that the WordPress site your company has inherited is running on Windows… on IIS?

{{< figure src="https://media.giphy.com/media/jquDWJfPUMCiI/source.gif" >}}

Before you stand up, throw your computer chair out the Window, maliciously eat your co-workers salad and enjoy it, or drop all the production databases, relax. We’ve got you covered.

## :confused: What’s the problem?

Good point. IIS (Information Internet Services) is the home-grown proprietary (for now) web server provided by Microsoft for Windows customers. IIS is fantastic at what it does, and can serve as an efficient web host as well as an absolutely golden reverse proxy server.

So what’s the problem?

### :angry: Support

{{< figure src="https://media.giphy.com/media/wofftnAdDtx4s/giphy.gif" >}}

Zilch. Nada. No dice. WordPress is absolutely **not** designed to be run on IIS and probably never will be. This doesn’t mean your server is going to burst into flames when you run the site, but means that when support is needed you can be damn well sure your first bit of advice will be “don’t use Windows”.

So don’t use IIS? Simple?

Except that currently NGINX is crippled on Windows ([source](https://nginx.org/en/docs/windows.html)), and Apache, which is thankfully available on Windows via unofficial channels… But you still have very little support since it operates differently being on Windows.

However, [WordPress requirements](https://en-gb.wordpress.org/about/requirements/) state:

> We recommend [Apache](https://httpd.apache.org/) or [Nginx](https://nginx.org/) as the most robust and featureful server for running WordPress, but any server that supports PHP and MySQL will do.

– so don’t lose hope just yet.

## :open_file_folder: The web.config File

If you’re coming from an Apache background, you might be used to a **.htaccess** file. Just like how .htaccess is not compatible with NGINX, it is also **not compatible** with IIS.

For each folder of importance to IIS, a **web.config** file will appear in the directory. This tells IIS what fancy features and involvement the folder has with web capabilities. It will store **everything** configuration-wise, so do be careful not to delete or corrupt this file.

web.config is an XML file, and can be easily edited in an editor of your choice. Once you get very comfortable with IIS, you’ll find yourself editing the file manually more often than using the GUI console. This will also to reduce the management overhead of changing IIS settings.

An example of useful properties stored in here are:

*   Priority list of the default index to load.
*   URL rewrite/redirect rules.
*   Request filtering, blocking and setting adjustments.
*   Directory over-riding of parential settings (e.g. PHP Version).

## :gear: Setting up WordPress

First you will need a database. It is recommended you have the database on a different server for performance and security reasons, but you can also have MySQL running on the same server as IIS.

**MySQL runs well on Windows**, and is very well supported. You shouldn’t expect much push-back in the way of configuring MySQL. However, if you wish to use **Microsoft SQL Server**, you may wish to check out [**Project Nami**](https://projectnami.org/).

Once completed, setup a database and access user like you would a Linux-based setup installation.

Also, while it’s best to always be running the latest version of Windows Server, please consider using a version **no later than IIS 10 (Windows Server 2016**). This is because older versions of IIS do not have support for HTTP/2. Technically speaking the _minimum_ requirement is IIS 7 (Windows Server 2008).

### :elephant: PHP on Windows/IIS

#### Prerequisites

You will need to [configure IIS to use CGI processing for IIS](https://www.iis.net/downloads/community/2018/05/php-manager-150-for-iis-10) (which isn’t enabled on default IIS installations).

You also need the **[URL Rewriting](https://www.iis.net/downloads/microsoft/url-rewrite)** [module for IIS](https://www.iis.net/downloads/microsoft/url-rewrite), unless you are planning on using those super ugly index.php URLs.

PHP is **fully supported** on Windows\*. To download PHP, visit their website at [windows.php.net](https://windows.php.net). You will also need the **C++ Redist 2019** which is found on the sidebar on their website downloads.

This guide will use FastCGI, which will require a **Non-thread safe version (NTS)** of PHP. Typically the first download listed in each PHP version on their site will be the ideal version for IIS.

Download the correct zip file and extract it to a place of your choice on your server (Program Files is acceptable). My choice is normally **C:\\PHP\\X.X.X** (version number).

If you’re planning on running any PHP tools such as WP-CLI, it would also be a good idea to add the above path to your system Path environmental variable.

To do so, open **Run** (Win key + R), and run `**rundll32 sysdm.cpl,EditEnvironmentVariables**`. Append the path to **Path** found under System variables.

#### Installing WP-CLI (optional)

Now is a good time to install [WordPress CLI](https://wp-cli.org/) if you’re planning on using it. They provide a [fantastic guide to setting up WP-CLI on Windows](https://make.wordpress.org/cli/handbook/installing/#installing-on-windows).

#### (Discontinued) Web Platform Installer – Easy

:exclamation: **The Web Platform Installer is sunsetting, due to be officially discontinued on 31st December 2022. This method is no longer recommended and users have already reported experiencing issues with the Web Platform Installer.**

**RIP WebPI – 2009 – 2022.**

Windows Server has an optional comonent called the **Web Platform Installer**. This neat application provides a collection of the most well-known and loved software packages, and provides super-easy methods of installing them. Guess what, WordPress included! You just need to install **IIS with CGI** first.

Create a Site as regular, and double-click on it. You should have an option in **Management** called **Web Platform Installer** (at time of writing, it’s a circular, orange download icon). Open this up, and a new panel will load up. Search for **WordPress**, click Add, then Install.

:question: **No Web Platform Installer?** It’s not installed by default. Click your server name in the Connections left-hand panel. In the now-visible right-hand panel, click on **Get New Web Platform Components**. Follow the Microsoft instructions and you’ll have the aforementioned button.

{{< figure src="/assets/img/1-1024x540.webp" >}}

Now for configurations, you should generally always separate up your servers (e.g. web and database are separate). But sometimes, you just want a get going quickly on a development site. This installer has a neat trick. If you do not have a database server, and the current machine doesn’t have MySQL installed, **it will create a MySQL server instance for you**!

{{< figure src="/assets/img/2.webp" >}}

If done correctly, you should be at this screen. It will by default try to create **localhost/wordpress**. Make sure you’ve got the right Web Site selected, and – if desired – the right subfolder configuration. If something is wrong, it will need to be changed manually afterwards.

Hit Continue, and go grab a coffee. When you return, **WordPress is installed**! Easy as that, you’ve got your first WordPress installation.

{{< figure src="/assets/img/5-1024x721.webp" >}}

For the technical information:

*   **Microsoft WebMatrix** is installed.
*   :exclamation: **PHP 7.1** is installed via **IIS Express**.
		*   A newer version of PHP is recommended.
*   A **global FastCGIModule** for PHP is created.
		*   This means all sites on your IIS server can run PHP code via this module. Change priority listings if you wish to run different versions.
		*   You can use the **PHP Manager** or manual process to over-ride this.
*   **MySQL 5.1** is installed, if no external database was provided.

#### PHP Manager IIS Plugin – Intermediate

{{< figure src="/assets/img/VirtualBox_windywoo_23_01_2020_22_13_53.webp" >}}

There is a plugin for IIS called **[PHP Manager](https://www.iis.net/downloads/community/2018/05/php-manager-150-for-iis-10)**, which is able to do most of the heavy-lifting for you in configuring PHP. This will enable you to register new PHP versions, adjust plugins, edit configurations and even split containers to different IIS versions as simply as possible via GUI.

Simply download their extension and install it on your server. When you next run IIS you will find a new PHP module on the snap-in.

You can register a parent PHP version and it will affect all children sites. If you register an alternative version on a child site, it will over-ride the parent and so on, in a hierarchical manner. Multi-version PHP, hooray a benefit!

#### PHP Manually – Advanced

{{< figure src="/assets/img/202001U2.webp" >}}

If you opt not to go for IIS manager (not a fan of community IIS modules), then you can still go ahead configuring PHP manually to the IIS container.

First you need to tell the FastCGI system about your PHP installation.

*   Open IIS.
*   Click on the root server (just below **Start Page** on the left pane).
*   Open **FastCGI Settings**.
*   On the right hand side, click on **Add Application…**
*   In Full Path, navigate to **php-cgi.exe** in your extracted php setup.
*   In **Monitor changes to file**, set this to your php.ini file.
*   Click on … on the end of the row named **Environmental Variables**.
*   Click Add.
*   Add **PHPRC** variable with the value of the **PHP installation path**, where your PHP-CGI file was above.
*   Create another variable named **PHP\_FCGI\_MAX\_REQUESTS**, and match it to the value in **Instance MaxRequests** (recommendation for both is **10000**).
*   Click OK.

Cool! IIS now knows that your PHP folder is a CGI process, it now knows how to handle requests to PHP with this processor. Now let’s set up the individual website to use PHP CGI.

*   Find your container in IIS (e.g. Default Web Site) and click it.
*   Open **Handler Mappings**.
*   On the right-hand side, choose ‘**Add Module Mapping**‘.
*   Add the following entry:
		*   **\*.php** for **Request Path**.
		*   **FastCgiModule** for **Module**.
		*   Path to your PHP CGI for **Executable**.
		*   Whatever you want for **Name**.
*   Head back, and go into **Default document**.
*   Add **index.php** to the list (your choice).
*   Test in your browser if PHP loads up.
		*   Try **index.php** file with `<?php phpinfo();`

If you do the above for the topmost entry (normally your machine name), it will **copy to all new containers**, so you don’t need to do this process for each site.

#### Recommended php.ini Configuration

The perfect php.ini configuration is very much a game of trial and error. Believe me, it’s difficult to find the best config balance when it comes to PHP, WordPress and Windows. Here are some essentials:

*   `cgi.force_redirect = 0` (essential!).
*   `fastcgi.impersonate = 1`
*   `extension_dir = **<Absolute path to install>**/ext`

**These are set when using PHP Manager**. This configures PHP to understand that it is operating via CGI mode. The second configuration also helps to link the PHP operations into how IIS works, enabling better interop between PHP and IIS.

The third is recommended especially if your PHP installation is not located on the C drive. Absolute stops PHP trying to interpret where the extension dir is, which is can get very wrong if not located on the C drive.

### Setting up WordPress

Now for an easy part – the WordPress installation! Thankfully this is as easy to do, if not easier than the Linux server counterpart.

Create your desired site in IIS. If you’re binding this a domain or subdomain, create a new site. Otherwise, you can create a subfolder (or virtual subfolder) in IIS to setup a subfolder WordPress installation.

In the folder you bound to the container, extract the WordPress installation zip (or use WP-CLI if installed earlier). If done correctly when you visit the URL in the browser you will see the good ol’ 5 minute installation screen.

Run through the installation as per a normal site, and **congratulations** – you have a WordPress site running on IIS!

{{< figure src="https://media2.giphy.com/media/uihiEh31AiOCQ/giphy.gif?cid=790b76113f3975ca802e55917a842138c9bf733a2d6fadaf&rid=giphy.gif" >}}

## :star: Special Thanks

In the hopes of keeping the information up to date and relevant, the following commenters below have helped keep me in check:

*   **Patrick Bates** for pointing out **Web Platform Installer**.
*   **John Wilkin** for pointing out I did not cover **web.config**.

## :information_source: FAQ

### **\* Did Microsoft drop support for PHP on Windows?**

{{< figure src="https://media3.giphy.com/media/SVgKToBLI6S6DUye1Y/giphy.gif" >}}

Microsoft have, community have not.

Microsoft have stopped _compiling_ PHP for Windows past PHP 8, so technically **yes**. However, community edition providers will still continue to make builds for the Windows platform.

SaraMG provides the [missing context in this Reddit post](https://www.reddit.com/r/PHP/comments/ho9dgq/microsoft_not_going_to_officially_support_php_8/). This is well worth checking out, as the community have been providing alternative options you can use post-official builds. We will update this entry with some recommendations once PHP 8 is released.

### I received an error: 500 The FastCGI Processed exited unexpectedly.

Each version of PHP for Windows depends on a **Visual C++ Redist** package, which is mentioned in the download title. Normally recieving this error means your system does not have the one it needs, causing the CGI process to error.

In each download segment [on the downloads website](https://windows.php.net/download/), check for **VCXX** (X being numerical). The left-hand sidebar will tell you which redistributable package you need and how to obtain it. Once installed, this error will stop.

If – for whatever reason – you are installing the **Legacy 5.6 releases**, download the **32-bit redistributable**, regardless of your server architecture type.

### I recieved an error: 500.21 Handler “xyz” has a bad module “FastCGIModule” in its module list.

{{< figure src="/assets/img/3-1-1024x721.webp" >}}

When installing **Internet Information Services (IIS)**, PHP runs through **CGI**. This lets IIS pass the processing of non-Microsoft language code to it’s relevant processor. For us, it enables IIS to chuck .php code at PHP.

This error simply means that the CGI module it uses (FastCGI) was not installed. This is easily fixed!

Open up **Server Manager**. At the top right, open up **Manage**, then **Add Roles and Features**.

Next next next it through until you get to Roles. In **Web Server (IIS) > Web Server > Application Development >** Check **CGI**. Click Install (or next until you can), and your IIS server should now support CGI, including FastCGI

{{< figure src="/assets/img/4.webp" >}}

### Pretty Permalinks, and .htaccess

WordPress is smart enough to know it’s on IIS, so when you go to adjust permalinks instead of creating **.htaccess**, they will create a **web.config** file, which is the IIS equivalent. If you need additional rules the IIS rewrite module can attempt to parse your htaccess file in the IIS module.

If you create a .htaccess file, **it will be ignored** – IIS rewrite can attempt to _convert_ these files, but not _use_ them.

### How do I disable xmlrpc via IIS?

In my years of WordPress, this only recently popped up for me – people abusing the xmlrpc.php interface. There’s a range of options to deal with this in WordPress, but they all involve WordPress loading. I personally think it’s better to use IIS to block the interface instead.

**Via web.config**

Locate the `<system.webServer>` block, and add this (normally at the bottom):

		<security>
			<requestFiltering>
				<denyUrlSequences>
					<add sequence="xmlrpc.php" />
				</denyUrlSequences>
			</requestFiltering>
		</security>

Any **contoso.com/xmlrpc.php** request will now serve a request denied error, instead of passing through to the interface. This stops WordPress processing said requests, therefore stop wasting processing power on these bogus requests.

### Upload issues unique to IIS WordPress 5.6-5.8 Multisite?

Between **WordPress 5.6 and 5.9** (the speculative fix date) there is a bug affecting multisites that [can cause media uploads to fail](https://wordpress.org/support/topic/iis-wordpress-5-6-multi-sites-file-upload-hang/). Since IIS isn’t an officially supported platform, the bug slipped past testing and has unfortunately been causing pain to IIS administrators.

[The plugin block posted by Joseph Dickson](https://wordpress.org/support/topic/iis-wordpress-5-6-multi-sites-file-upload-hang/#post-14754922) should help to alleviate the issue if you are being impacted. From the Trac report, there is a community maintainer discussion ongoing about getting Windows/IIS included in the auto-tests, and getting the bug fixed for WordPress 5.9.

### How do I set permissions?

The container will default to using the account **IUSR**, which won’t have access rights by default. For starting out, you could simply give **IUSR** full permissions to the folder, and your website will work. Updates will occur, cache will write, all gold.

{{< figure src="/assets/img/202001U1.webp" >}}

This sometimes does not work, in which an alternative you can do is change **Anonymous authentication** in **Authentication** on the container to Application Pool identity, and give **IUSRS** group full access.

Both of these are **not recommended** for production use, as in the event of a compromise the hacker will have full write access. You can [check out the guide on permissions](https://wordpress.org/support/article/changing-file-permissions/) from WordPress, as the permission fundamentals are similar.

### How do I enable HTTP/2?

**HTTP/2** is only supported in **IIS 10** or above, which requires **Windows Server 2016** or higher.

### How do I increase the runtime limits?

In **PHP Manager**, on the container you wish to adjust, click on **Set runtime limits**. This will show the php.ini config options to quickly change these limits. For everyone else, you can find the limits within php.ini like always.

If you wish to increase the **maximum execution time**, please note that both PHP and IIS track timeouts differently. As well as increasing this via either PHP Manager or php.ini, you will need to tell IIS too.

Pop over to the root (underneath **Start Page** on the left panel in IIS). Open **FastCGI Settings**, and find the CGI you wish to modify. Click edit, and you should see two settings called **Activity Timeout** and **Request Timeout**. Set these both to whatever limit you want, and make sure all three (inc. PHP’s **max\_execution\_time**) match. Your timeout should now be sufficiently increased!

### Should I choose Windows over Linux for WordPress?

**No**. Absolutely not.

### Can I hook WordPress into Microsoft SQL Server?

[**Project Nami**](https://projectnami.org/) is a fork of WordPress that is designed to work with **Microsoft SQL Server** in place of **MySQL**. This team has replaced all MySQL functionality and added some beneficial functionality from SQL Server. This is well worth checking out!

### Can I run multiple versions of PHP?

**Yes!** Arguably this is one of the only benefits of running PHP on IIS, you can run multiple PHP versions.

When you are looking at the **Module Mappings** segment (either site or server-wide), there should be an option on the right-hand side column that says **View Ordered List…**. **The topmost version of PHP will be the chosen version**, so use this to your advantage to change which version your site operates with.
