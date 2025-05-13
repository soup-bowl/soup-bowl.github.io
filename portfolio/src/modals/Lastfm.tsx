import { useEffect, useState } from "react"
import MastoAPI from "@/api/Mastodon"
import { EState } from "@/enums"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { IMastodonStatus } from "@/interfaces"
import { AttentionButton } from "@soupbowl/neobrutalism-react"

const Lastfm = () => {
	const [htw, setHtw] = useState<IMastodonStatus>()
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		MastoAPI.getLatestPosts()
			.then((response) => {
				response.every((post) => {
					if (post.application !== undefined && post.application.name === "soup-bowl's Hot this Week") {
						setHtw(post)
						return false
					}
					return true
				})
				setRequestState(EState.Complete)
			})
			.catch(() => setRequestState(EState.Error))
	}, [])

	if (requestState === EState.Started) {
		return <LoadingMessage />
	}

	if (requestState === EState.Complete && htw !== undefined) {
		const matches = htw.content.match(/<br \/>(.+?) \(\d+\)/g)
		const bandNames = matches
			? matches
					.slice(0, 5)
					.map((match) => match.replace(/<br \/>| \(\d+\)/g, "").trim())
					.join(", ")
			: "None found"

		return (
			<div style={{ textAlign: "center" }}>
				<div style={{ marginBottom: 10 }}>
					<AttentionButton onClick={() => (window.location.href = "https://www.last.fm/user/soup-bowl")}>
						My Last.fm
					</AttentionButton>
				</div>
				{htw.media_attachments?.[0]?.url && (
					<img
						src={htw.media_attachments[0].url}
						style={{ maxWidth: "100%" }}
						alt={`A collage of top listened bands this week, in order: ${bandNames}.`}
					/>
				)}
				<p>
					<a href={htw.url} style={{ color: "#bbb" }}>
						Sourced from Mstdn.social at {new Date(htw.created_at).toLocaleDateString()}
					</a>
				</p>
			</div>
		)
	}

	return <ErrorMessage />
}

export default Lastfm
