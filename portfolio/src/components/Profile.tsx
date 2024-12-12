import styled from "@emotion/styled"

export const ProfileDisplay = styled.div({
	padding: 20,
	display: "flex",
	flexWrap: "wrap",
	flexGrow: 1,
	justifyContent: "center",
	".picture img": {
		"@media only screen and (max-width: 1000px)": {
			maxWidth: "200px",
		},
	},
	".description": {
		width: "60%",
		"@media only screen and (max-width: 600px)": {
			width: "100%",
			textAlign: "center",
		},
	},
})
