import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Soup } from '../assets/soup.svg';

export default function Navigation() {
	const navigate = useNavigate();

	const Nav = styled.div(props => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 14,
		fontSize: '24px',
		// @ts-ignore
		backgroundColor: props.theme.colors.primary,
		// @ts-ignore
		color: props.theme.colors.secondary,
		padding: '10px',
		borderRadius: '15px',
	}));

	const NavItem = styled.button({
		textDecoration: 'none',
		border: 'none',
		backgroundColor: 'inherit',
		fontFamily: 'inherit',
		fontSize: 'inherit',
		color: 'inherit',
		marginLeft: 15,

		'&:hover': {
			cursor: 'pointer'
		}
	});

	const Logo = styled.div({
		width: 40,

		'&:hover': {
			cursor: 'pointer'
		}
	});

	return (
		<Nav>
			<Logo onClick={() => navigate('/')}>
				<Soup />
			</Logo>
			<NavItem onClick={() => navigate('/me')}>About</NavItem>
			<NavItem onClick={() => navigate('/projects')}>Projects</NavItem>
			<NavItem onClick={() => navigate('/blog')}>Blog</NavItem>
		</Nav>
	);
}
