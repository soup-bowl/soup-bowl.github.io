import styled from '@emotion/styled';

export default function Navigation() {
	const Nav = styled.nav(props => ({
		display: 'flex',
		alignItems: 'center',
		margin: 14,
		color: 'red',
		fontSize: '24px'
	}));

	const NavItem = styled.a(props => ({
		textDecoration: 'none',
		marginLeft: 15,
		color: '#fff',
		textShadow: '0px 0px 5px rgba(0, 0, 0, 1)'
	}));

	const NavItemSeparator = NavItem.withComponent('span');

	const Logo = styled.img(props => ({
		width: 40
	}));

	return (
		<Nav>
			<Logo src="img/logo.png" />
			<NavItem href="dddd">soup-bowl</NavItem>
			<NavItemSeparator>|</NavItemSeparator>
			<NavItem href="dddd">About</NavItem>
			<NavItem href="dddd">Projects</NavItem>
		</Nav>
	);
}