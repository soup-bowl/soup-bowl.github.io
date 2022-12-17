import styled from "@emotion/styled";
import { ReactNode } from "react";

const Item = styled.div({
	backgroundColor: '#292929',
	borderRadius: '25px',
	boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.5)',
	display: 'flex',

	'@media only screen and (max-width: 750px)': {
		flexDirection: 'column'
	}
});

const Image = styled.div({
	minHeight: '200px',
	flexBasis: '300px',
	flexShrink: 0,
	borderRadius: '25px 0 0 25px',
	backgroundPosition: 'center',
	backgroundSize: 'cover',

	'@media only screen and (max-width: 750px)': {
		borderRadius: '25px 25px 0 0'
	}
});

const Label = styled.div({
	padding: 10,
	width: "100%",

	'& > h2': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		maxWidth: '95%'
	},
	a: {
        color: 'white',
	}
});

export const ListingItemGroup = styled.div({
	display: "grid",
	gridGap: "20px",
	margin: "20px 0 20px 0",
	marginLeft: "5%",
	marginRight: "5%",

	/*gridTemplateColumns: "auto auto",
	'@media only screen and (max-width: 1280px)': {
		gridTemplateColumns: "auto"
	},*/
	
	'@media only screen and (max-width: 750px)': {
		margin: 0
	}
});

interface Props {
	title: string;
	image?: string;
	url: string;
	children: ReactNode;
}

export function ListingItem({ title, image = undefined, url, children }: Props) {
	return (
		<Item>
			{image !== undefined ?
			<Image style={{ backgroundImage: `url(${image})` }} />
			: null}
			<Label>
				<h2><a href={url}>{title}</a></h2>
				{children}
			</Label>
		</Item>
	);
}
