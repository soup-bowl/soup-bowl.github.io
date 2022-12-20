import styled from "@emotion/styled";
import { useEffect } from "react";
import { PageBody } from "../components/Layout";

const Logo = styled.img({
	'@media only screen and (max-width: 1000px)': {
		maxWidth: "200px"
	}
});

const Link = styled.a({
	color: 'red'
});

export default function About() {
	useEffect(() => { document.title = 'Casey LP - Soupbowl Portfolio' }, []);

	return (
		<PageBody>
			<h1>About me</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1, justifyContent: 'center' }}>
				<div>
					<Logo src="https://i.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfYzhkM2EzYTgzYmRlNWRhZDA2ZDQzNjY5NGUzZTIyYWMzZTY0ZDU3N180OTI2NTk3_rare_9db00129-70d9-445d-b04f-c877165849b0.png" alt="" />
				</div>
				<div style={{ width: '60%' }}>
					<p>
						Hello! My name is <strong>Casey LP</strong> and I am a developer from Hertfordshire, United
						Kingdom. I work as an <strong>Azure-based DevOps Engineer</strong> for the <strong>National
						Physical Laboratory</strong>. Outside NPL, I have a particular fondness for emerging technologies
						and <strong>containerisation</strong>. I can often be found discussing the benefits of
						<strong>Docker</strong> and <strong>Kubernetes</strong>, and I often spend my free time designing
						solutions in <strong>Progressive Web App</strong> format. 
					</p>
					<p>
						My languages of choice are <strong>Python</strong> and <strong>TypeScript</strong>. I have
						several years of experience with <strong>Git</strong> and Git technology platforms, primarily
						<strong>Azure DevOps</strong>, <strong>GitHub</strong> and <strong>GitLab</strong>, and some
						experience with <strong>Subversion</strong> and <strong>JIRA</strong>. My cloud of choice is
						<strong>Azure</strong>, with minor experience in <strong>Amazon Web Services</strong>. 
					</p>
					<p>
						If you wish to see more about me, please <Link href="https://soupbowl.blog">check out my blog</Link>.
					</p>
				</div>
			</div>
		</PageBody>
	);
}
