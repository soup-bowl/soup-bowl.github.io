import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode, useCallback, useEffect, useState } from "react"

const flyInAnimation = keyframes`
	0% {
		transform: translateY(100%);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const flyOutAnimation = keyframes`
	0% {
		transform: translateY(0);
		opacity: 1;
	}
	100% {
		transform: translateY(100%);
		opacity: 0;
	}
`

const fadeInBackdropAnimation = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0.75; /* or your desired backdrop opacity */
	}
`

const fadeOutBackdropAnimation = keyframes`
	0% {
		opacity: 0.75; /* or your desired backdrop opacity */
	}
	100% {
		opacity: 0;
	}
`

const ModalControl = styled.div({
	position: "fixed",
	zIndex: 1300,
	inset: 0,
})

const ModalBackdrop = styled.div<{ isVisible?: boolean }>((props) => {
	const animationType = props.isVisible === false ? fadeOutBackdropAnimation : fadeInBackdropAnimation

	return {
		position: "fixed",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		inset: "0px",
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		zIndex: -1,
		opacity: props.isVisible ? 0.75 : 0,
		animation: props.isVisible === undefined ? "none" : `${animationType} 0.3s ease-in-out`,
	}
})

const ModalBackground = styled.div({
	height: "100%",
	outline: 0,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
})

const ModalBox = styled.div<{ open?: boolean; isClosing?: boolean }>((props) => {
	const animationType = props.isClosing ? flyOutAnimation : flyInAnimation

	return {
		backgroundColor: "#C5A7C5",
		margin: "32px",
		position: "relative",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		width: "90vw",
		maxHeight: "calc(100% - 64px)",
		minWidth: "200px",
		border: "2px solid black",
		boxShadow: "8px 8px 0px #000",
		transform: props.open && !props.isClosing ? "translateY(0)" : "translateY(100%)",
		opacity: props.open && !props.isClosing ? 1 : 0,
		animation: props.open ? `${animationType} 0.3s ease-in-out` : "none",
	}
})

const ModalCloseBox = styled.button({
	cursor: "pointer",
	backgroundColor: "transparent",
	fontSize: "1.5em",
	color: "black",
	border: "inherit",
	borderRadius: "10px",
	position: "absolute",
	top: "15px",
	right: "15px",
})

const ModalHeader = styled.h2({
	padding: "16px 24px",
	flex: "0 0 auto",
	lineHeight: 0,
	fontSize: "1.25rem",
})

const ModalBody = styled.div({
	padding: "16px 24px",
	flex: "1 1 auto",
	overflowY: "auto",
	borderTop: "2px solid black",
})

interface ModalProps {
	title: string
	open?: boolean
	large?: boolean
	onClose: () => void
	children: ReactNode
}

const onCloseInteraction = (onClose: () => void) => {
	document.body.style.overflow = "visible"
	onClose()
}

export const Modal = ({ title, open, large, onClose, children }: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false)
	const [isBackdropVisible, setIsBackdropVisible] = useState(false)

	const handleClose = useCallback(() => {
		setIsClosing(true)
		setIsBackdropVisible(false)

		// Wait for the animation to complete before calling onClose
		const animationDuration = 300 // 0.3 seconds in milliseconds
		setTimeout(() => {
			onCloseInteraction(onClose)
			setIsClosing(false)
		}, animationDuration)
	}, [onClose])

	useEffect(() => {
		document.getElementById("modal")?.addEventListener("click", (e) => {
			if (e.target instanceof HTMLElement) {
				if (!e.target.closest("#modalbox")) {
					handleClose()
				}
			}
		})

		if (open) {
			setIsClosing(false)
			setIsBackdropVisible(true)
		}
	}, [open, handleClose])

	if (open || isClosing) {
		document.body.style.overflow = "hidden"
		return (
			<ModalControl id="modal">
				<ModalBackdrop isVisible={isBackdropVisible} />
				<ModalBackground>
					<ModalBox
						id="modalbox"
						style={{ maxWidth: large ? "1200px" : "600px" }}
						open={open}
						isClosing={isClosing}
					>
						<ModalHeader>
							{title}
							<ModalCloseBox onClick={handleClose}>
								<FontAwesomeIcon icon={faXmark} />
							</ModalCloseBox>
						</ModalHeader>
						<ModalBody>{children}</ModalBody>
					</ModalBox>
				</ModalBackground>
			</ModalControl>
		)
	} else {
		return <></>
	}
}
