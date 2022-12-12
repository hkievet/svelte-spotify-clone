<script lang="ts">
	import { onMount } from 'svelte';
	import { getPlaylists, getPlaylistTracks, playSong } from './spotifyAPI';
	import spotifyStore from '$lib/spotifyStore';
	import TrackFeatures from './trackFeatures.svelte';
	import { calculateAverageFeatures } from './calculateAverageFeatures';

	let isLoaded = false;
	let playlists: any[] = [];

	$: playlist = getSelectedPlaylist($spotifyStore.selectedPlaylistId);

	$: trackFeatures = calculateAverageFeatures($spotifyStore?.playlistTracks.map((t) => t.features));

	function getSelectedPlaylist(id: string | null) {
		const result = $spotifyStore.playlists.find((playlist) => {
			return playlist.id === id;
		});
		return result;
	}
</script>

{#if $spotifyStore.playlistTracks && playlist}
	<div class="max-w-lg w-full h-screen max-h-screen overflow-y-scroll">
		<h1>{playlist.name}</h1>
		<TrackFeatures features={trackFeatures} />
		{#each $spotifyStore.playlistTracks as track}
			<button
				class="flex flex-row justify-between"
				on:click={() =>
					spotifyStore.update((state) => ({ ...state, selectedTrackId: track.track.id }))}
			>
				<div>
					<p class="block">{track.track.name}</p>
					<p class="block text-xs">{track.track.artists[0].name}</p>
				</div>
				<TrackFeatures features={track.features} />
			</button>
		{/each}
	</div>
{:else}{/if}

<style lang="postcss">
	button {
		@apply bg-h11ypeach rounded-sm py-2 pl-5 text-h11yblack flex my-1 w-full hover:text-h11ywhite text-left;
	}
</style>
