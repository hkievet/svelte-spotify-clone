export interface TrackFeatures {
	acousticness: number;
	analysis_url: string;
	danceability: number;
	duration_ms: number;
	energy: number;
	id: string;
	instrumentalness: number;
	key: number;
	liveness: number;
	loudness: number;
	mode: number;
	speechiness: number;
	tempo: number;
	time_signature: number;
	track_href: string;
	type: string;
	uri: string;
	valence: number;
}

export interface Playlist {
	name: string;
	id: string;
}

export interface Album {
	album_type: string;
	href: string;
	id: string;
}

export interface Artist {
	id: string;
	name: string;
	type: 'artist';
	uri: string;
}

export interface _Track {
	name: string;
	id: string;
	uri: string;
	album: Album;
	artists: Artist[];
}

export interface Track {
	track: _Track;
}
