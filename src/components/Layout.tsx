import { Global, Interpolation, Theme, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export const PageBody = styled.div({
	padding: 20,

	'& > h1, & > h2': {
		textAlign: 'center'
	}
});

const theme = {
	colors: {
		// Based on the Pantone Colour of the Year.
		// https://www.pantone.com/uk/en/color-of-the-year
		// 2023 - VIVA MAGENTA - https://www.pantone.com/uk/en/color-of-the-year/2023
		primary: '#BE3455',
		secondary: '#fff',
		background: '#30040f',
		// 2022 - VERY PERI - https://www.pantone.com/color-of-the-year-2022
		//primary: '#6667ab',
		//secondary: '#fff',
		//background: '#070846',
	}
};

const globalTheme = {
	body: {
		margin: 0,
		fontFamily: '\'Open Sans\' , sans-serif',
		fontSize: '1.125rem',
		fontWeight: 300,
		color: theme.colors.secondary,
		//backgroundColor: theme.colors.background,

		'a, h1': {
			color: theme.colors.primary
		}
	}
} as Interpolation<Theme>;

const BackingDisplay = styled.div(props => ({
	backgroundImage: "url(/img/background.jpg)",
	backgroundSize: "cover",
	backgroundPositionX: "center",
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	zIndex: -1,

	'& > div': {
		backgroundColor: theme.colors.background,
		width: '100%',
		height: '100%',
		opacity: 0.9
	}
}));

export default function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalTheme} />
			<Navigation />
			<BackingDisplay>
				<div></div>
			</BackingDisplay>
			<Outlet />
		</ThemeProvider>
	);
}
