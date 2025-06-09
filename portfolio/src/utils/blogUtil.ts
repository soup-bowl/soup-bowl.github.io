import { IBlogPost } from "@/interfaces"

const decodeHtmlEntities = (text: string) => {
	const textarea: HTMLTextAreaElement = document.createElement("textarea")
	textarea.innerHTML = text
	return textarea.value
}

const truncateString = (text: string, limit: number = 150) => {
	if (text.length <= limit) {
		return decodeHtmlEntities(text)
	}
	return decodeHtmlEntities(text.slice(0, limit) + "...")
}

export const blogToObject = (items: NodeListOf<Element>): IBlogPost[] => {
	const collect: IBlogPost[] = []

	items.forEach((item: Element) => {
		collect.push({
			id: item.querySelector("guid")?.innerHTML ?? "",
			title: decodeHtmlEntities(item.querySelector("title")?.innerHTML ?? ""),
			summary: decodeHtmlEntities(truncateString(item.querySelector("description")?.innerHTML ?? "")),
			thumbnail: item.querySelector("thumbnail")?.innerHTML ?? "",
			author: item.querySelector("author name")?.innerHTML ?? "",
			link: item.querySelector("link")?.innerHTML ?? "",
			published: item.querySelector("pubDate")?.innerHTML ?? "",
			updated: item.querySelector("updated")?.innerHTML ?? "",
			categories: Array.from(item.querySelectorAll("category")).map(
				(category: Element) => category.getAttribute("term") ?? ""
			),
		})
	})

	return collect
}
