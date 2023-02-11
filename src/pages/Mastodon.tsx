import { useEffect, useState } from "react";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IMastodonStatus } from "../interfaces";
import MastoAPI from "../api/Mastodon";
import { AttentionButton } from "../components/Buttons";

export default function Mastodon() {
	const [statuses, setStatuses] = useState<IMastodonStatus[]>([]);
	const [MasErr, setMasErr] = useState<boolean>(false);

	useEffect(() => {
		MastoAPI.getLatestPosts()
			.then((response: IMastodonStatus[]) => setStatuses(response))
			.catch(() => setMasErr(true));
	}, []);

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<AttentionButton onClick={() => window.location.href = "https://mstdn.social/@soupbowl"}>
					My Account
				</AttentionButton>
			</div>
			{!MasErr ?
				<ListingItemGroup>
					{statuses
						.filter((item) => (item.content === '' ? false : true))
						.map((item, i) => (
							<ListingItem
								key={i}
								title={`Post from ${item.account.display_name} (${item.account.username})`}
								url={item.url}
								stars={item.favourites_count}
								image={item.media_attachments?.[0]?.url}
								date={new Date(item.created_at)}
							>
								<div dangerouslySetInnerHTML={{ __html: item.content }} />
							</ListingItem>
						))}
				</ListingItemGroup>
				:
				<div style={{ textAlign: 'center' }}>
					<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
					<p>An error occurred getting the info, sorry about that</p>
				</div>
			}
		</>
	);
}
