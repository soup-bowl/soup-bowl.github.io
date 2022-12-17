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
