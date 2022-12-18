import { request } from "@octokit/request";

const requests = {
	get: (url: string, params: any) => request(url, params).then((response) => response),
};

const GitHubAPI = {
	searchUser: (user: string, sort: string, amount: number) => requests.get('GET /search/repositories{?q,sort,per_page}', {
		q: `user:${user}`,
		sort: sort,
		per_page: amount
	}),
	repository: (user: string, sort: string, amount: number) => requests.get('GET /users/{username}/repos{?sort,per_page}', {
		username: user,
		sort: sort,
		per_page: amount
	}),
}

export default GitHubAPI;
