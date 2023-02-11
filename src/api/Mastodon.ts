const APIURL = "https://mstdn.social/api";
const AccId = "109437206725527058";

const requests = {
	get: (url: string) => fetch(url).then((response) => response),
};

const MastoAPI = {
	getUser: () => requests.get(`${APIURL}/v2/search?q=%40soupbowl&limit=1`)
		.then((response) => response.json()),
	getLatestPosts: () => requests.get(`${APIURL}/v1/accounts/${AccId}/statuses?exclude_replies=true`)
		.then((response) => response.json()),
}

export default MastoAPI;
