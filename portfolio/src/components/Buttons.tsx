import { Theme } from "@emotion/react"
import styled, { StyledComponent } from "@emotion/styled"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonHTMLAttributes, useEffect, useState } from "react"

interface NormalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean
}

export const AttentionButton = styled.button((props) => ({
	cursor: "pointer",
	backgroundColor: props.theme.colors.primary,
	border: "2px solid black",
	boxShadow: "4px 4px 0px #000",
	padding: "10px 15px 10px 15px",
	fontSize: "1.25em",
}))

interface AttentionLinkProps {
	disabled?: boolean
	theme?: { colors: { primary: string } }
}

export const AttentionLink = styled.a<AttentionLinkProps>((props) => ({
	backgroundColor: props.disabled ? "grey" : props.theme.colors.primary,
	border: "2px solid black",
	boxShadow: "4px 4px 0px #000",
	padding: "10px 15px",
	fontSize: "1.25em",
	color: "black",
	textShadow: "none",
	textDecoration: "none",
	pointerEvents: props.disabled ? "none" : "auto",
}))

const NormalButtonDefinition: StyledComponent<NormalButtonProps, NormalButtonProps, Theme> = styled.button((props) => ({
	cursor: "pointer",
	backgroundColor: props.active ? props.theme.colors.primary : "#ffbe96",
	border: "2px solid black",
	boxShadow: "4px 4px 0px #000",
	padding: "10px 15px 10px 15px",
	fontSize: "1.25em",
}))

export const NormalButton: React.FC<NormalButtonProps> = ({ active, ...rest }) => {
	// @ts-expect-error colors is missing in type
	return <NormalButtonDefinition active={active} {...rest} />
}

export const ButtonGroup = styled.div({
	display: "flex",
	width: "100%",
	gap: 10,
	justifyContent: "center",
	flexWrap: "wrap",
})

interface SBProps {
	onUp: () => void
	onDown: () => void
}

export const ScrollButtons = ({ onUp, onDown }: SBProps) => {
	const ScrollButton = styled.div({
		position: "fixed",
		bottom: "20px",
		right: "20px",
		button: {
			cursor: "pointer",
			border: "none",
			backgroundColor: "transparent",
			color: "white",
			fontSize: "3em",
			width: "75px",
			height: "75px",
			filter: "drop-shadow(0px 0px 5px black)",
			transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	})

	return (
		<ScrollButton>
			<button onClick={onDown}>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>
			<button onClick={onUp}>
				<FontAwesomeIcon icon={faChevronUp} />
			</button>
		</ScrollButton>
	)
}

export const ScrollToTopButton = () => {
	const [showTopButton, setShowTopButton] = useState<boolean>(false)

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 300) {
				setShowTopButton(true)
			} else {
				setShowTopButton(false)
			}
		})
	}, [])

	const ScrollButton = styled.button((props) => ({
		position: "fixed",
		bottom: "20px",
		right: "20px",
		cursor: "pointer",
		borderRadius: "250em",
		border: "none",
		backgroundColor: props.theme.colors.primary,
		fontSize: "3em",
		width: "75px",
		height: "75px",
		transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

		"@media only screen and (max-width: 650px)": {
			fontSize: "2em",
			width: "50px",
			height: "50px",
		},
	}))

	return (
		<ScrollButton
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" })
			}}
			style={{ opacity: showTopButton ? 1 : 0 }}
		>
			<FontAwesomeIcon icon={faChevronUp} />
		</ScrollButton>
	)
}
