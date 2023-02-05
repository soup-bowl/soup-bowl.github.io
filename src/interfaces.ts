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
