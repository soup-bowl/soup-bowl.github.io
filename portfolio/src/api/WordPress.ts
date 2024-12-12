const requests = {
	get: (url: string) => fetch(url).then((response) => response),
}

const WPAPI = {
	getPlugin: (plugin: string) =>
		requests.get(`https://api.wordpress.org/plugins/info/1.0/${plugin}.json`).then((response) => response.json()),
}

export default WPAPI
