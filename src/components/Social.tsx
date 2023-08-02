import { ReactNode } from "react";
import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const hexColorToBlackOrWhite = (hexColor: string): string => {
	const hex = hexColor.replace("#", "");
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	const perceivedBrightness = (r * 299 + g * 587 + b * 114) / 1000;
	const primaryColor = perceivedBrightness >= 128 ? "#1B1A1B" : "#FFFFFF";

	return primaryColor;
};

export const SocialPanel = styled.div({
	display: "grid",
	gridGap: "20px",
	gridTemplateColumns: "auto auto auto",
	'@media only screen and (max-width: 1050px)': {
		gridTemplateColumns: "auto auto"
	},
	'@media only screen and (max-width: 650px)': {
		gridGap: "20px",

		a: {
			height: "6.4rem",
			width: "11rem",
			'[datatype="text"]': {
				fontSize: "1.5rem"
			},
			'[datatype="icon"]': {
				fontSize: "3rem"
			}
		}
	},
	'@media only screen and (max-width: 400px)': {
		gridTemplateColumns: "auto"
	}
});

const SocialSet = styled.a(props => ({
	backgroundColor: props.color,
	position: "relative",
	width: "18rem",
	height: "10rem",
	float: "left",
	overflow: "hidden",
	textAlign: "center",
	'::before, ::after': {
		content: '""',
		position: "absolute",
		right: 0,
		left: 0,
		zIndex: 1,
		backgroundColor: "black",
		transition: "0.4s ease"
	},
	'::before': {
		top: 0,
		bottom: 0,
		opacity: 0
	},
	'::after': {
		top: "10rem",
		bottom: 0,
		opacity: 0.25
	},
	':hover, :active, :focus': {
		outline: "none",
		'::before': {
			bottom: "10rem"
		},
		'::after': {
			top: 0
		},
		'[datatype="icon"]': {
			bottom: "10rem",
			top: "-10rem"
		},
		'[datatype="text"]': {
			top: 0
		}
	}
}));

const Label = styled.div(props => ({
	color: hexColorToBlackOrWhite(props.color ?? '#ffffff'),
	position: "absolute",
	height: "100%",
	width: "100%",
	zIndex: 10,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "0.4s ease",

	top: "10rem",
	fontWeight: "500",
	fontSize: "1.5rem",
}));

const Icon = styled.div(props => ({
	color: hexColorToBlackOrWhite(props.color ?? '#ffffff'),
	position: "absolute",
	height: "100%",
	width: "100%",
	zIndex: 10,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "0.4s ease",

	top: 0,
	right: 0,
	fontSize: "4rem",
}));

interface CardProps {
	id?: string;
	url?: string;
	icon?: IconDefinition;
	iconSvg?: React.SVGProps<SVGSVGElement>;
	color: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	children: ReactNode;
}

export const Social = ({ id, url = '#', icon, iconSvg, color, onClick, children }: CardProps) => {
	return (
		<SocialSet id={id} rel="me" href={url} color={color} onClick={onClick}>
			<Icon color={color} datatype="icon">
				{icon !== undefined ?
					<FontAwesomeIcon icon={icon} />
					:
					<>{iconSvg}</>
				}
			</Icon>
			<Label color={color} datatype="text">
				{children}
			</Label>
		</SocialSet>
	);
}
