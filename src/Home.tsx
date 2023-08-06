import styled from "@emotion/styled";
import { faDiscord, faDocker, faGithub, faWordpress } from "@fortawesome/free-brands-svg-icons";
import { faBlog, faVial } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "./components/Layout";
import { Modal } from "./components/Modal";
import { Social, SocialPanel } from "./components/Social";
import { About, Blog, GitHub, Labs, OpenSim, WordPress } from "./pages";
import { AttentionButton } from "./components/Buttons";

const PageOrder = [
	{ id: 0, label: 'start' },
	{ id: 1, label: 'socials' },
	{ id: 2, label: 'about' },
];

const PageHeader = styled.section({
	display: 'flex',
	alignItems: 'end',
	height: '100vh',
	scrollSnapAlign: "start",
	div: {
		width: '100%',
		backgroundColor: 'rgb(0 0 0 / 60%)',
		padding: 20,
		borderRadius: '25px 25px 0 0',
		backdropFilter: 'blur(10px)',
		'& > h1': {
			fontSize: '48px'
		},
		'& > p': {
			fontSize: '24px'
		},
		'@media only screen and (max-width: 650px)': {
			marginTop: 20,
			paddingBottom: 50
		}
	}
});

const PageBody = styled.section(props => ({
	backgroundColor: props.color,
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	scrollSnapAlign: "start",
	'@media only screen and (max-width: 650px)': {
		paddingBottom: 50
	}
}));

const SocialContainer = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%'
});

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
			<Modal title="WordPress" open={(open === "4") ? true : false} onClose={closeDialog}>
				<WordPress />
			</Modal>
			<Modal title="OSgrid Estate" open={(open === "6") ? true : false} onClose={closeDialog}>
				<OpenSim />
			</Modal>
			<Modal title="Talking on Discord" open={(open === "9") ? true : false} onClose={closeDialog}>
				<p>There's no direct link to <strong>Discord</strong>, so to start a chat:</p>
				<ul>
					<li>Open the Discord app (desktop, mobile, whatever).</li>
					<li>Click on <strong>Find or Start a Conversation</strong>.</li>
					<li>Paste in <strong>soupbowl1</strong>.</li>
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
						<h1>soupbowl</h1>
						<p><strong>DevOps</strong> and <strong>Web Developer</strong> from <strong>Hertfordshire, UK</strong></p>
					</div>
				</PageHeader>

				<PageBody id={PageOrder[1].label} color='#1B1A1B'>
					<SocialContainer>
						<SocialPanel>
							<Social id="1" icon={faBlog} color="#29132e" onClick={openDialog}>
								blog.soupbowl.io
							</Social>
							<Social id="2" icon={faVial} color="#00ad2b" onClick={openDialog}>
								Experiments
							</Social>
							<Social id="3" icon={faGithub} color="#2d333b" onClick={openDialog}>
								soup-bowl
							</Social>
							<Social id="4" icon={faWordpress} color="#0085BA" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="10" icon={faDocker} color="#086DD7" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="6" iconSvg={
								<svg style={{ height: '1em' }} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="osgrid" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path fill="currentColor"
										d="m 211.03302,495.50159 -28.64472,2.60404 -80.72625,-61.19568 -1.30198,-18.22855 61.19568,-44.26921 -148.432112,-95.04862 -10.4162758,-22.1346 24.7387098,-92.44454 18.228445,-6.51018 178.378953,109.37101 -19.53057,76.8201 62.49773,-44.2692 71.61205,49.47736 -33.85301,-84.63234 63.79978,-48.17533 -80.72625,2.60407 -24.73866,-70.30994 -22.1346,72.91401 -95.04861,-1.30198 -32.55095,-20.83258 57.28959,-179.680948 24.73871,-13.0203587 93.74658,3.9061137 15.62441,18.228512 -23.43658,62.497714 h 171.86869 l 16.92647,9.114247 37.75901,96.35065 -9.11422,15.62443 -79.42419,1.30198 65.10176,171.86873 -6.51012,23.43667 -85.93438,58.59161 -16.92647,-6.51012 -23.43666,-69.00795 z" />
								</svg>
							} color="#FFCB00" onClick={openDialog}>
								Balthazar Swindon
							</Social>
							<Social id="9" icon={faDiscord} color="#5865f2" onClick={openDialog}>
								soupbowl1
							</Social>
						</SocialPanel>
					</SocialContainer>
				</PageBody>

				<PageBody id={PageOrder[2].label} color='#101010'>
					<About />
				</PageBody>
			</main>
		</Layout>
	);
}

export default Home;
