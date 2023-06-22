import { useEffect, useState } from "react";
import { ErrorMessage, LoadingMessage } from "../components/Common";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { EState } from "../enums";
import { ILabs } from "../interfaces";
import { ButtonGroup, NormalButton } from "../components/Buttons";

const Labs = () => {
	const blogURL = 'https://soupbowl.io/labs';
	const [items, setItems] = useState<ILabs[]>([]);
	const [categories, setCategories] = useState<Set<string>>(new Set());
	const [filter, setFilter] = useState<string | undefined>();
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		fetch(`${blogURL}/labs.json`)
			.then((response: Response) => response.json())
			.then((response: ILabs[]) => {
				setItems(response);
				response.forEach((lab) => {
					setCategories((prev) => new Set([...prev, lab.type]));
				});
				setRequestState(EState.Complete);
			})
			.catch(() => setRequestState(EState.Error));
	}, []);

	if (requestState === EState.Started) {
		return (<LoadingMessage />);
	}

	if (requestState === EState.Complete) {
		return (
			<>
				<ButtonGroup>
					<NormalButton active={(filter === undefined)} key="all" onClick={() => setFilter(undefined)}>all</NormalButton>
					{Array.from(categories).map((item) => ( // @ts-ignore
						<NormalButton active={(item === filter)} key={item} onClick={() => setFilter(item)}>
							{item}
						</NormalButton>
					))}
				</ButtonGroup>
				<ListingItemGroup>
					{items.filter((item) => filter === undefined || item.type === filter).map((item, i) => (
						<ListingItem
							key={i}
							title={item.lab}
							url={(item.url.startsWith("/")) ? `https://soupbowl.io/labs${item.url}` : item.url}
							image={item.logo}
						>
							<p>{item.description}</p>
						</ListingItem>
					))}
				</ListingItemGroup>
			</>
		);
	}

	return (<ErrorMessage />);
}

export default Labs;
