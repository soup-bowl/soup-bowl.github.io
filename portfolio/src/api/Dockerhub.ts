const requests = {
	get: (url: string) => fetch(url).then((response) => response),
};

const DockerAPI = {
	get: (user: string, count: number) => requests.get(`https://hub.docker.com/v2/repositories/${user}?page_size=${count}&ordering=last_updated`)
		.then((response) => response.json()),
}

export default DockerAPI;
