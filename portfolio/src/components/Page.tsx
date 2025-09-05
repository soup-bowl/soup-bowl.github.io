import styled from "@emotion/styled"
import { blackOrWhite, hexToRgb } from "@/utils/colour"

export const PageHeader = styled.section({
	display: "flex",
	alignItems: "end",
	height: "100vh",
	scrollSnapAlign: "start",
	"& > div": {
		display: "flex",
		flexDirection: "row",
		gap: 20,
		width: "100%",
		backgroundColor: "#ff965b",
		color: "#000",
		padding: 20,
		borderTop: "4px solid black",
		fontSize: "24px",
		img: {
			width: 200,
		},
		"@media only screen and (max-width: 650px)": {
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
			gap: 0,
			marginTop: 20,
			paddingBottom: 50,
			img: {
				width: 150,
			},
		},
	},
})

export const PageBody = styled.section((props) => ({
	backgroundColor: props.color,
	color: blackOrWhite(hexToRgb(props.color ?? "#000")),
	minHeight: "100vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	scrollSnapAlign: "start",
	"@media only screen and (max-width: 650px)": {
		paddingBottom: 50,
	},
}))
