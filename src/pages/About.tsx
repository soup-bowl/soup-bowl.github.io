import styled from "@emotion/styled";
import { faComment, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileDisplay = styled.div({
	padding: 20,
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

const CommOptions = styled.span({
	display: 'flex',
	gap: 10,
	fontSize: '1.25em',
	'a': {
		color: '#787878'
	},
	'@media only screen and (max-width: 600px)': {
		gap: 20,
		fontSize: '1.75em',
		justifyContent: 'center'
	}
});

const About = () => {
	return (
		<ProfileDisplay>
			<div className="picture">
				<img src="https://f.subo.dev/i/avatar.webp" alt="" />
			</div>
			<div className="description">
				<p>
					Hello! My name is <strong>Casey LP</strong> and I am a developer from Hertfordshire, United Kingdom. I work as an <strong>Azure-based DevOps Engineer</strong> for the <strong>National Physical Laboratory</strong>. Outside NPL, I have a particular fondness for emerging technologies and <strong>containerisation</strong>. I can often be found discussing the benefits of <strong>Docker</strong> and <strong>Kubernetes</strong>, and I often spend my free time designing solutions in <strong>Progressive Web App</strong> format.
				</p>
				<p>
					My languages of choice are <strong>Python</strong> and <strong>TypeScript</strong>. I have several years of experience with <strong>Git</strong> and Git technology platforms, primarily <strong>Azure DevOps</strong>, <strong>GitHub</strong> and <strong>GitLab</strong>, and some experience with <strong>Subversion</strong> and <strong>JIRA</strong>. My cloud of choice is <strong>Azure</strong>, with minor experience in <strong>Amazon Web Services</strong>.
				</p>
				<p>
					If you wish to see more about me, please <a href="https://blog.soupbowl.io" style={{ fontWeight: 'bold' }}>check out my blog</a>.
				</p>
				<CommOptions>
					<a href="mailto:code@soupbowl.io">
						<FontAwesomeIcon icon={faEnvelope} />
					</a>
					<a href="https://matrix.to/#/@soupbowl:mozilla.org">
						<FontAwesomeIcon icon={faComment} />
					</a>
				</CommOptions>
			</div>
		</ProfileDisplay>
	);
}

export default About;
