import SpotifyWebApi from 'spotify-web-api-node';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SpotifyWebApiServer from 'spotify-web-api-node/src/server-methods';
import { getAccessToken } from './persistence';
import store from './spotifyStore';
import type { TrackFeatures } from './types';

(SpotifyWebApi as unknown as { _addMethods: (fncs: unknown) => void })._addMethods(
	SpotifyWebApiServer
);

export function auth() {
	//https://developer.spotify.com/documentation/general/guides/authorization/scopes/
	const scopes = [
		'user-read-private',
		'user-read-email',
		'user-modify-playback-state',
		'user-read-playback-state',
		'user-modify-playback-state'
	];
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

export function getAPIOrFail(): SpotifyWebApi {
	const api = getAPI();
	if (!api) {
		throw new Error('Should have api auth');
	}
	return api;
}

export async function getMe(spotifyApi: SpotifyWebApi) {
	return spotifyApi.getMe();
}

export async function getPlaylists() {
	const api = getAPIOrFail();
	const paginate = async (offset = 0, playlists: any[] = []): Promise<any[]> => {
		const data = await api.getUserPlaylists({ limit: 20, offset: offset });
		playlists.push(...data.body['items']);
		if (offset + 20 < data.body['total']) {
			return paginate(offset + 20, playlists);
		}
		return playlists;
	};
	return paginate();
}

export async function getPlaylistTracks(id: string | null): Promise<void> {
	if (id === null) {
		return;
	}
	const api = getAPIOrFail();
	const paginate = async (offset = 0): Promise<void> => {
		const data = await api.getPlaylistTracks(id, { limit: 20, offset: offset });
		const _songs = data.body['items'];
		const trackIds = _songs.map((t: any) => t.track.id);
		const features = await api.getAudioFeaturesForTracks(trackIds);
		_songs.map((t: any, i) => {
			t.features = features.body['audio_features'][i];
		});

		console.log(offset);
		store.update((store) => {
			console.log('on update');
			const newTracks = [...store.playlistTracks];
			console.log(newTracks);
			newTracks.push(...(_songs as any));
			return { ...store, playlistTracks: newTracks };
		});

		if (offset + 20 < data.body['total']) {
			return paginate(offset + 20);
		}
	};

	return paginate();
}

export async function getTrackFeatures(trackId: string | null): Promise<TrackFeatures | null> {
	if (!trackId) {
		return null;
	}
	const api = getAPIOrFail();
	return ((await api.getAudioFeaturesForTrack(trackId)) as any).body;
}

export async function playSong(id: string | null) {
	if (!id) {
		return;
	}
	const api = getAPI();
	if (!api) {
		throw new Error('Should have api auth');
	}

	api.play({ uris: [id] });
}
