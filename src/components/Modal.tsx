import styled from "@emotion/styled";
import { ReactNode } from "react";
import { ReactComponent as CloseButton } from '../assets/close.svg';

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
	backgroundColor: "rgba(0, 0, 0, 0.5)",
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
	backgroundColor: "#0a0a0a",
	fontSize: "1.5em",
	color: "white",
	border: "inherit",
	borderRadius: "10px",
	position: "absolute",
	top: "10px",
	right: "10px",
	svg: {
		width: "20px",
		height: "20px",
	}
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

export function Modal({ title, open, large, onClose, children }: ModalProps) {
	if (open) {
		return (
			<ModalControl>
				<ModalBackdrop />
				<ModalBackground>
					<ModalBox style={{ maxWidth: large ? '1200px' : '600px' }}>
						<ModalHeader>
							{title}
							<ModalCloseBox onClick={onClose}>
								<CloseButton />
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
