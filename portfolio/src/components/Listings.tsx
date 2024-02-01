import styled from "@emotion/styled";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPenToSquare, faStar, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";


const Item = styled.div({
	backgroundColor: '#292929',
	borderRadius: '10px',
	boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.5)',
	display: 'flex',

	'@media only screen and (max-width: 750px)': {
		flexDirection: 'column'
	}
});

const ItemBlock = styled.div({
	backgroundColor: '#292929',
	borderRadius: '10px',
	boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.5)',
	padding: '10px'
});

const Image = styled.div({
	minHeight: '200px',
	flexBasis: '300px',
	flexShrink: 0,
	borderRadius: '10px 0 0 10px',
	backgroundPosition: 'center',
	backgroundSize: 'cover',

	'@media only screen and (max-width: 750px)': {
		borderRadius: '10px 10px 0 0'
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

const Socialview = styled.div({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'row-reverse',

	a: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		lineHeight: '1px',
		textDecoration: 'none',

		img: {
			height: '46px',
			width: '46px',
			borderRadius: '10px'
		}
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

const timeSince = (date: Date): string => {
	const now = new Date();
	let years = now.getFullYear() - date.getFullYear();
	let months = now.getMonth() - date.getMonth();
	let days = now.getDate() - date.getDate();

	if (months < 0 || (months === 0 && days < 0)) {
		years--;
		months += 12;
	}
	if (days < 0) {
		months--;
		const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0);
		days += previousMonth.getDate();
	}

	if (years > 0) return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	if (months > 0) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
	if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	return 'Today';
};


interface InfoProps {
	icon: IconDefinition;
	alt: string;
	children: ReactNode;
}

const ItemInfo = ({ icon, alt, children }: InfoProps) => {
	return (
		<div>
			<FontAwesomeIcon icon={icon} title={alt} />&nbsp;
			{children}
		</div>
	);
}

interface Props {
	title: string;
	image?: string;
	date?: Date;
	daysSince?: Date;
	stars?: number;
	downloads?: number;
	url: string;
	children: ReactNode;
}

export const ListingItem = ({
	title,
	image = undefined,
	date = undefined,
	daysSince = undefined,
	stars = 0,
	downloads = 0,
	url,
	children
}: Props) => {
	return (
		<Item>
			{image !== undefined ?
				<Image style={{ backgroundImage: `url(${image})` }} />
				: null}
			<Label>
				<h2><a href={url}>{title}</a></h2>
				<InfoBites>
					{date ? <ItemInfo icon={faClock} alt="Created">{date.toLocaleDateString('en-GB')}</ItemInfo> : null}
					{daysSince ? <ItemInfo icon={faPenToSquare} alt="Last change">{timeSince(daysSince)}</ItemInfo> : null}
					{stars > 0 ? <ItemInfo icon={faStar} alt="Stars">{stars}</ItemInfo> : null}
					{downloads > 0 ? <ItemInfo icon={faDownload} alt="Downloads">{downloads.toLocaleString('en-GB')}</ItemInfo> : null}
				</InfoBites>
				{children}
			</Label>
		</Item>
	);
}

interface SocialProps {
	avatar: string;
	name: string;
	profileUrl: string;
	handle: string;
	date: Date;
	url: string;
	image?: string;
	children: ReactNode;
}

export const ListingSocialItem = ({
	avatar,
	name,
	profileUrl,
	handle,
	url,
	date,
	image = undefined,
	children
}: SocialProps) => {
	return (
		<ItemBlock>
			<Socialview>
				<a href={url} style={{ color: 'grey' }}>
					{date.toLocaleDateString()}
				</a>
				<a href={profileUrl}>
					<div>
						<img src={avatar} alt="" />
					</div>
					<div>
						<p style={{ fontWeight: 'bold', color: 'white' }}>{name}</p>
						<p style={{ color: 'grey' }}>{handle}</p>
					</div>
				</a>
			</Socialview>
			<div>
				{children}
				{image !== undefined ?
					<div style={{ textAlign: 'center' }}>
						<img src={image} alt="" style={{
							maxWidth: '100%',
							borderRadius: '10px'
						}} />
					</div>
					: null}
			</div>
		</ItemBlock>
	);
}
