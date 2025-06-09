import { useEffect, useState } from "react"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { ListingItem, ListingItemGroup } from "@/components/Listings"
import { EState } from "@/enums"
import { ILabs } from "@/interfaces"
import { ButtonGroup, NormalButton } from "@/components/Buttons"

const blogURL = "https://soupbowl.io/labs"
const getLabs = (): Promise<ILabs[]> => {
	return fetch(`${blogURL}/labs.json`).then((response: Response) => response.json())
}

const getCategories = (labs: ILabs[]): Set<string> => {
	const categories = new Set<string>()
	labs.forEach((lab) => categories.add(lab.type))
	return categories
}

const getFilteredItems = (items: ILabs[], filter: string | undefined) => {
	return items.filter((item) => filter === undefined || item.type === filter)
}

const Labs = () => {
	const [items, setItems] = useState<ILabs[]>([])
	const [categories, setCategories] = useState<Set<string>>(new Set())
	const [filter, setFilter] = useState<string | undefined>()
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		getLabs()
			.then((labs) => {
				setItems(labs)
				setCategories(getCategories(labs))
				setRequestState(EState.Complete)
			})
			.catch(() => setRequestState(EState.Error))
	}, [])

	if (requestState === EState.Started) {
		return <LoadingMessage />
	}

	if (requestState === EState.Complete) {
		return (
			<>
				<ButtonGroup>
					<NormalButton active={filter === undefined} key="all" onClick={() => setFilter(undefined)}>
						all
					</NormalButton>
					{Array.from(categories).map((item) => (
						<NormalButton active={item === filter} key={item} onClick={() => setFilter(item)}>
							{item}
						</NormalButton>
					))}
				</ButtonGroup>
				<ListingItemGroup>
					{getFilteredItems(items, filter).map((item) => (
						<ListingItem
							key={item.lab}
							title={item.lab}
							url={item.url.startsWith("/") ? `https://soupbowl.io/labs${item.url}` : item.url}
							image={item.logo}
						>
							<p>{item.description}</p>
						</ListingItem>
					))}
				</ListingItemGroup>
			</>
		)
	}

	return <ErrorMessage />
}

export default Labs
