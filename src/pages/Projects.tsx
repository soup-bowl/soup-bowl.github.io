import { useEffect } from "react";
import { PageBody } from "../components/Layout";
import { ListingItem, ListingItemGroup } from "../components/Listings";

export default function Projects() {
	useEffect(() => { document.title = 'Projects - Soupbowl Portfolio' });

	return (
		<PageBody>
			<h1>Projects</h1>
			<ListingItemGroup>
				<ListingItem
					title="What's This?"
					url="https://github.com/soup-bowl/whatsth.is"
					image="https://raw.githubusercontent.com/soup-bowl/labs/main/_img/whatsthis.png"
				>
					<p>
						An initial experiment of mine exploring JavaScript and React. This uses a combination of
						different front-end compatible libraries to provide a toolbox of essential functions for a
						developer, and explores the possibilites of a Progressive Web Application.
					</p>
				</ListingItem>
				<ListingItem
					title="Pressify"
					url="https://github.com/soup-bowl/pressify"
					image="https://raw.githubusercontent.com/soup-bowl/labs/main/_img/wapp.png"
				>
					<p>
						Another React experiment, this time utilisng the APIs that come pre-rolled into default
						WordPress installations. I discovered at a WordPress Meet-up that lots of people don't realise
						that WordPress has a built in powerful REST API, and this helps to demonstrate by providing an
						app and/or RSS reader UX.
					</p>
				</ListingItem>
				<ListingItem
                    title="WordPress Simple SMTP"
					url="https://github.com/soup-bowl/wp-simple-smtp"
					image="https://soupbowl.io/assets/img/wpsmtp-scrot.webp"
				>
					<p>
                        My years of being a professional WordPress developer were often frustrated by the sheer amount
						of spam you recieved from installling a plugin. This was compacted when I found similar garbage
						when just wishing to configure SMTP. This plugin was made to add in what I felt was missing, but
						add it in WordPress-styling, like it was native. This also has environmental override support for
						deployment goodness.
                    </p>
				</ListingItem>
				<ListingItem
					title="Modoki Firefox"
					url="https://github.com/soup-bowl/Modoki-Firefox"
					image="https://user-images.githubusercontent.com/11209477/192164979-31f7c725-87c4-4513-aaed-d2c52a17a9b6.png"
				>
					<p>
						Inspired by the Modern Modoki theme I used for many years on Firefox 3 era, and based upon my
						my favourite Netscape decade theming, this userChrome style theme aims to bring this classic theme
						back to Firefox 80 and beyond.
					</p>
				</ListingItem>
			</ListingItemGroup>
		</PageBody>
	);
}
