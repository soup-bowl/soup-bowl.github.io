import styled from "@emotion/styled";
import { faDiscord, faGithub, faGitlab, faLastfm, faMastodon, faReddit, faTwitter, faWordpress } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "../components/Modal";
import { Social, SocialPanel } from "../components/Social";

const PageHeader = styled.div(props => ({
	textAlign: 'center',
	padding: 20,
}));

const PageBody = styled.div({
	padding: 20,
	minHeight: '50vh',
	'& > div': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 25
	}
});

export default function Home() {
	const [open, setOpen] = useState<boolean>(false);

	const openDialog = (e: any) => {
		e.preventDefault();
		setOpen(true);
	};

	useEffect(() => { document.title = 'Soupbowl Portfolio' }, []);

	return (
		<main>
			<PageHeader>
				<h1 style={{ fontSize: '48px' }}>soup-bowl</h1>
				<p style={{ fontSize: '24px' }}><strong>DevOps</strong> and <strong>Web Developer</strong> from <strong>Hertfordshire, UK</strong></p>
			</PageHeader>
			<PageBody>
				<div>
					<Modal open={open} onClose={() => setOpen(false)}>
						<ModalHeader>Talking on Discord</ModalHeader>
						<ModalBody>
							<p>There's no direct link to <strong>Discord</strong>, so to start a chat:</p>
							<ul>
								<li>Open the Discord app (desktop, mobile, whatever).</li>
								<li>Click on <strong>Find or Start a Conversation</strong>.</li>
								<li>Paste in <strong>soupbowl#9999</strong>.</li>
								<li>???</li>
								<li>Profit!</li>
							</ul>
						</ModalBody>
					</Modal>
					<SocialPanel>
						<Social url="https://github.com/soup-bowl" icon={faGithub} color="#2d333b">
							soup-bowl
						</Social>
						<Social url="https://gitlab.com/soup-bowl" icon={faGitlab} color="#F96424">
							soup-bowl
						</Social>
						<Social url="https://profiles.wordpress.org/soupbowl" icon={faWordpress} color="#0085BA">
							soupbowl
						</Social>
						<Social url="https://last.fm/user/soup-bowl" icon={faLastfm} color="#BA0000">
							soup-bowl
						</Social>
						<Social url="https://twitter.com/TheAlmightyWord" icon={faTwitter} color="#1D9BD0">
							TheAlmightyWord
						</Social>
						<Social url="https://mstdn.social/@soupbowl" icon={faMastodon} color="#6364ff">
							soupbowl<br />@mstdn.social
						</Social>
						<Social url="https://www.reddit.com/user/MySQL-Error" icon={faReddit} color="#de5833">
							MySQL-Error
						</Social>
						<Social url="#" icon={faDiscord} color="#5865f2" onClick={openDialog}>
							soupbowl<br />#9999
						</Social>
					</SocialPanel>
				</div>
			</PageBody>
		</main>
	);
}
