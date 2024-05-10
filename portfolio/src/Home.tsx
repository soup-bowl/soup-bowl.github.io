import { faDiscord, faDocker, faGithub, faMastodon, faWordpressSimple } from "@fortawesome/free-brands-svg-icons";
import { faBlog, faVial } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Social, SocialContainer, SocialPanel } from "@/components/Social";
import { PageBody, PageHeader } from "@/components/Page";
import { AttentionButton } from "@/components/Buttons";
import { Blog, GitHub, Labs, Mastodon, OpenSim, WordPress } from "@/modals";
import About from "@/About";

import OSGridLogo from '@/assets/osgrid.svg?react';
import LemmyLogo from '@/assets/lemmy.svg?react';

const PageOrder = [
	{ id: 0, label: 'start' },
	{ id: 1, label: 'socials' },
	{ id: 2, label: 'about' },
];

const Home = () => {
	const [open, setOpen] = useState<string>("0");

	const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		// @ts-ignore
		setOpen(e.target.parentElement.id);
	};

	const closeDialog = () => {
		setOpen("0");
	};

	return (
		<Layout>
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
			<Modal title="Lemmy" open={(open === "8") ? true : false} onClose={closeDialog}>
				<div style={{ textAlign: 'center' }}>
					<p>Nothing here just yet.</p>
					<AttentionButton onClick={() => window.location.href = "https://lemmy.world/u/soupbowl"}>
						Lemmy Profile
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

			<main>
				<PageHeader id={PageOrder[0].label}>
					<div>
						<div>
							<img src="https://files.soupbowl.io/i/logo.webp" />
						</div>
						<div>
							<h1 style={{ fontSize: '48px' }}>Soupbowl</h1>
							<p><strong>DevOps Engineer</strong> from <strong>Hertfordshire, UK</strong></p>
						</div>
					</div>
				</PageHeader>

				<PageBody id={PageOrder[1].label} color='#a6faff'>
					<SocialContainer>
						<SocialPanel>
							<Social id="1" icon={faBlog} color="#29132e" onClick={openDialog}>
								Blog
							</Social>
							<Social id="2" icon={faVial} color="#00ad2b" onClick={openDialog}>
								Experiments
							</Social>
							<Social id="3" icon={faGithub} color="#2d333b" onClick={openDialog}>
								soup-bowl
							</Social>
							<Social id="4" icon={faWordpressSimple} color="#0085BA" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="10" icon={faDocker} color="#086DD7" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="6" color="#FFCB00" onClick={openDialog} iconSvg={<OSGridLogo />}>
								Balthazar Swindon
							</Social>
							<Social id="7" icon={faMastodon} color="#6364ff" onClick={openDialog}>
								soupbowl<br />@mstdn.social
							</Social>
							<Social id="8" color="#00bc8c" onClick={openDialog} iconSvg={<LemmyLogo />}>
								soupbowl<br />@lemmy.world
							</Social>
							<Social id="9" icon={faDiscord} color="#5865f2" onClick={openDialog}>
								subo.dev
							</Social>
						</SocialPanel>
					</SocialContainer>
				</PageBody>

				<PageBody id={PageOrder[2].label} color='#918efa'>
					<About />
				</PageBody>
			</main>
		</Layout>
	);
}

export default Home;
