import { writable } from 'svelte/store';
import { getPlaylistTracks, getTrackFeatures } from './spotifyAPI';
import type { Playlist, Track, TrackFeatures } from './types';

interface SpotifyStore {
	username: string | null;
	playlists: Playlist[];
	selectedPlaylistId: string | null;
	playlistTracks: Track[];
	selectedTrackId: string | null;
	trackFeatures: TrackFeatures | null;
	playlist2tracks: { [key: string]: Track[] };
}

const store = writable<SpotifyStore>({
	username: null,
	playlists: [],
	selectedPlaylistId: null,
	playlistTracks: [],
	selectedTrackId: null,
	trackFeatures: null,
	playlist2tracks: {}
});

let prevSelectedPlaylistId: string | null;
let prevSelectedTrackId: string | null;
let loocalStorageSyncedAtStart = false;

// logs the store anytime it's updated
store.subscribe((store) => console.log(store));

// writes store to local storage for quick reloads
store.subscribe((store) => writeStore(store));

store.subscribe(({ selectedPlaylistId, selectedTrackId, playlists, playlist2tracks }) => {
	if (selectedPlaylistId !== prevSelectedPlaylistId) {
		prevSelectedPlaylistId = selectedPlaylistId;
		if (selectedPlaylistId !== null) {
			const playlistTracks = playlist2tracks[selectedPlaylistId];
			if (playlistTracks) {
				store.update((store) => ({ ...store, playlistTracks }));
			} else {
				store.update((store) => ({ ...store, playlistTracks: [] }));
				updatePlaylistTracks(selectedPlaylistId);
			}
		} else {
			store.update((store) => ({ ...store, playlistTracks: [] }));
		}
		return;
	} else if (selectedTrackId !== prevSelectedTrackId && selectedPlaylistId) {
		store.update((store) => ({ ...store, trackFeatures: null }));
		prevSelectedTrackId = selectedTrackId;
		updateTrackFeatures(selectedTrackId);
		return;
	}
});

async function updatePlaylistTracks(id: string | null) {
	if (id) {
		await getPlaylistTracks(id);
		// cache the dealio
		store.update((store) => {
			const newPlaylists2Track = { ...store.playlist2tracks };
			console.log(store.playlistTracks);
			newPlaylists2Track[id] = store.playlistTracks;
			return {
				...store,
				playlist2tracks: newPlaylists2Track
			};
		});
	}
}

async function updateTrackFeatures(id: string | null) {
	const trackFeatures = await getTrackFeatures(id);
	store.update((store) => ({ ...store, trackFeatures }));
}

export default store;

function writeStore(data: any) {
	if (typeof localStorage !== 'undefined' && loocalStorageSyncedAtStart) {
		localStorage.setItem('spotifyStore', JSON.stringify(data));
	}
}

export function getStore() {
	if (typeof localStorage !== 'undefined') {
		loocalStorageSyncedAtStart = true;
		const savedStore = localStorage.getItem('spotifyStore');
		if (savedStore !== null) {
			store.update((store) => ({ ...store, ...JSON.parse(savedStore as any) }));
		}
	}
}
