import { ReactNode, useEffect, useState } from "react";
import GitHubAPI from "../api/GitHub";
import { PageBody } from "../components/Layout";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IGitHubRepos } from "../interfaces";
import RepoImages from "../RepositoryImages.json";

export default function Projects() {
	const [popularRepos, setPopularRepos] = useState<IGitHubRepos[]>([]);
	const [recentRepos, setRecentRepos] = useState<IGitHubRepos[]>([]);

	useEffect(() => { document.title = 'Projects - Soupbowl Portfolio' }, []);

	useEffect(() => {
		GitHubAPI.searchUser('soup-bowl', 'updated', 5).then(response => setPopularRepos(response.data.items));
		GitHubAPI.repository('soup-bowl', 'updated', 5).then(response => setRecentRepos(response.data));
	}, []);

	function displayer(data: IGitHubRepos[]): ReactNode {
		return data.map((repo) => {
			let repoImg = RepoImages.filter((e) => {
				return e.repo === repo.full_name
			})[0]?.image ?? undefined;

			return (
				<ListingItem
					key={repo.id}
					title={repo.name}
					url={repo.html_url}
					image={repoImg}
				>
					<p>{repo.description}</p>
				</ListingItem>
			);
		});
	}

	return (
		<PageBody>
			<h1>Projects</h1>
			<h2>Featured</h2>
			<ListingItemGroup>
				{popularRepos && displayer(popularRepos)}
			</ListingItemGroup>
			<h2>Recent</h2>
			<ListingItemGroup>
				{recentRepos && displayer(recentRepos)}
			</ListingItemGroup>
		</PageBody>
	);
}
