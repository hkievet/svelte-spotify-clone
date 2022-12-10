<script>
	import spotifyStore from '$lib/spotifyStore';
</script>

{#if $spotifyStore.trackFeatures}
	<div>
		<p>Track....</p>
		<p>Accousticness: {$spotifyStore.trackFeatures.acousticness}</p>
		<p>Danceability: {$spotifyStore.trackFeatures.danceability}</p>
	</div>
{/if}
