import { useEffect, useState } from "react";
import { ErrorMessage, LoadingMessage } from "../components/Common";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { EState } from "../enums";
import { ILabs } from "../interfaces";

const Labs = () => {
	const blogURL = 'https://soupbowl.io/labs';
	const [items, setItems] = useState<ILabs[]>([]);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		fetch(`${blogURL}/labs.json`)
			.then((response: Response) => response.json())
			.then((response: ILabs[]) => {
				setItems(response);
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
				<ListingItemGroup>
					{items.map((item, i) => (
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
