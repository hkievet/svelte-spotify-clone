<script lang="ts">
	import { getAccessToken, resetLocalStorage, setAccessToken } from '$lib/persistence';
	import Playlists from '$lib/playlists.svelte';
	import { auth, getAPI, getMe } from '$lib/spotifyAuthURL';

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
			console.log(url);
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
		loaded = true;
		check_params();
		let api = getAPI();
		if (api) {
			token = true;
			try {
				const me = await getMe(api);
				userName = me.body['id'];
			} catch (e) {
				resetLocalStorage();
			}
		}
	});
</script>

{#if loaded}
	{#if token}
		{#if userName}
			<p>Logged in to Spotify as {userName}</p>
		{:else}
			<p>Logged in to Spotify as ...</p>
		{/if}

		<Playlists />
		<a href="/logout">Logout</a>
	{:else}
		<a href={auth()}>Login</a>
	{/if}
{/if}
