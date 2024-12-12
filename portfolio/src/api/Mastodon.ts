import { IMastodonStatus, IMastodonUser } from "@/interfaces"

const APIURL = "https://mstdn.social/api"
const AccId = "109437206725527058"

const requests = {
	get: (url: string) => fetch(url).then((response) => response),
}

const MastoAPI = {
	getUser: (): Promise<IMastodonUser> =>
		requests.get(`${APIURL}/v1/accounts/${AccId}`).then((response) => response.json()),
	getLatestPosts: (): Promise<IMastodonStatus[]> =>
		requests
			.get(`${APIURL}/v1/accounts/${AccId}/statuses?exclude_replies=true`)
			.then((response) => response.json()),
	// Needs API token :(
	//getLatestHTW: () => requests.get(`${APIURL}/v2/search?q=my+week+with+%23lastfm&limit=5&account_id=${AccId}`)
	//	.then((response) => response.json()),
}

export default MastoAPI
