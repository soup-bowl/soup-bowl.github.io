import { ScrollHint } from "@/components/Navigation";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = () => {
	return (
		<div>
			<div>
				<img src="https://files.soupbowl.io/i/logo.webp" />
			</div>
			<div>
				<h1 style={{ fontSize: '48px' }}>Soupbowl</h1>
				<p><strong>DevOps Engineer</strong> from <strong>Hertfordshire, UK</strong></p>
			</div>
			<ScrollHint>
				<FontAwesomeIcon icon={faArrowDown} />
			</ScrollHint>
		</div>
	);
}

export default Banner;
