import { useEffect, useState } from "react";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IBlogPost } from "../interfaces";

export default function Blog() {
	const blogURL = 'https://soupbowl.blog';
	const [items, setItems] = useState<IBlogPost[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => { document.title = 'Blog - Soupbowl Portfolio' }, []);

	useEffect(() => {
		fetch(`${blogURL}/feed.xml`)
			.then((response: Response) => response.text())
			.then((response: string) => new window.DOMParser().parseFromString(response, "text/xml"))
			.then((response: Document) => {
				const items = response.querySelectorAll("entry");
				let collect: IBlogPost[] = [];

				items.forEach((item: any) => {
					collect.push({
						id: item.querySelector("id").innerHTML,
						title: item.querySelector("title").innerHTML,
						summary: item.querySelector("summary").innerHTML.replace(/^<!\[CDATA\[|\]\]>$/g, ''),
						thumbnail: item.getElementsByTagName('media:thumbnail')[0]?.getAttribute("url"),
						author: item.querySelector("author name").innerHTML,
						link: item.querySelector("link").getAttribute("href"),
						published: item.querySelector("published").innerHTML,
						updated: item.querySelector("updated").innerHTML,
					});
				});

				setItems(collect);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<p style={{ textAlign: "center" }}>
				You can visit my full blog
				at <a href={blogURL} style={{ fontWeight: "bold" }}>soupbowl.blog</a>
			</p>
			{!loading ?
				<ListingItemGroup>
					{items.map((item) => (
						<ListingItem
							key={item.id}
							title={item.title}
							url={item.link}
							image={item.thumbnail}
							date={new Date(item.published)}
						>
							<p>{item.summary}</p>
						</ListingItem>
					))}
				</ListingItemGroup>
				:
				<p style={{ textAlign: "center" }}>Loading...</p>
			}
		</>
	);
}
