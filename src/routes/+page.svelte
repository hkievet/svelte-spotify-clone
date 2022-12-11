<script lang="ts">
	import { getAccessToken, resetLocalStorage, setAccessToken } from '$lib/persistence';
	import Playlists from '$lib/playlists.svelte';
	import Songs from '$lib/songs.svelte';
	import { auth, getAPI, getMe } from '$lib/spotifyAPI';
	import spotifyStore, { getStore } from '$lib/spotifyStore';
	import TrackInfo from '$lib/trackInfo.svelte';

	let userName = '';
	let token = false;
	let loaded = false;

	import { onMount } from 'svelte';
	function check_params() {
		if (window.location.href.split('#').length === 2) {
			let afterHashtagParams = window.location.href
				.split('#')[1]
				.split('&')
				.map((v) => {
					const [key, val] = v.split('=');
					return [key, val];
				})
				.filter(([key, _]) => {
					return key === 'access_token';
				});
			let url = window.location.href;
			url = url.split('#')[0];
			// Use the replaceState method to modify the current URL
			window.history.replaceState({}, '', url);
			if (afterHashtagParams.length) {
				const [_, accessToken] = afterHashtagParams[0];
				setAccessToken(accessToken);
				return accessToken;
			}
		}
	}

	onMount(async () => {
		getStore();
		loaded = true;
		check_params();
		let api = getAPI();
		if (api) {
			token = true;
			try {
				const me = await getMe(api);
				userName = me.body['id'];
				spotifyStore.update((s) => ({ ...s, username: userName }));
			} catch (e) {
				resetLocalStorage();
			}
		}
	});
</script>

{#if loaded}
	{#if token}
		{#if userName}
			<div class="flex flex-row gap-x-2">
				<Playlists />
				<Songs />
				<div>
					<TrackInfo />
				</div>
			</div>
		{:else}
			<p>Logged in to Spotify as ...</p>
		{/if}
	{:else}
		<a href={auth()}>Login</a>
	{/if}
{/if}
