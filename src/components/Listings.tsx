import styled from "@emotion/styled";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPenToSquare, faStar, IconDefinition } from "@fortawesome/free-regular-svg-icons";


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
	flexGrow: 1,

	'& > h2': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		maxWidth: '95%'
	},
	a: {
        color: 'white',
	}
});

const InfoBites = styled.div({
	display: 'flex',
	flexDirection: 'row',
	color: 'lightgray',

	'div': {
		marginRight: '15px'
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

interface InfoProps {
	icon: IconDefinition;
	children: ReactNode;
}

function ItemInfo({icon, children}:InfoProps) {
	return(
		<div>
			<FontAwesomeIcon icon={icon} />&nbsp;
			{children}
		</div>
	);
}

interface Props {
	title: string;
	image?: string;
	date?: Date;
	lastCommit?: Date;
	stars?: number;
	url: string;
	children: ReactNode;
}

export function ListingItem({
	title,
	image = undefined,
	date = undefined,
	lastCommit = undefined,
	stars = undefined,
	url,
	children
}: Props) {
	return (
		<Item>
			{image !== undefined ?
			<Image style={{ backgroundImage: `url(${image})` }} />
			: null}
			<Label>
				<h2><a href={url}>{title}</a></h2>
				<InfoBites>
					{date ? <ItemInfo icon={faClock}>{date.toLocaleDateString('en-GB')}</ItemInfo> : null}
					{lastCommit ? <ItemInfo icon={faPenToSquare}>{((Date.now() - lastCommit.getTime()) / 86400000).toFixed(0)} days ago</ItemInfo> : null}
					{stars !== undefined ? <ItemInfo icon={faStar}>{stars}</ItemInfo> : null}
				</InfoBites>
				{children}
			</Label>
		</Item>
	);
}
