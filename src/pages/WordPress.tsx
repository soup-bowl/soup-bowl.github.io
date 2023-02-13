import { useEffect, useState } from "react";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import WPAPI from "../api/WordPress";
import { IWordPressPluginListing } from "../interfaces";
import { EState } from "../enums";
import { ErrorMessage, LoadingMessage } from "../components/Common";

export default function WordPress() {
	const [plugins, setPlugins] = useState<IWordPressPluginListing[]>([]);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		Promise.all([
			WPAPI.getPlugin('simple-smtp'),
			WPAPI.getPlugin('opensimulator-bridge'),
		])
			.then(response => {
				setPlugins(response);
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
				<p>
					These are plugins on WordPress.org that I look after and/or contribute to.&nbsp;
					<a href="https://profiles.wordpress.org/soupbowl/">Visit my WordPress profile</a>.
				</p>
				<ListingItemGroup>
					{plugins.map((item: IWordPressPluginListing, i: number) => (
						<ListingItem
							key={i}
							title={item.name}
							url={`https://wordpress.org/plugins/${item.slug}`}
							downloads={item.downloaded}
							date={new Date(item.added)}
							lastCommit={new Date(item.last_updated.split(' ')[0])}
						>
							<p></p>
						</ListingItem>
					))}
				</ListingItemGroup>
			</>
		);
	}

	return (<ErrorMessage />);
}
