<script lang="ts">
	import { getAccessToken, resetLocalStorage, setAccessToken } from '$lib/persistence';
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
			if (afterHashtagParams.length) {
				const [_, accessToken] = afterHashtagParams[0];
				setAccessToken(accessToken);
				return accessToken;
			}
		}
	}

	onMount(async () => {
		loaded = true;
		let access_token = getAccessToken() || check_params();
		if (access_token) {
			token = true;
			const api = getAPI(access_token);
			try {
				const me = await getMe(api);
				userName = me.body['id'];
			} catch (e) {
				// must be logged out...
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
	{:else}
		<a href={auth()}>Login</a>
	{/if}
{/if}
