import SpotifyWebApi from 'spotify-web-api-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SpotifyWebApiServer from 'spotify-web-api-node/src/server-methods';
import { getAccessToken } from './persistence';

(SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void })._addMethods(
	SpotifyWebApiServer
);

export function auth() {
	const scopes = ['user-read-private', 'user-read-email'];
	const redirectUri = 'http://localhost:5173/';
	const clientId = '3e64e205a53b46ea9735eb446a9c97f6';
	const state = 'some-state-of-my-choice';
	const showDialog = true;
	const responseType = 'token';
	// const responseType = 'token';

	const spotifyApi = new SpotifyWebApi({
		redirectUri: redirectUri,
		clientId: clientId
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, showDialog, responseType);
	console.log(authorizeURL);

	return authorizeURL;
}

export function getAPI(): SpotifyWebApi | null {
	const accessToken = getAccessToken();
	if (accessToken) {
		const credentials = {
			clientId: '3e64e205a53b46ea9735eb446a9c97f6',
			clientSecret: '9e04088522294c6e9c22a2c503e92ad5',
			accessToken: accessToken
		};
		const spotifyApi = new SpotifyWebApi(credentials);
		return spotifyApi;
	}
	return null;
}

export async function getMe(spotifyApi: SpotifyWebApi) {
	return spotifyApi.getMe();
}

export async function getPlaylists() {
	const api = getAPI();
	if (!api) {
		throw new Error('Should have api auth');
	}
	const paginate = async (offset = 0, playlists: any[] = []): Promise<any[]> => {
		console.log(offset);
		const data = await api.getUserPlaylists({ limit: 20, offset: offset });
		playlists.push(...data.body['items']);
		if (offset + 20 < data.body['total']) {
			return paginate(offset + 20, playlists);
		}
		return playlists;
	};
	return paginate();
}
