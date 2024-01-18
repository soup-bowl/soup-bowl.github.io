import { useEffect, useState } from "react";
import { ErrorMessage, LoadingMessage } from "../components/Common";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { EState } from "../enums";
import { IBlogPost } from "../interfaces";
import { ButtonGroup, NormalButton } from "../components/Buttons";

const Blog = () => {
	const blogURL = 'https://blog.soupbowl.io/post/index.xml';
	const [items, setItems] = useState<IBlogPost[]>([]);
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [filter, setFilter] = useState<string | undefined>();
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		fetch(blogURL)
			.then((response: Response) => response.text())
			.then((response: string) => new window.DOMParser().parseFromString(response, "text/xml"))
			.then((response: Document) => {
				const items = response.querySelectorAll("item");
				const collect: IBlogPost[] = [];

				items.forEach((item: Element) => {
					collect.push({
						id: item.querySelector("guid")?.innerHTML ?? "",
						title: item.querySelector("title")?.innerHTML ?? "",
						summary: item.querySelector("description")?.innerHTML.replace(/^<!\[CDATA\[|\]\]>$/g, '') ?? "",
						thumbnail: item.getElementsByTagName('media:thumbnail')[0]?.getAttribute("url") ?? "",
						author: item.querySelector("author name")?.innerHTML ?? "",
						link: item.querySelector("link")?.getAttribute("href") ?? "",
						published: item.querySelector("pubDate")?.innerHTML ?? "",
						updated: item.querySelector("updated")?.innerHTML ?? "",
						categories: Array.from(item.querySelectorAll("category")).map((category: Element) => category.getAttribute("term") ?? ""),
					});
				});

				collect.forEach(post => post.categories.forEach((cat) => {
					setCategories((prev) => new Set([...prev, cat]));
				}));

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
			<ButtonGroup>
				<NormalButton active={(filter === undefined)} key="all" onClick={() => setFilter(undefined)}>all</NormalButton>
				{Array.from(categories).map((item) => (
					<NormalButton active={(item === filter)} key={item} onClick={() => setFilter(item)}>
						{item}
					</NormalButton>
				))}
			</ButtonGroup>
			{requestState === EState.Complete ?
				<ListingItemGroup>
					{items.filter((item) => filter === undefined || item.categories.includes(filter)).map((item) => (
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
