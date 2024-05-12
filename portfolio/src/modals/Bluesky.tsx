import { useEffect, useState } from "react";
import { ListingItemGroup, ListingSocialItem } from "@/components/Listings";
import { IBskyActor, IBskyPosts } from "@/interfaces";
import { EState } from "@/enums";
import { ErrorMessage, LoadingMessage } from "@/components/Common";

const Bluesky = () => {
	const [statuses, setStatuses] = useState<IBskyPosts | undefined>(undefined);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const handleResponse = await fetch('https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=subo.dev');
				const handleData: IBskyActor = await handleResponse.json();
				const did = handleData.did;

				const feedUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&filter=posts_and_author_threads&limit=10`;
				const feedResponse = await fetch(feedUrl);
				const feedData: IBskyPosts = await feedResponse.json();

				setStatuses(feedData);
				setRequestState(EState.Complete);
			} catch (error) {
				setRequestState(EState.Error);
			}
		};

		fetchData();
	}, []);

	if (requestState === EState.Started) {
		return (<LoadingMessage />);
	}

	if (requestState === EState.Complete && statuses !== undefined && statuses.feed.length > 0) {
		return (
			<ListingItemGroup>
				{statuses.feed
					.map((item, i) => (
						<ListingSocialItem
							key={i}
							avatar={item.post.author.avatar}
							handle={item.post.author.handle}
							name={item.post.author.displayName}
							profileUrl="https://bsky.app/profile/subo.dev"
							url=""
							date={new Date(item.post.record.createdAt)}
						>
							<div dangerouslySetInnerHTML={{ __html: item.post.record.text }} />
						</ListingSocialItem>
					))}
			</ListingItemGroup>
		);
	}

	return (<ErrorMessage />);
}

export default Bluesky;
