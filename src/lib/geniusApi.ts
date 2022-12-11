const clientId = '_MEXmS-OQVY6XbbBOo_Ao7iVRBHQ435IlDomvFRxvxbA9iRjQV0W9gDLe5-acQx1vvvv';
const clientSecret =
	'1KFJkO0kcGgNBKvGnIk8dI1xh6Aki4LxXWLX2TNPxK_iKcMSIDEVgMZ3Cj6422PGAeTv82BfHqYE0rwfp_Q-Iw';
// https://genius.com/api-clients
const clientAccess = 'jDyL224ZQpnWVwDr9czzUIqw42za7QBbHe1I35vMFt0s8DEA7zs-XIpqkvnoUckw';

// https://docs.genius.com/
const base_genius_url = 'https://api.genius.com';

export async function getSongLyrics(artist: string, song: string): Promise<string | null> {
	const id = await search(`${artist}, ${song}`);
	if (id) {
		const lyricsPath = await getSongLyricsPath(id);
		if (lyricsPath) {
			const lyrics = await songLyricsForReal(lyricsPath);
			return lyrics;
		}
	}
	return null;
}

async function search(q: string): Promise<string | null> {
	try {
		const urlString = base_genius_url + '/search';
		const url = new URL(urlString);
		const params = new URLSearchParams();
		params.set('q', q);
		params.set('access_token', clientAccess);
		url.search = params.toString();

		const response = await fetch(url);
		const data = await response.json();
		const id = data.response.hits[0].result.id;
		return id;
	} catch (e) {
		console.error('issue getting the data');
		console.error(e);
	}
	return null;
}
async function getSongLyricsPath(songId: string): Promise<string | null> {
	try {
		const urlString = base_genius_url + `/songs/${songId}`;
		const url = new URL(urlString);
		const params = new URLSearchParams();
		params.set('access_token', clientAccess);
		params.set('text_format', 'plain');
		url.search = params.toString();

		const response = await fetch(url);
		const data = await response.json();
		if (data.meta.status === 200) {
			// const lyrics = data.response.song.description.plain;
			// return lyrics;
			return data.response.song.path;
		}
	} catch (e) {
		console.error('issue getting the data');
		console.error(e);
	}
	return null;
}

/**
 * Doesn't work on client side
 *
 * @param songLyricsUrl
 * @returns
 */
async function songLyricsForReal(songLyricsUrl: string): Promise<string | null> {
	const response = await fetch('https://genius.com' + songLyricsUrl);
	const text = await response.text();
	return text;
}
