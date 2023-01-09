import { ReactNode, useEffect, useState } from "react";
import GitHubAPI from "../api/GitHub";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IGitHubRepos } from "../interfaces";
import RepoImages from "../assets/RepositoryImages.json";
import { AttentionButton } from "../components/Buttons";

export default function GitHub() {
	const [popularRepos, setPopularRepos] = useState<IGitHubRepos[]>([]);
	const [PopularReposErr, setPopularReposErr] = useState<boolean>(false);

	useEffect(() => {
		GitHubAPI.searchUser('soup-bowl', 'stargazers', 6)
			.then(response => (setPopularRepos(response.data.items)))
			.catch(() => setPopularReposErr(true));
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
		<>
			<div style={{ textAlign: 'center' }}>
				<AttentionButton onClick={() => window.location.href = "https://github.com/soup-bowl"}>
					GitHub Account
				</AttentionButton>
			</div>
			<h2 style={{ textAlign: 'center' }}>Popular</h2>
			{!PopularReposErr ?
				<ListingItemGroup>
					{popularRepos && displayer(popularRepos)}
				</ListingItemGroup>
				:
				<ErrorDisplay />
			}
		</>
	);
}
