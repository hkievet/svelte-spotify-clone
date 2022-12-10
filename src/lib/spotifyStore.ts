import { onMount } from 'svelte';
import { writable } from 'svelte/store';
import { getPlaylistTracks, getTrackFeatures } from './spotifyAuthURL';
import type { Playlist, Track, TrackFeatures } from './types';

interface SpotifyStore {
	playlists: Playlist[];
	selectedPlaylistId: string | null;
	playlistTracks: Track[];
	selectedTrackId: string | null;
	trackFeatures: TrackFeatures | null;
}

const store = writable<SpotifyStore>({
	playlists: [],
	selectedPlaylistId: null,
	playlistTracks: [],
	selectedTrackId: null,
	trackFeatures: null
});

let prevSelectedPlaylistId: string | null;
let prevSelectedTrackId: string | null;
let loocalStorageSyncedAtStart = false;

// logs the store anytime it's updated
store.subscribe((store) => console.log(store));

// writes store to local storage for quick reloads
store.subscribe((store) => writeStore(store));

store.subscribe(({ selectedPlaylistId, selectedTrackId }) => {
	if (selectedPlaylistId !== prevSelectedPlaylistId) {
		store.update((store) => ({ ...store, playlistTracks: [] }));
		// udate the songs for a selected playlsit when the id is updated
		prevSelectedPlaylistId = selectedPlaylistId;
		updatePlaylistTracks(selectedPlaylistId);
		return;
	} else if (selectedTrackId !== prevSelectedTrackId) {
		store.update((store) => ({ ...store, trackFeatures: null }));
		// udate the songs for a selected playlsit when the id is updated
		prevSelectedTrackId = selectedTrackId;
		updateTrackFeatures(selectedTrackId);
		return;
	}
});

async function updatePlaylistTracks(id: string | null) {
	const playlistTracks = await getPlaylistTracks(id);
	store.update((store) => ({ ...store, playlistTracks: playlistTracks }));
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
		console.log('got store', savedStore);
		if (savedStore !== null) {
			store.update((store) => ({ ...store, ...JSON.parse(savedStore as any) }));
		}
	}
}
