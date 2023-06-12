import styled from "@emotion/styled";

const ProfileDisplay = styled.div({
	display: 'flex',
	flexWrap: 'wrap',
	flexGrow: 1,
	justifyContent: 'center',
	'.picture img': {
		'@media only screen and (max-width: 1000px)': {
			maxWidth: "200px"
		}
	},
	'.description': {
		width: '60%',
		'@media only screen and (max-width: 600px)': {
			width: '100%',
			textAlign: 'center'
		}
	}
});

const About = () => {
	return (
		<ProfileDisplay>
			<div className="picture">
				<img src="https://i.redd.it/snoovatar/avatars/nftv2_bmZ0X2VpcDE1NToxMzdfYzhkM2EzYTgzYmRlNWRhZDA2ZDQzNjY5NGUzZTIyYWMzZTY0ZDU3N180OTI2NTk3_rare_6c64c43b-23fb-44f7-b9d0-7a809098239d.png" alt="" />
			</div>
			<div className="description">
				<p>
					Hello! My name is <strong>Casey LP</strong> and I am a developer from Hertfordshire, United Kingdom. I work as an <strong>Azure-based DevOps Engineer</strong> for the <strong>National Physical Laboratory</strong>. Outside NPL, I have a particular fondness for emerging technologies and <strong>containerisation</strong>. I can often be found discussing the benefits of <strong>Docker</strong> and <strong>Kubernetes</strong>, and I often spend my free time designing solutions in <strong>Progressive Web App</strong> format. 
				</p>
				<p>
					My languages of choice are <strong>Python</strong> and <strong>TypeScript</strong>. I have several years of experience with <strong>Git</strong> and Git technology platforms, primarily <strong>Azure DevOps</strong>, <strong>GitHub</strong> and <strong>GitLab</strong>, and some experience with <strong>Subversion</strong> and <strong>JIRA</strong>. My cloud of choice is <strong>Azure</strong>, with minor experience in <strong>Amazon Web Services</strong>. 
				</p>
				<p>
					If you wish to see more about me, please <a href="https://blog.soupbowl.io">check out my blog</a>.
				</p>
			</div>
		</ProfileDisplay>
	);
}

export default About;
