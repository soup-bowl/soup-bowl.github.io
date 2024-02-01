---
author: Casey (Soupbowl)
date: "2023-09-20T00:00:00Z"
tags:
- Development
title: How I sign my commits in Gitpod
slug: signing-commits-in-cde
---

**For absolutely no good reason, I sign all my commits to GitHub.**

My argument to myself is to prove "it is I, who committed!", but I don't do meaningful enough commits to warrant that.

In reality, I was curious by GitHub's Vigilant mode, so I decided to see if I can feasibly sign all my commits for that sweet, sweet "Verified" badge alongside my commits. This is really easily done and achieved with [GitHub's commit signing guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).

But I do a lot of my [development work in Gitpod now]({{< ref "/post/2023-02-13-a-year-of-cloud-code-in-review" >}}). Unlike GitHub Codespaces, Gitpod does not support automatic commit signing. Drat, do I abandon my utterly pointless plan? **No**, adapt and overcome!

So, how did I do this?

Simple. I create a GPG key, turn the GPG directory into a portable bytestream, store it in an environmental variable then use a Dotfile to unpack and register!

## 🔑 First, Creating the Keys

First, you want to create your GPG keys. [GitHub has a good guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) on how you would achieve this. You will want to be interacting with the resultant keys, so I'd recommend setting a directory you have access to, where the key will be created. For example:

```
mkdir ./gpg
gpg --full-generate-key --homedir ./gpg/.gnupg
```

(notice the homedir I've made still uses `.gnupg` - this is because the folder name will be saved, so make sure you keep this otherwise the unpack stage will not work as expected).

This is the funky part. To move this to our CDE, we can turn this directory into a string. If we smush our GPG directory into a Tar file, and encode the entire directory into Base64, we can make it movable like so:

```
(cd ./gpg ; tar -czvf - ./.gnupg | base64 -w 0)
```

This will return a huge string. This is the entire contents of your GPG directory!

Now we can head over to Gitpod, and [go into the Environmental Settings](https://gitpod.io/user/variables). Create the variable 'GNUGPG', with the access '*/*', and paste the base64 string response from above as the value.

{{< figure src="/assets/img/Screenshot_from_2023-09-20 19-55-38.webp" >}}

Nice - Gitpod now technically has a GPG key.

## 💻 Second, Getting Gitpod to Register it

Great, so now we have to unpack this key each time we create a Gitpod workspace? How is that any better? Well, what kind of cloud automated environment would this be if we couldn't automate it.

To get each workspace to return the GPG key back to a file state and register it, we can [leverage Dotfiles](https://dotfiles.io/) - A feature that [Gitpod supports](https://gitpod.io/user/preferences).

The concept behind this is that Dotfile repositories contain code that you execute upon each time you open a cloud environment (or anything that supports Dotfiles). Leveraging this technology, we can make sure that each workspace you make will unpack the GPG key directory and modify Git to accept the GPG key.

To do this, create your Dotfile repository in your SCM, and create the file `install.sh` with the following contents:

```sh
#!/usr/bin/env bash

set -eu;

# Setup GPG commit signing.
if [[ ! -z $GNUGPG  ]]; then
    rm -rf $HOME/.gnupg;
    (cd $HOME ; echo $GNUGPG | base64 -d | tar --no-same-owner -xzvf -);
    git config --global commit.gpgsign true;
fi
```

Let's break this file down:

1.  The `if` statement checks if we've defined a `GNUGPG` variable. If you've used Dotfiles elsewhere, we might not necessarily want the code to run.
2.  We then remove any existing .gnupg directory that might exist.
3.  Here we are untarballing the GPG directory into the GPG key location. This should mean the GPG directory is now there.
4.  Finally, we adjust Git settings to auto-sign commits. This will use the default GPG key, which should now be present.

And congrats, your new workspaces should now support commit signing. Obviously, **please test in a private/isolated repository before genuinely committing** to verify your GPG key has indeed registered correctly.

For more details, you can see [my personal Dotfiles repository](https://github.com/soup-bowl/dotfiles), as I keep it public. This **also contains a solution for SSH-keysigning** if that's more up your street. But otherwise, here's a quick way to get commit signing in Gitpod!

## How Safe is This?

As always, if security is your top priority, make sure you give your GPG key a strong password. Outside of that, the primary risks of this method is that **each workspace you create, the gpg directory is unpacked**. Typically this is fine as the workspace images Gitpod build are trustworthy and open-source. If however, you want to make a workspace with a custom image, you run the risk of the image being able to clone your GPG key directory. If this atypical use case is normal for you, you make wish to reconsider or use another method.
