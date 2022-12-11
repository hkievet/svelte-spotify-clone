<script lang="ts">
	import type { FeatureCollection, TrackFeatures } from './types';

	export let features: FeatureCollection;
</script>

<div class="flex flex-row h-8 mr-5 content-end">
	<div>
		<div class="w-3" style="min-height: {100 - features.acousticness * 100}%;" />
		<div class="acoustic w-3" style="min-height: {features.acousticness * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.danceability * 100}%;" />
		<div class="danceability w-3" style="min-height: {features.danceability * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.speechiness * 100}%;" />
		<div class="speechiness w-3" style="min-height: {features.speechiness * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.energy * 100}%;" />
		<div class="energy w-3" style="min-height: {features.energy * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.instrumentalness * 100}%;" />
		<div class="instrumentalness w-3" style="min-height: {features.instrumentalness * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.liveness * 100}%;" />
		<div class="liveness w-3" style="min-height: {features.liveness * 100}%;" />
	</div>
	<div>
		<div class="w-3" style="min-height: {100 - features.valence * 100}%;" />
		<div class="valence w-3" style="min-height: {features.valence * 100}%;" />
	</div>
</div>

<style lang="postcss">
	.acoustic {
		@apply bg-red-500;
	}
	.danceability {
		@apply bg-orange-500;
	}
	.speechiness {
		@apply bg-yellow-500;
	}
	.energy {
		@apply bg-green-500;
	}
	.instrumentalness {
		@apply bg-blue-500;
	}
	.liveness {
		@apply bg-indigo-500;
	}
	.valence {
		@apply bg-violet-500;
	}
</style>
