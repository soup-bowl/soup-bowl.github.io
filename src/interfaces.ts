export interface IGitHubRepos {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	description: string;
	sizes: number;
	topics: string[];
	language: string;
	html_url: string;
	forks_count: number;
	open_issues_count: number;
	watchers_count: number;
	stargazers_count: number;
	archived: boolean;
	disabled: boolean;
	created_at: string;
	pushed_at: string;
}

export interface IRepoImages {
	repo: string;
	image: string;
}

export interface ILabs {
	lab: string;
	description: string;
	type: string;
	logo: string;
	url: string;
}

export interface IBlogPost {
	id: string;
	title: string;
	thumbnail?: string;
	summary: string;
	link: string;
	author: string;
	published: string;
	updated: string;
	categories: string[];
}

export interface IWordPressPluginListing {
	name: string;
	author: string;
	author_profile: string;
	added: string;
	last_updated: string;
	downloaded: number;
	homepage: string;
	sections: IWordPressPluginTexts;
	num_ratings: number;
	rating: number;
	ratings: IWordPressRatings;
	requires: string;
	requires_php: string;
	slug: string;
	tested: string;
	version: string;
}

export interface IWordPressPluginTexts {
	description?: string;
	installation?: string;
	changelog?: string;
	faq?: string;
}

export interface IWordPressRatings {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
}

export interface IOpenSimulatorStats {
	Dilatn: string;
	SimFPS: string;
	PhyFPS: string;
	AgntUp: string;
	RootAg: string;
	ChldAg: string;
	NPCAg: string;
	Prims: string;
	AtvPrm: string;
	AtvScr: string;
	ScrLPS: string;
	ScrEPS: string;
	PktsIn: string;
	PktOut: string;
	PendDl: string;
	PendUl: string;
	UnackB: string;
	TotlFt: string;
	NetFt: string;
	PhysFt: string;
	OthrFt: string;
	AgntFt: string;
	ImgsFt: string;
	FrameDilatn: string;
	"Logging in Users": string;
	GeoPrims: string;
	"Mesh Objects": string;
	"Script Engine Thread Count": string;
	RegionName: string;
	"Util Thread Count": string;
	"System Thread Count": string;
	"System Thread Active": string;
	ProcMem: string;
	Memory: string;
	Uptime: string;
	UptimeObject?: any;
	Version: string;
}

export interface IMastodonUser {
	id: string;
	username: string;
	acct: string;
	display_name: string;
	locked: boolean;
	bot: boolean;
	discoverable: boolean;
	group: boolean;
	created_at: string;
	note: string;
	url: string;
	avatar: string;
	avatar_static: string;
	header: string;
	header_static: string;
	followers_count: number;
	following_count: number;
	statuses_count: number;
	last_status_at: string;
	noindex: boolean;
	emojis: any[];
	fields: {
		name: string;
		value: string;
		verified_at?: string;
	};
}

export interface IMastodonStatus {
	id: string;
	created_at: string;
	in_reply_to_id?: string;
	in_reply_to_account_id?: string;
	sensitive: boolean;
	spoiler_text: string;
	visibility: string;
	language: string;
	uri: string;
	url: string;
	replies_count: number;
	reblogs_count: number;
	favourites_count: number;
	edited_at?: string;
	favourited: boolean;
	reblogged: boolean;
	muted: boolean;
	bookmarked: boolean;
	pinned: boolean;
	content: string;
	reblog?: IMastodonStatus;
	application?: {
		name: string;
		website: string;
	}
	account: IMastodonUser;
	media_attachments?: IMastodonMedia[]; 
	tags?: [{
		name: string;
		url: string;
	}]
	card?: {
		url: string;
		title: string;
		description: string;
		type: string;
		author_name: string;
		author_url: string;
		provider_name: string;
		provider_url: string;
		html: string;
		width: number;
		height: number;
		image: string;
		embed_url: string;
		blurhash: string;
	}
}

export interface IMastodonMedia {
	id: string;
	type: string;
	url: string;
	preview_url: string;
	remote_url?: string;
	preview_remote_url?: string;
	text_url?: string;
	meta?: {
		focus?: { x: number, y: number };
		original: IMastodonMediaSize;
		small?: IMastodonMediaSize;
	}
	description?: string;
	blurhash: string;
}

export interface IMastodonMediaSize {
	width: number;
	height: number;
	size: string;
	aspect: number;
}

export interface IDockerRepos {
	count: number;
	results: IDockerRepo[];
}

export interface IDockerRepo {
	name: string;
	namespace: string;
	repository_type: string;
	status: number;
	status_description: string;
	description: string;
	is_private: boolean;
	star_count: number;
	pull_count: number;
	last_updated: Date;
	date_registered: Date;
	affiliation: string;
	media_types: string[];
	content_types: string[];
}