import { ReactNode } from "react";
import styled from "@emotion/styled";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
	// @ts-ignore
	backgroundColor: props.theme.colors.primary,
	borderRadius: "15px",
	position: "relative",
	width: "18rem",
	height: "10rem",
	float: "left",
	overflow: "hidden",
	textAlign: "center",
	'::before': {
		content: '""',
		position: "absolute",
		right: 0,
		left: 0,
		top: 0,
		bottom: 0,
		opacity: 0,
		zIndex: 1,
		backgroundColor: `${props.color}c2`,
		backdropFilter: "blur(5px)",
		transition: "0.4s ease"
	},
	':hover, :active, :focus': {
		outline: "none",
		'::before': {
			opacity: 1
		},
		'[datatype="text"]': {
			opacity: 1
		}
	}
}));

const Label = styled.div(props => ({
	// @ts-ignore
	color: props.theme.colors.secondary,
	position: "absolute",
	height: "100%",
	width: "100%",
	zIndex: 10,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "0.4s ease",

	opacity: 0,
	fontWeight: "500",
	fontSize: "1.5rem",
}));

const Icon = styled.div(props => ({
	// @ts-ignore
	color: props.theme.colors.secondary,
	position: "absolute",
	height: "100%",
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	transition: "0.4s ease",

	top: 0,
	right: 0,
	fontSize: "4rem",
}));

interface CardProps {
	url: string;
	icon: IconDefinition;
	color: string;
	onClick?: (e:any) => void;
	children: ReactNode;
}

export const Social = ({ url, icon, color, onClick, children }: CardProps) => {
	return (
		<SocialSet rel="me" href={url} target="_blank" color={color} onClick={onClick}>
			<Icon datatype="icon"  color={color}>
				<FontAwesomeIcon icon={icon} />
			</Icon>
			<Label datatype="text">
				{children}
			</Label>
		</SocialSet>
	);
}
