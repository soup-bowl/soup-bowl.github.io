import styled from "@emotion/styled";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const AttentionButton = styled.button(props => ({
	cursor: "pointer",
	// @ts-ignore
	backgroundColor: props.theme.colors.primary,
	borderRadius: "5px",
	padding: "5px 10px 5px 10px",
	fontSize: "1.5em",
	color: "white",
	border: "inherit",
}));

interface SBProps {
	onUp: () => void;
	onDown: () => void;
}

export const ScrollButtons = ({ onUp, onDown }: SBProps) => {
	const ScrollButton = styled.div(props => ({
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		button: {
			cursor: 'pointer',
			border: 'none',
			backgroundColor: 'transparent',
			fontSize: '3em',
			width: '75px',
			height: '75px',
			transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		}
	}));

	return (
		<ScrollButton>
			<button onClick={onDown}>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>
			<button onClick={onUp}>
				<FontAwesomeIcon icon={faChevronUp} />
			</button>
		</ScrollButton>
	);
}

export const ScrollToTopButton = () => {
	const [showTopButton, setShowTopButton] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.pageYOffset > 300) {
				setShowTopButton(true);
			} else {
				setShowTopButton(false);
			}
		});
	}, []);

	const ScrollButton = styled.button(props => ({
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		cursor: 'pointer',
		borderRadius: '250em',
		border: 'none',
		// @ts-ignore
		backgroundColor: props.theme.colors.primary,
		fontSize: '3em',
		width: '75px',
		height: '75px',
		transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

		'@media only screen and (max-width: 650px)': {
			fontSize: '2em',
			width: '50px',
			height: '50px',
		}
	}));

	return (
		<ScrollButton
			onClick={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
			style={{ opacity: (showTopButton) ? 1 : 0 }}
		>
			<FontAwesomeIcon icon={faChevronUp} />
		</ScrollButton>
	);
}