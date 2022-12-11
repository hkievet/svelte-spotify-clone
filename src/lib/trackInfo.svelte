<script lang="ts">
	import spotifyStore from '$lib/spotifyStore';
	// import { getSongLyrics } from './geniusApi';
	import { playSong } from './spotifyAPI';

	$: track = getSelectedTrack($spotifyStore.selectedTrackId);

	// $: lyrics = getSongLyrics(track?.track?.artists[0]?.name ?? '', track?.track.name ?? '');

	function getSelectedTrack(id: string | null) {
		const result = $spotifyStore.playlistTracks.find((track) => {
			return track.track.id === id;
		});
		return result;
	}
</script>

{#if $spotifyStore.trackFeatures && $spotifyStore.selectedTrackId && !!track}
	<div>
		<h1>{track.track.name}</h1>
		<p class="acoustic">Accousticness: {$spotifyStore.trackFeatures.acousticness}</p>
		<p class="danceability">Danceability: {$spotifyStore.trackFeatures.danceability}</p>
		<p class="speechiness">Speechiness: {$spotifyStore.trackFeatures.speechiness}</p>
		<p class="energy">Energy: {$spotifyStore.trackFeatures.energy}</p>
		<p class="instrumentalness">Instrumentalness: {$spotifyStore.trackFeatures.instrumentalness}</p>
		<p class="liveness">Liveness: {$spotifyStore.trackFeatures.liveness}</p>
		<p class="valence">Valence: {$spotifyStore.trackFeatures.valence}</p>
		<!-- <p>{lyrics}</p> -->
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
