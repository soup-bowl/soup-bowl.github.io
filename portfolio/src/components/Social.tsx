import { ReactNode } from "react"
import styled from "@emotion/styled"
import { hexToRgb, pastelize } from "@/utils/colour"

import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SocialContainer = styled.div({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
})

export const SocialPanel = styled.div({
	display: "grid",
	gridGap: "20px",
	gridTemplateColumns: "auto auto auto",
	"@media only screen and (max-width: 1050px)": {
		gridTemplateColumns: "auto auto",
	},
	"@media only screen and (max-width: 650px)": {
		gridGap: "20px",

		a: {
			height: "6.4rem",
			width: "11rem",
			'[datatype="text"]': {
				fontSize: "1.5rem",
			},
			'[datatype="icon"]': {
				fontSize: "3rem",
			},
		},
	},
	"@media only screen and (max-width: 400px)": {
		gridTemplateColumns: "auto",
	},
})

const SocialSet = styled.a((props) => ({
	backgroundColor: pastelize(hexToRgb(props.color ?? "#fff")),
	color: "#fff",
	position: "relative",
	width: "18rem",
	height: "10rem",
	float: "left",
	overflow: "hidden",
	textAlign: "center",
	boxShadow: "4px 4px 0px #000",
	border: "2px solid black",
	"::before": {
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
		transition: "0.4s ease",
	},
	":hover, :active, :focus": {
		outline: "none",
		"::before": {
			opacity: 1,
		},
		'[datatype="text"]': {
			opacity: 1,
		},
	},
}))

const Label = styled.div({
	color: "#FFF",
	textShadow: "2px 2px #000",
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
})

const Icon = styled.div((props) => ({
	// @ts-expect-error Property secondary doesn't exist
	color: props.theme.colors.secondary,
	filter: "drop-shadow(3px 3px 0 black)",
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
}))

interface CardProps {
	id?: string
	url?: string
	icon?: IconDefinition
	iconSvg?: React.SVGProps<SVGSVGElement>
	color: string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
	children: ReactNode
}

export const Social = ({ id, url = "#", icon, iconSvg, color, onClick, children }: CardProps) => {
	return (
		<SocialSet id={id} rel="me" href={url} color={color} onClick={onClick}>
			<Icon color={color} datatype="icon">
				{icon !== undefined ? <FontAwesomeIcon icon={icon} /> : <>{iconSvg}</>}
			</Icon>
			<Label color={color} datatype="text">
				{children}
			</Label>
		</SocialSet>
	)
}
