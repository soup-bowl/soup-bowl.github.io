import { Global, Interpolation, Theme, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";

export const PageBody = styled.main({
	backgroundColor: '#1B1A1B',
	padding: 20,
	minHeight: '90vh',
	borderRadius: '25px 25px 0 0',
	boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.5)',

	'& > h1, & > h2': {
		textAlign: 'center'
	}
});

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
		fontFamily: '\'Open Sans\', sans-serif',
		fontWeight: 300,
		fontSize: '1.125rem',
		color: theme.colors.white,
		backgroundColor: theme.colors.background,
	},
	a: {
		color: theme.colors.primary
	},
	':root': {
		colorScheme: 'dark'
	}
} as Interpolation<Theme>;

const BackgroundImage = styled.div({
	width: '100%',
	height: '100%',
	position: 'fixed',
	top: 0,
	left: 0,
	backgroundImage: 'url(/img/background.jpg)',
	backgroundPositionX: 'center',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	zIndex: -1
});

interface Props {
	children: ReactNode;
}

const Layout = ({children}:Props) => {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalTheme} />
			<BackgroundImage />
			{children}
		</ThemeProvider>
	);
}

export default Layout;