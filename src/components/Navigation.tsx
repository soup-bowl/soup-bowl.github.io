import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Soup } from '../assets/soup.svg';

export default function Navigation() {
	const navigate = useNavigate();

	const Nav = styled.nav(props => ({
		display: 'flex',
		alignItems: 'center',
		margin: 14,
		color: 'red',
		fontSize: '24px',

		'@media only screen and (max-width: 650px)': {
			justifyContent: 'center',

			'span': {
				display: 'none'
			}
		}
	}));

	const NavItem = styled.button(props => ({
		textDecoration: 'none',
		border: 'none',
		backgroundColor: 'inherit',
		fontSize: 'inherit',
		marginLeft: 15,
		color: '#fff',
		textShadow: '0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 5px #000',

		'&:hover': {
			cursor: 'pointer'
		}
	}));

	const NavItemSeparator = NavItem.withComponent('span');

	const Logo = styled.div(props => ({
		width: 40,
		filter: "drop-shadow(0px 0px 5px #000)",

		'&:hover': {
			cursor: 'pointer'
		}
	}));

	return (
		<Nav>
			<Logo onClick={() => navigate('/')}>
				<Soup />
			</Logo>
			<span>
				<NavItem onClick={() => navigate('/')}>soup-bowl</NavItem>
			</span>
			<NavItemSeparator>|</NavItemSeparator>
			<NavItem onClick={() => navigate('/me')}>About</NavItem>
			<NavItem onClick={() => navigate('/projects')}>Projects</NavItem>
			<NavItem onClick={() => {
				window.location.href = 'https://soupbowl.io';
				return null;
			}}>Blog</NavItem>
		</Nav>
	);
}