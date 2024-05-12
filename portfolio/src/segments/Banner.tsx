import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bounce = keyframes`
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
`;

export const ScrollReminder = styled.div({
	position: 'absolute',
	right: 10,
	bottom: 0,
	fontSize: '5rem',
	animation: `${bounce} 3s infinite`,
});

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
			<ScrollReminder>
				<FontAwesomeIcon icon={faArrowDown} />
			</ScrollReminder>
		</div>
	);
}

export default Banner;
