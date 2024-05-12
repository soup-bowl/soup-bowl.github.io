import { useState } from "react";
import { faBluesky, faDiscord, faDocker, faGithub, faMastodon, faWordpressSimple } from "@fortawesome/free-brands-svg-icons";
import { faBlog, faVial } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@/components/Modal";
import { Social as SocialItem, SocialContainer, SocialPanel } from "@/components/Social";
import { AttentionButton } from "@/components/Buttons";
import { Blog, GitHub, Labs, Mastodon, OpenSim, WordPress } from "@/modals";

import OSGridLogo from '@/assets/osgrid.svg?react';

const Social = () => {
	const [open, setOpen] = useState<string>("0");

	const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		// @ts-expect-error idk why but the AnchorElement directive is ignored...
		setOpen(e.target.parentElement.id);
	};

	const closeDialog = () => {
		setOpen("0");
	};

	return (
		<>
			<Modal large title="Blog" open={(open === "1") ? true : false} onClose={closeDialog}>
				<Blog />
			</Modal>
			<Modal large title="Experiments" open={(open === "2") ? true : false} onClose={closeDialog}>
				<Labs />
			</Modal>
			<Modal large title="GitHub" open={(open === "3") ? true : false} onClose={closeDialog}>
				<GitHub />
			</Modal>
			<Modal large title="WordPress" open={(open === "4") ? true : false} onClose={closeDialog}>
				<WordPress />
			</Modal>
			<Modal title="OSgrid Estate" open={(open === "6") ? true : false} onClose={closeDialog}>
				<OpenSim />
			</Modal>
			<Modal large title="Mastodon" open={(open === "7") ? true : false} onClose={closeDialog}>
				<Mastodon />
			</Modal>
			<Modal title="Bluesky" open={(open === "8") ? true : false} onClose={closeDialog}>
				<div style={{ textAlign: 'center' }}>
					<p>I haven't built an integration just yet, sorry!</p>
					<AttentionButton onClick={() => window.location.href = "https://bsky.app/profile/subo.dev"}>
						Bluesky Profile
					</AttentionButton>
				</div>
			</Modal>
			<Modal title="Talking on Discord" open={(open === "9") ? true : false} onClose={closeDialog}>
				<p>There's no direct link to <strong>Discord</strong>, so to start a chat:</p>
				<ul>
					<li>Open the Discord app (desktop, mobile, whatever).</li>
					<li>Click on <strong>Find or Start a Conversation</strong>.</li>
					<li>Paste in <strong>subo.dev</strong>.</li>
					<li>???</li>
					<li>Profit!</li>
				</ul>
				<p>Alternatively, click below to open my profile.</p>
				<div style={{ textAlign: 'center' }}>
					<AttentionButton onClick={() => window.location.href = "https://discord.com/users/555374749019013141"}>
						Discord Profile
					</AttentionButton>
				</div>
			</Modal>
			<Modal title="Docker" open={(open === "10") ? true : false} onClose={closeDialog}>
				<div style={{ textAlign: 'center' }}>
					<AttentionButton onClick={() => window.location.href = "https://hub.docker.com/u/soupbowl"}>
						Dockerhub Account
					</AttentionButton>
				</div>
				<h2 style={{ textAlign: 'center' }}>Images</h2>
				<div style={{ textAlign: 'center' }}>
					<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
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
					<SocialItem id="4" icon={faWordpressSimple} color="#0085BA" onClick={openDialog}>
						soupbowl
					</SocialItem>
					<SocialItem id="10" icon={faDocker} color="#086DD7" onClick={openDialog}>
						soupbowl
					</SocialItem>
					<SocialItem id="6" color="#FFCB00" onClick={openDialog} iconSvg={<OSGridLogo />}>
						Balthazar Swindon
					</SocialItem>
					<SocialItem id="7" icon={faMastodon} color="#6364ff" onClick={openDialog}>
						soupbowl<br />@mstdn.social
					</SocialItem>
					<SocialItem id="8" icon={faBluesky} color="#0085ff" onClick={openDialog}>
						subo.dev
					</SocialItem>
					<SocialItem id="9" icon={faDiscord} color="#5865f2" onClick={openDialog}>
						subo.dev
					</SocialItem>
				</SocialPanel>
			</SocialContainer>
		</>
	);
}

export default Social;
