import { useEffect, useState } from "react";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { ILabs } from "../interfaces";

export default function Labs() {
	const blogURL = 'https://soupbowl.dev/labs';
	const [items, setItems] = useState<ILabs[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetch(`${blogURL}/labs.json`)
			.then((response: Response) => response.json())
			.then((response: ILabs[]) => {
				setItems(response);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{!loading ?
				<ListingItemGroup>
					{items.map((item, i) => (
						<ListingItem
							key={i}
							title={item.lab}
							url={item.url}
							image={item.logo}
						>
							<p>{item.description}</p>
						</ListingItem>
					))}
				</ListingItemGroup>
				:
				<p style={{ textAlign: "center" }}>Loading...</p>
			}
		</>
	);
}
