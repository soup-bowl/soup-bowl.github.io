import { ReactNode, useEffect, useState } from "react";
import GitHubAPI from "../api/GitHub";
import { ListingItem, ListingItemGroup } from "../components/Listings";
import { IGitHubRepos } from "../interfaces";
import RepoImages from "../assets/RepositoryImages.json";
import { AttentionButton } from "../components/Buttons";
import { EState } from "../enums";
import { ErrorMessage, LoadingMessage } from "../components/Common";

const GitHub = () => {
	const [popularRepos, setPopularRepos] = useState<IGitHubRepos[]>([]);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		GitHubAPI.searchUser('soup-bowl', 'stargazers', 6)
			.then(response => {
				setPopularRepos(response.data.items);
				setRequestState(EState.Complete);
			})
			.catch(() => setRequestState(EState.Error));
	}, []);

	const displayer = (data: IGitHubRepos[]): ReactNode => {
		return data.map((repo) => {
			const repoImg = RepoImages.filter((e) => {
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
					daysSince={new Date(repo.pushed_at)}
				>
					<p>{repo.description}</p>
				</ListingItem>
			);
		});
	}

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<AttentionButton onClick={() => window.location.href = "https://github.com/soup-bowl"}>
					GitHub Account
				</AttentionButton>
			</div>
			<h2 style={{ textAlign: 'center' }}>Popular</h2>
			{requestState === EState.Complete ?
				<ListingItemGroup>
					{popularRepos && displayer(popularRepos)}
				</ListingItemGroup>
				:
				<>
					{requestState === EState.Started ?
						<LoadingMessage />
						:
						<ErrorMessage />
					}
				</>
			}
		</>
	);
}

export default GitHub;
