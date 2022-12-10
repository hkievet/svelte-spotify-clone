<script lang="ts">
	import spotifyStore from '$lib/spotifyStore';
	import { playSong } from './spotifyAuthURL';

	$: track = getSelectedTrack($spotifyStore.selectedTrackId);

	function getSelectedTrack(id: string | null) {
		const result = $spotifyStore.playlistTracks.find((track) => {
			// console.log(track.track.id);
			// console.log(id);
			return track.track.id === id;
		});
		console.log(result);
		return result;
	}
</script>

{#if $spotifyStore.trackFeatures && $spotifyStore.selectedTrackId && !!track}
	<div>
		<p>Track... {track.track.name}.</p>
		<p class="acoustic">Accousticness: {$spotifyStore.trackFeatures.acousticness}</p>
		<p class="danceability">Danceability: {$spotifyStore.trackFeatures.danceability}</p>
		<p class="speechiness">Speechiness: {$spotifyStore.trackFeatures.speechiness}</p>
		<p class="energy">energy: {$spotifyStore.trackFeatures.energy}</p>
		<p class="instrumentalness">instrumentalness: {$spotifyStore.trackFeatures.instrumentalness}</p>
		<p class="liveness">liveness: {$spotifyStore.trackFeatures.liveness}</p>
		<p class="valence">valence: {$spotifyStore.trackFeatures.valence}</p>
		<button
			on:click={() => {
				if (track) {
					playSong(track.track.uri);
				}
			}}>Play</button
		>
	</div>
{/if}

<style lang="postcss">
	.acoustic {
		@apply text-red-500;
	}
	.danceability {
		@apply text-orange-500;
	}
	.speechiness {
		@apply text-yellow-500;
	}
	.energy {
		@apply text-green-500;
	}
	.instrumentalness {
		@apply text-blue-500;
	}
	.liveness {
		@apply text-indigo-500;
	}
	.valence {
		@apply text-violet-500;
	}
</style>
