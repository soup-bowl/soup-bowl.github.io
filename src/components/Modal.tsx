import styled from "@emotion/styled";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useEffect } from "react";

const ModalControl = styled.div({
	position: "fixed",
	zIndex: 1300,
	inset: 0
});

const ModalBackdrop = styled.div({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	inset: "0px",
	backgroundColor: "rgba(0, 0, 0, 0.75)",
	zIndex: -1
});

const ModalBackground = styled.div({
	height: "100%",
	outline: 0,
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
});

const ModalBox = styled.div({
	backgroundColor: "#1B1A1B",
	margin: "32px",
	position: "relative",
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	width: "90vw",
	maxHeight: "calc(100% - 64px)",
	minWidth: "200px",
	borderRadius: "5px",
	boxShadow: [
		`rgb(0 0 0 / 20%) 0px 11px 15px -7px,
		rgb(0 0 0 / 14%) 0px 24px 38px 3px,
		rgb(0 0 0 / 12%) 0px 9px 46px 8px`
	]
});

const ModalCloseBox = styled.button({
	cursor: "pointer",
	backgroundColor: "transparent",
	fontSize: "1.5em",
	color: "white",
	border: "inherit",
	borderRadius: "10px",
	position: "absolute",
	top: "15px",
	right: "15px",
});

const ModalHeader = styled.h2({
	padding: "16px 24px",
	flex: "0 0 auto",
	lineHeight: 0,
	fontSize: "1.25rem"
});

const ModalBody = styled.div({
	padding: "16px 24px",
	flex: "1 1 auto",
	overflowY: "auto",
	borderTop: "1px solid rgba(255, 255, 255, 0.12)"
});

interface ModalProps {
	title: string;
	open?: boolean;
	large?: boolean;
	onClose: () => void;
	children: ReactNode;
}

function onCloseInteraction(onClose: () => void) {
	document.body.style.overflow = 'visible';
	onClose();
}

export function Modal({ title, open, large, onClose, children }: ModalProps) {
	useEffect(() => {
		document.getElementById("modal")?.addEventListener("click", (e) => {
			if (e.target instanceof HTMLElement) {
				if (!e.target.closest("#modalbox")) {
					onCloseInteraction(onClose);
				}
			}
		});
	}, [onClose]);

	if (open) {
		document.body.style.overflow = 'hidden';
		return (
			<ModalControl id="modal">
				<ModalBackdrop />
				<ModalBackground>
					<ModalBox id="modalbox" style={{ maxWidth: large ? '1200px' : '600px' }}>
						<ModalHeader>
							{title}
							<ModalCloseBox onClick={() => onCloseInteraction(onClose)}>
								<FontAwesomeIcon icon={faXmark} />
							</ModalCloseBox>
						</ModalHeader>
						<ModalBody>
							{children}
						</ModalBody>
					</ModalBox>
				</ModalBackground>
			</ModalControl>
		);
	} else {
		return (<></>);
	}
}
