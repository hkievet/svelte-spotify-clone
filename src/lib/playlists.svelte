<script lang="ts">
	import { onMount } from 'svelte';
	import { getPlaylists } from './spotifyAuthURL';

	let isLoaded = false;
	let playlists: any[] = [];

	onMount(async () => {
		playlists = await getPlaylists();
		isLoaded = true;
	});
</script>

{#if isLoaded}
	{#each playlists as playlist}
		<p>{playlist.name}</p>
	{/each}
{:else}
	<p>Loading Playlists</p>
{/if}
