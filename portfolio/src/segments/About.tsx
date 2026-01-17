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
					Hello! My name is <strong>Casey LP</strong> and I am an engineer from Hertfordshire, United Kingdom.
					I work as an <strong>Azure-based DevOps Engineer</strong>. I have a particular fondness for emerging
					technologies and <strong>containerisation</strong>. I can often be found discussing the benefits of{" "}
					<strong>containers</strong>, and I often spend my free time building pipelines, deployment code and
					microservices.
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
