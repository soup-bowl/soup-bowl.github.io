import styled from "@emotion/styled";
import { ReactNode } from "react";

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

const ModalBox = styled.div(props => ({
    // @ts-ignore
    backgroundColor: props.theme.colors.background,
    margin: "32px",
    position: "relative",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100% - 64px)",
    minWidth: "200px",
    maxWidth: "600px",
    borderRadius: "20px",
    boxShadow: [
        `rgb(0 0 0 / 20%) 0px 11px 15px -7px,
        rgb(0 0 0 / 14%) 0px 24px 38px 3px,
        rgb(0 0 0 / 12%) 0px 9px 46px 8px`
    ]
}));

const ModalCloseBox = styled.button(props => ({
    cursor: "pointer",
    fontSize: "1.5em",
    // @ts-ignore
    backgroundColor: props.theme.colors.primary,
    // @ts-ignore
    color: props.theme.colors.secondary,
    border: "inherit",
    borderRadius: "100px",
    position: "absolute",
    top: "10px",
    right: "10px"
}));

export const ModalHeader = styled.h2({
    padding: "16px",
    paddingBottom: 0
});

export const ModalBody = styled.div({
    padding: "16px",
    paddingTop: 0
});

interface ModalProps {
    open?: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
    if (open) {
        return (
            <ModalControl>
                <ModalBackground>
                    <ModalBackdrop />
                    <ModalBox>
                        <ModalCloseBox onClick={onClose}>X</ModalCloseBox>
                        {children}
                    </ModalBox>
                </ModalBackground>
            </ModalControl>
        );
    } else {
        return (<></>);
    }
}
