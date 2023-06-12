import { useEffect, useState } from "react";
import { ErrorMessage, LoadingMessage } from "../components/Common";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { EState } from "../enums";
import { IBlogPost } from "../interfaces";

const Blog = () => {
	const blogURL = 'https://blog.soupbowl.io';
	const [items, setItems] = useState<IBlogPost[]>([]);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

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
				setRequestState(EState.Complete);
			})
			.catch(() => setRequestState(EState.Error));
	}, []);

	return (
		<>
			<p style={{ textAlign: "center" }}>
				You can visit my full blog
				at <a href={blogURL} style={{ fontWeight: "bold" }}>blog.soupbowl.io</a>
			</p>
			{requestState === EState.Complete ?
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
				<>
					{requestState === EState.Started ?
						<LoadingMessage />
						:
						<ErrorMessage />
					}
				</>
			}
		</>
	);
}

export default Blog;
