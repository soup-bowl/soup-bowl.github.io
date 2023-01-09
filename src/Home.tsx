import styled from "@emotion/styled";
import {
	faBloggerB, faDiscord, faGithub, faGitlab, faLastfm, faMastodon, faReddit, faTwitter, faWordpress
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { Timeline } from "react-twitter-widgets";
import { ScrollToTopButton } from "./components/Buttons";
import Layout from "./components/Layout";
import { Modal } from "./components/Modal";
import { Social, SocialPanel } from "./components/Social";

import About from "./pages/About";
import Blog from "./pages/Blog";
import GitHub from "./pages/GitHub";
import WordPress from "./pages/WordPress";

const PageHeader = styled.div({
	display: 'flex',
	alignItems: 'end',
	height: '100vh',
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
			marginTop: 20
		}
	}
});

const PageBody = styled.div(props => ({
	backgroundColor: props.color,
	padding: 20,
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const SocialContainer = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%'
});

export default function Home() {
	const [open, setOpen] = useState<string>("0");
	const [showTopButton, setShowTopButton] = useState<boolean>(false);

	const openDialog = (e: any) => {
		e.preventDefault();
		setOpen(e.target.parentElement.id);
	};

	const closeDialog = () => {
		setOpen("0");
	};

	useEffect(() => { document.title = 'Soupbowl Portfolio' }, []);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				setShowTopButton(true);
			} else {
				setShowTopButton(false);
			}
		});
	}, []);

	//const scrollTo = (location:string) => { document.getElementById(location)?.scrollIntoView({ behavior: 'smooth' }) }

	return (
		<Layout>
			<Modal large title="Blog" open={(open === "1") ? true : false} onClose={closeDialog}>
				<Blog />
			</Modal>
			<Modal large title="GitHub" open={(open === "2") ? true : false} onClose={closeDialog}>
				<GitHub />
			</Modal>
			<Modal title="WordPress" open={(open === "4") ? true : false} onClose={closeDialog}>
				<WordPress />
			</Modal>
			<Modal title="Twitter" open={(open === "5") ? true : false} onClose={closeDialog}>
				<Timeline
					dataSource={{
						sourceType: 'profile',
						screenName: 'TheAlmightyWord'
					}}
					options={{
						height: '400',
						theme: 'dark'
					}}
				/>
			</Modal>
			<Modal title="Talking on Discord" open={(open === "8") ? true : false} onClose={closeDialog}>
				<p>There's no direct link to <strong>Discord</strong>, so to start a chat:</p>
				<ul>
					<li>Open the Discord app (desktop, mobile, whatever).</li>
					<li>Click on <strong>Find or Start a Conversation</strong>.</li>
					<li>Paste in <strong>soupbowl#9573</strong>.</li>
					<li>???</li>
					<li>Profit!</li>
				</ul>
			</Modal>

			<main>
				<PageHeader id="start">
					<div id="500" onClick={openDialog}>
						<h1>soup-bowl</h1>
						<p><strong>DevOps</strong> and <strong>Web Developer</strong> from <strong>Hertfordshire, UK</strong></p>
					</div>
				</PageHeader>

				<PageBody id="socials" color='#1B1A1B'>

					<SocialContainer>
						<SocialPanel>
							<Social id="1" url="#" icon={faBloggerB} color="#29132e" onClick={openDialog}>
								soupbowl.blog
							</Social>
							<Social id="2" url="#" icon={faGithub} color="#2d333b" onClick={openDialog}>
								soup-bowl
							</Social>
							<Social url="https://gitlab.com/soup-bowl" icon={faGitlab} color="#F96424">
								soup-bowl
							</Social>
							<Social id="4" url="#" icon={faWordpress} color="#0085BA" onClick={openDialog}>
								soupbowl
							</Social>
							<Social url="https://last.fm/user/soup-bowl" icon={faLastfm} color="#BA0000">
								soup-bowl
							</Social>
							<Social id="5" url="#" icon={faTwitter} color="#1D9BD0" onClick={openDialog}>
								TheAlmightyWord
							</Social>
							<Social url="https://mstdn.social/@soupbowl" icon={faMastodon} color="#6364ff">
								soupbowl<br />@mstdn.social
							</Social>
							<Social url="https://www.reddit.com/user/MySQL-Error" icon={faReddit} color="#de5833">
								MySQL-Error
							</Social>
							<Social id="8" url="#" icon={faDiscord} color="#5865f2" onClick={openDialog}>
								soupbowl<br />#9573
							</Social>
						</SocialPanel>
					</SocialContainer>
				</PageBody>

				<PageBody id="about" color='#101010'>
					<About />
				</PageBody>
			</main>

			<ScrollToTopButton visible={showTopButton} />
		</Layout>
	);
}
