import { useEffect, useState } from "react";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import WPAPI from "../api/WordPress";
import { IWordPressPluginListing } from "../interfaces";

export default function WordPress() {
	const [plugins, setPlugins] = useState<IWordPressPluginListing[]>([]);
	const [PluginErr, setPluginErr] = useState<boolean>(false);

	useEffect(() => {
		Promise.all([
			WPAPI.getPlugin('simple-smtp'),
			WPAPI.getPlugin('opensimulator-bridge'),
		])
			.then(response => setPlugins(response))
			.catch(() => setPluginErr(true));
	}, []);

	function ErrorDisplay() {
		return (
			<div style={{ textAlign: 'center' }}>
				<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
				<p>An error occurred getting the info, sorry about that</p>
			</div>
		);
	}

	return (
		<>
			<p>
				These are plugins on WordPress.org that I look after and/or contribute to.&nbsp;
				<a href="https://profiles.wordpress.org/soupbowl/">Visit my WordPress profile</a>.
			</p>
			{!PluginErr ?
				<ListingItemGroup>
					{plugins.map((item:IWordPressPluginListing, i:number) => (
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
				:
				<ErrorDisplay />
			}
		</>
	);
}
