import { useEffect, useState } from "react"
import { ListingItem, ListingItemGroup } from "@/components/Listings"
import WPAPI from "@/api/WordPress"
import { IWordPressPluginListing } from "@/interfaces"
import { EState } from "@/enums"
import { ErrorMessage, LoadingMessage } from "@/components/Common"
import { AttentionLink } from "@/components/Buttons"

const img: { [key: string]: string } = {
	"simple-smtp": "https://f.subo.dev/i/r/wp-smtp.webp",
	"opensimulator-bridge": "https://f.subo.dev/i/r/wp-os.webp",
}

const WordPress = () => {
	const [plugins, setPlugins] = useState<IWordPressPluginListing[]>([])
	const [requestState, setRequestState] = useState<EState>(EState.Started)

	useEffect(() => {
		Promise.all([WPAPI.getPlugin("simple-smtp"), WPAPI.getPlugin("opensimulator-bridge")])
			.then((response) => {
				setPlugins(response)
				setRequestState(EState.Complete)
			})
			.catch(() => setRequestState(EState.Error))
	}, [])

	if (requestState === EState.Started) {
		return <LoadingMessage />
	}

	if (requestState === EState.Complete) {
		return (
			<>
				<div style={{ textAlign: "center" }}>
					<AttentionLink href="https://profiles.wordpress.org/soupbowl/">My Profile</AttentionLink>

					<p>These are plugins on WordPress.org that I look after and/or contribute to.</p>
				</div>

				<ListingItemGroup>
					{plugins.map((item) => (
						<ListingItem
							key={item.slug}
							title={item.name}
							image={img[item.slug]}
							url={`https://wordpress.org/plugins/${item.slug}`}
							downloads={item.downloaded}
							date={new Date(item.added)}
							daysSince={new Date(item.last_updated.split(" ")[0])}
						>
							<p></p>
						</ListingItem>
					))}
				</ListingItemGroup>
			</>
		)
	}

	return <ErrorMessage />
}

export default WordPress
