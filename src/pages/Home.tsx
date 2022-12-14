import styled from "@emotion/styled";
import { faGithub, faGitlab, faLastfm, faMastodon, faTwitter, faWordpress } from "@fortawesome/free-brands-svg-icons";
import { Social, SocialPanel } from "../components/Social";

const PageHeader = styled.div({
	backgroundColor: 'rgb(0 0 0 / 60%)',
	padding: 20,
	marginTop: 200,
	borderRadius: '25px 25px 0 0',
	'& > h1': {
		fontSize: '48px'
	},
	'& > p': {
		fontSize: '24px'
	}
});

const PageBody = styled.div({
	backgroundColor: '#1B1A1B',
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
	return (
		<div>
			<PageHeader>
				<h1>soup-bowl</h1>
				<p>DevOps and Web Developer from Hertfordshire, UK</p>
			</PageHeader>
			<PageBody>
				<div>
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
					</SocialPanel>
				</div>
			</PageBody>
		</div>
	);
}
