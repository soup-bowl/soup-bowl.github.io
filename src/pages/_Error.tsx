import styled from "@emotion/styled";
import { useEffect } from "react";

const PageBody = styled.div({
	padding: 20,
	minHeight: '50vh',

	'& > div': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 25,
		height: '80vh',

		'& > img': {
			width: '50%',
			filter: "drop-shadow(0px 0px 50px #000)",

			'@media only screen and (max-width: 650px)': {
				width: '80%'
			}
		}
	}
});


export function Error404() {
	useEffect(() => { document.title = 'Error 404 - Soupbowl Portfolio' }, []);

	return (
		<PageBody>
			<div>
				<img src="https://soupbowl.blog/assets/cassette.png" alt="Error 404" />
			</div>
		</PageBody>
	);
}
