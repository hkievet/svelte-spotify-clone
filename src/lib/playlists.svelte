<script lang="ts">
	import { onMount } from 'svelte';
	import { getPlaylists } from './spotifyAPI';
	import spotifyStore from '$lib/spotifyStore';
	import AccountBadge from './accountBadge.svelte';

	let playlists: any[] = [];

	onMount(async () => {
		if (!$spotifyStore.playlists.length) {
			playlists = await getPlaylists();
			spotifyStore.set({ ...$spotifyStore, playlists });
		}
	});
</script>

<div class="max-w-sm w-full overflow-y-scroll h-screen max-h-screen">
	<AccountBadge />
	{#if $spotifyStore.playlists}
		{#each $spotifyStore.playlists as playlist}
			<button
				on:click={() => {
					spotifyStore.set({ ...$spotifyStore, selectedPlaylistId: playlist.id });
				}}>{playlist.name}</button
			>
		{/each}
	{:else}
		<p>Loading Playlists</p>
	{/if}
</div>

<style lang="postcss">
	button {
		@apply bg-h11ypeach rounded-sm py-2 pl-5 text-h11yblack flex my-1 w-full hover:text-h11ywhite;
	}
</style>
