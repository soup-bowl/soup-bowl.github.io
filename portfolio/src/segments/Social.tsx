import { useState } from "react"
import { faDocker, faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons"
import { faBlog, faVial } from "@fortawesome/free-solid-svg-icons"
import { Modal } from "@/components/Modal"
import { Social as SocialItem, SocialContainer, SocialPanel } from "@/components/Social"
import { AttentionLink } from "@/components/Buttons"
import { Blog, GitHub, Labs, Mastodon, OpenSim } from "@/modals"

import OSGridLogo from "@/assets/osgrid.svg?react"

const Social = () => {
	const [open, setOpen] = useState<string>("0")

	const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		// @ts-expect-error idk why but the AnchorElement directive is ignored...
		setOpen(e.target.parentElement.id)
	}

	const closeDialog = () => {
		setOpen("0")
	}

	return (
		<>
			<Modal large title="Blog" open={open === "1"} onClose={closeDialog}>
				<Blog />
			</Modal>
			<Modal large title="Experiments" open={open === "2"} onClose={closeDialog}>
				<Labs />
			</Modal>
			<Modal large title="GitHub" open={open === "3"} onClose={closeDialog}>
				<GitHub />
			</Modal>
			<Modal title="OSgrid Estate" open={open === "6"} onClose={closeDialog}>
				<OpenSim />
			</Modal>
			<Modal large title="Mastodon" open={open === "7"} onClose={closeDialog}>
				<Mastodon />
			</Modal>
			<Modal title="Docker" open={open === "10"} onClose={closeDialog}>
				<div style={{ textAlign: "center" }}>
					<AttentionLink href="https://hub.docker.com/u/soupbowl">My Profile</AttentionLink>
				</div>
				<h2 style={{ textAlign: "center" }}>Images</h2>
				<div style={{ textAlign: "center" }}>
					<p style={{ fontSize: "4rem", lineHeight: 0 }}>:(</p>
					<p>Dockerhub API is not open, so unfortunately I can't show this info just yet.</p>
				</div>
			</Modal>
			<SocialContainer>
				<SocialPanel>
					<SocialItem id="1" icon={faBlog} color="#29132e" onClick={openDialog}>
						Blog
					</SocialItem>
					<SocialItem id="2" icon={faVial} color="#00ad2b" onClick={openDialog}>
						Experiments
					</SocialItem>
					<SocialItem id="3" icon={faGithub} color="#2d333b" onClick={openDialog}>
						soup-bowl
					</SocialItem>
					<SocialItem id="10" icon={faDocker} color="#086DD7" onClick={openDialog}>
						soupbowl
					</SocialItem>
					<SocialItem id="6" color="#FFCB00" onClick={openDialog} iconSvg={<OSGridLogo />}>
						Balthazar Swindon
					</SocialItem>
					<SocialItem id="7" icon={faMastodon} color="#6364ff" onClick={openDialog}>
						soupbowl
						<br />
						@mstdn.social
					</SocialItem>
				</SocialPanel>
			</SocialContainer>
		</>
	)
}

export default Social
