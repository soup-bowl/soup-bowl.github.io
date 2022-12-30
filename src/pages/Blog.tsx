import { useEffect, useState } from "react";
import { PageBody } from "../components/Layout";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IBlogPost } from "../interfaces";

export default function Blog() {
	const [items, setItems] = useState<IBlogPost[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => { document.title = 'Blog - Soupbowl Portfolio' }, []);

	useEffect(() => {
		const r = new Request('https://soupbowl.blog/feed.xml');
		fetch(r)
			.then((response:Response) => response.text())
			.then((response:string) => new window.DOMParser().parseFromString(response, "text/xml"))
			.then((response:Document) => {
				const items = response.querySelectorAll("entry");
				let collect:IBlogPost[] = [];

				items.forEach((item:any) => {
					let article = {} as IBlogPost;
					article.id = item.querySelector("id").innerHTML;
					article.title = item.querySelector("title").innerHTML;
					article.summary = item.querySelector("summary").innerHTML.replace(/^<!\[CDATA\[|\]\]>$/g,'');
					article.thumbnail = item.getElementsByTagName('media:thumbnail')[0]?.getAttribute("url");
					article.author = item.querySelector("author name").innerHTML;
					article.link = item.querySelector("link").getAttribute("href");
					article.published = item.querySelector("published").innerHTML;
					article.updated = item.querySelector("updated").innerHTML;

					collect.push(article);
				});

				setItems(collect);
				setLoading(false);
			});
	}, []);

	return (
		<PageBody>
			<h1>Blog</h1>
			<p style={{ textAlign: "center" }}>
				You can visit my full blog
				at <a href="https://soupbowl.blog" style={{ fontWeight: "bold" }}>soupbowl.blog</a>
			</p>
			{!loading ?
			<ListingItemGroup>
				{items.map((item) => (
					<ListingItem
						key={item.id}
						title={item.title}
						url={item.link}
						image={item.thumbnail}
					>
						<p>{item.summary}</p>
					</ListingItem>
				))}
			</ListingItemGroup>
			:
			<div style={{ textAlign: "center" }}>
				<p>Loading...</p>
			</div>
			}
		</PageBody>
	);
}
