import { Global, Interpolation, Theme, ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const theme = {
	colors: {
		primary: '#ef1a1a',
		white: '#fff',
		background: '#1b1a1b'
	}
};

const globalTheme = {
	body: {
		margin: 0,
		fontFamily: 'sans-serif',
		color: theme.colors.white,
		backgroundImage: 'url(/img/background.jpg)',
		backgroundPositionX: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.colors.background,
	}
} as Interpolation<Theme>;

export default function Layout() {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalTheme} />
			<Navigation />
			<Outlet />
		</ThemeProvider>
	);
}
