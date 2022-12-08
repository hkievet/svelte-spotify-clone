export function setAccessToken(token: string) {
	localStorage.setItem('spotifyAccessToken', token);
}

export function resetLocalStorage() {
	localStorage.clear();
}

export function getAccessToken(): string | null {
	return localStorage.getItem('spotifyAccessToken');
}
