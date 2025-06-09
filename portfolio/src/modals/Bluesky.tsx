import { useEffect, useState } from "react"
import { ListingItemGroup, ListingSocialItem } from "@/components/Listings"
import { IBskyActor, IBskyFeed } from "@/interfaces"
import { EState } from "@/enums"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { AttentionLink } from "@/components/Buttons"

const Bluesky = () => {
	const [statuses, setStatuses] = useState<IBskyFeed | undefined>(undefined)
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const handleResponse = await fetch(
					"https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=subo.dev"
				)
				const handleData: IBskyActor = await handleResponse.json()
				const did = handleData.did

				const feedUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&filter=posts_and_author_threads&limit=10`
				const feedResponse = await fetch(feedUrl)
				const feedData: IBskyFeed = await feedResponse.json()

				setStatuses(feedData)
				setRequestState(EState.Complete)
			} catch (error) {
				console.error("Error fetching Bluesky data:", error)
				setRequestState(EState.Error)
			}
		}

		fetchData()
	}, [])

	if (requestState === EState.Started) {
		return <LoadingMessage />
	}

	if (requestState === EState.Complete && statuses !== undefined && statuses.feed.length > 0) {
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<AttentionLink href="https://bsky.app/profile/subo.dev">My Profile</AttentionLink>
				</div>

				<ListingItemGroup>
					{statuses.feed.map((item) => (
						<ListingSocialItem
							key={item.post.cid}
							avatar={item.post.author.avatar}
							handle={item.post.author.handle}
							name={item.post.author.displayName}
							profileUrl={`https://bsky.app/profile/${item.post.author.handle}`}
							url={`https://bsky.app/profile/${item.post.author.handle}/post${item.post.uri.match(/\/([^/]+)$/)?.[0] ?? ""}`}
							image={item.post.embed?.images?.[0]?.thumb}
							imageDimensions={{
								height: item.post.embed?.images?.[0]?.aspectRatio.height,
								width: item.post.embed?.images?.[0]?.aspectRatio.width,
							}}
							date={new Date(item.post.record.createdAt)}
						>
							<div dangerouslySetInnerHTML={{ __html: item.post.record.text }} />
						</ListingSocialItem>
					))}
				</ListingItemGroup>
			</>
		)
	}

	return <ErrorMessage />
}

export default Bluesky
