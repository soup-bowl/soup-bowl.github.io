import { useEffect, useState } from "react";
import { ListingItemGroup, ListingSocialItem } from "../components/Listings";
import { IMastodonStatus } from "../interfaces";
import MastoAPI from "../api/Mastodon";

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
			{!MasErr && statuses.length > 0 ?
				<ListingItemGroup>
					{statuses
						.filter((item) => (item.content === '' ? false : true))
						.slice(0, 5)
						.map((item, i) => (
							<ListingSocialItem
								key={i}
								avatar={item.account.avatar}
								handle={`@${item.account.username}`}
								name={item.account.display_name}
								profileUrl={item.account.url}
								url={item.url}
								image={item.media_attachments?.[0]?.url}
								date={new Date(item.created_at)}
							>
								<div dangerouslySetInnerHTML={{ __html: item.content }} />
							</ListingSocialItem>
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
