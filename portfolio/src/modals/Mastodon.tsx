import { useEffect, useState } from "react"
import { ListingItemGroup, ListingSocialItem } from "@/components/Listings"
import { IMastodonStatus } from "@/interfaces"
import MastoAPI from "@/api/Mastodon"
import { EState } from "@/enums"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { AttentionLink } from "@/components/Buttons"

const Mastodon = () => {
	const [statuses, setStatuses] = useState<IMastodonStatus[]>([])
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		MastoAPI.getLatestPosts()
			.then((response: IMastodonStatus[]) => {
				setStatuses(response)
				setRequestState(EState.Complete)
			})
			.catch(() => setRequestState(EState.Error))
	}, [])

	if (requestState === EState.Started) {
		return <LoadingMessage />
	}

	if (requestState === EState.Complete && statuses.length > 0) {
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<AttentionLink href="https://mstdn.social/@soupbowl">My Profile</AttentionLink>
				</div>

				<ListingItemGroup>
					{statuses
						.filter((item) => item.content !== "")
						.slice(0, 5)
						.map((item) => (
							<ListingSocialItem
								key={item.id}
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
			</>
		)
	}

	return <ErrorMessage />
}

export default Mastodon
