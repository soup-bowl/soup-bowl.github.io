import { faComment, faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonGroup, NormalButton } from "@/components/Buttons"
import { ProfileDisplay } from "@/components/Profile"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"

const About = () => {
	return (
		<ProfileDisplay>
			<div className="picture">
				<img src="https://f.subo.dev/i/avatar.webp" alt="" />
			</div>
			<div className="description">
				<p>
					Hello! My name is <strong>Casey LP</strong> and I am a developer from Hertfordshire, United Kingdom.
					I work as an <strong>Azure-based DevOps Engineer</strong>. I have a particular fondness for
					emerging technologies and <strong>containerisation</strong>. I can often be found discussing the
					benefits of <strong>Docker</strong> and <strong>Kubernetes</strong>, and I often spend my free time
					designing solutions in <strong>Progressive Web App</strong> format.
				</p>
				<p>
					My primary languages are <strong>C#</strong> and <strong>TypeScript</strong>, with experience in
					similar languages too. I have several years of experience with <strong>Git</strong> and Git
					technology platforms, primarily <strong>Azure DevOps</strong>, <strong>GitHub</strong> and{" "}
					<strong>GitLab</strong>, and some experience with <strong>Subversion</strong> and{" "}
					<strong>JIRA</strong>. My cloud of choice is <strong>Azure</strong>, with minor experience in{" "}
					<strong>Amazon Web Services</strong>.
				</p>
				<p>
					If you wish to see more about me, please{" "}
					<a href="https://soupbowl.io/post" style={{ fontWeight: "bold" }}>
						check out my blog
					</a>
					.
				</p>
				<br />
				<p style={{ textAlign: "center", fontWeight: "bold" }}>Contact me on</p>
				<ButtonGroup>
					<NormalButton onClick={() => (window.location.href = "mailto:code@soupbowl.io")}>
						<FontAwesomeIcon icon={faEnvelope} /> Email
					</NormalButton>
					<NormalButton onClick={() => (window.location.href = "https://matrix.to/#/@soupbowl:mozilla.org")}>
						<FontAwesomeIcon icon={faComment} /> Matrix
					</NormalButton>
					<NormalButton
						onClick={() => (window.location.href = "https://discord.com/users/555374749019013141")}
					>
						<FontAwesomeIcon icon={faDiscord} /> Discord
					</NormalButton>
				</ButtonGroup>
			</div>
		</ProfileDisplay>
	)
}

export default About
