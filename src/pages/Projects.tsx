import { ReactNode, useEffect, useState } from "react";
import GitHubAPI from "../api/GitHub";
import { PageBody } from "../components/Layout";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IGitHubRepos } from "../interfaces";
import RepoImages from "../assets/RepositoryImages.json";

export default function Projects() {
	const [popularRepos, setPopularRepos] = useState<IGitHubRepos[]>([]);
	const [PopularReposErr, setPopularReposErr] = useState<boolean>(false);
	const [recentRepos, setRecentRepos] = useState<IGitHubRepos[]>([]);
	const [recentReposErr, setRecentReposErr] = useState<boolean>(false);

	useEffect(() => { document.title = 'Projects - Soupbowl Portfolio' }, []);

	useEffect(() => {
		GitHubAPI.searchUser('soup-bowl', 'stargazers', 3)
			.then(response => (setPopularRepos(response.data.items)))
			.catch(() => setPopularReposErr(true));
		GitHubAPI.repository('soup-bowl', 'updated', 3)
			.then(response => setRecentRepos(response.data))
			.catch(() => setRecentReposErr(true));
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
					stars={repo.stargazers_count}
					date={new Date(repo.created_at)}
					lastCommit={new Date(repo.pushed_at)}
				>
					<p>{repo.description}</p>
				</ListingItem>
			);
		});
	}

	function ErrorDisplay() {
		return (
			<div style={{ textAlign: 'center' }}>
				<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
				<p>An error occurred getting the info, sorry about that</p>
			</div>
		);
	}

	return (
		<PageBody>
			<h1>Projects</h1>
			<h2>Featured</h2>
			{!PopularReposErr ?
				<ListingItemGroup>
					{popularRepos && displayer(popularRepos)}
				</ListingItemGroup>
				:
				<ErrorDisplay />
			}
			<h2>Recent</h2>
			{!recentReposErr ?
				<ListingItemGroup>
					{recentRepos && displayer(recentRepos)}
				</ListingItemGroup>
				:
				<ErrorDisplay />
			}
		</PageBody>
	);
}
