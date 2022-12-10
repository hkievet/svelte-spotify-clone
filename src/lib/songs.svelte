<script lang="ts">
	import { onMount } from 'svelte';
	import { getPlaylists, getPlaylistTracks, playSong } from './spotifyAuthURL';
	import spotifyStore from '$lib/spotifyStore';

	let isLoaded = false;
	let playlists: any[] = [];
</script>

{#if $spotifyStore.playlistTracks}
	<div class="max-w-lg w-full h-screen max-h-screen overflow-y-scroll">
		{#each $spotifyStore.playlistTracks as track}
			<button
				class="flex flex-col"
				on:click={() =>
					spotifyStore.update((state) => ({ ...state, selectedTrackId: track.track.id }))}
				><p class="block">{track.track.name}</p>
				<p class="block text-xs">{track.track.artists[0].name}</p></button
			>
		{/each}
	</div>
{:else}
	<p>Loading Playlists</p>
{/if}

<style lang="postcss">
	button {
		@apply bg-h11ypeach rounded-sm py-2 pl-5 text-h11yblack flex my-1 w-full hover:text-h11ywhite text-left;
	}
</style>
