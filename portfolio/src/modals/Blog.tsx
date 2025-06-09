import { useEffect, useState } from "react"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { ListingItem, ListingItemGroup } from "@/components/Listings"
import { EState } from "@/enums"
import { IBlogPost } from "@/interfaces"
import { ButtonGroup, NormalButton } from "@/components/Buttons"
import { blogToObject } from "@/utils/blogUtil"

const blogURL = "/post/index.xml"

const extractCategories = (posts: IBlogPost[]): Set<string> => {
	const categories = new Set<string>()
	posts.forEach((post) => {
		post.categories.forEach((cat) => categories.add(cat))
	})
	return categories
}

const getFilteredItems = (items: IBlogPost[], filter: string | undefined) =>
	items.filter((item) => filter === undefined || item.categories.includes(filter))

const Blog = () => {
	const [items, setItems] = useState<IBlogPost[]>([])
	const [categories, setCategories] = useState<Set<string>>(new Set())
	const [filter, setFilter] = useState<string | undefined>()
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		fetch(blogURL)
			.then((response: Response) => response.text())
			.then((response: string) => new window.DOMParser().parseFromString(response, "text/xml"))
			.then((response: Document) => {
				const items = response.querySelectorAll("item")
				const collect: IBlogPost[] = blogToObject(items)
				setCategories(extractCategories(collect))
				setItems(collect)
				setRequestState(EState.Complete)
			})
			.catch(() => setRequestState(EState.Error))
	}, [])

	return (
		<>
			<ButtonGroup>
				<NormalButton active={filter === undefined} key="all" onClick={() => setFilter(undefined)}>
					All
				</NormalButton>
				{Array.from(categories).map((item) => (
					<NormalButton active={item === filter} key={item} onClick={() => setFilter(item)}>
						{item}
					</NormalButton>
				))}
			</ButtonGroup>
			{requestState === EState.Complete ? (
				<ListingItemGroup>
					{getFilteredItems(items, filter).map((item) => (
						<ListingItem
							key={item.id}
							title={item.title}
							url={item.link}
							image={item.thumbnail !== "" ? item.thumbnail : undefined}
							date={new Date(item.published)}
						>
							<p>{item.summary}</p>
						</ListingItem>
					))}
				</ListingItemGroup>
			) : (
				<>{requestState === EState.Started ? <LoadingMessage /> : <ErrorMessage />}</>
			)}
		</>
	)
}

export default Blog
