<script>
	import { onMount } from 'svelte';
	import { getAPIOrFail } from './spotifyAPI';

	onMount(async () => {
		const api = getAPIOrFail();
		const player = await api.getMyCurrentPlaybackState();
		console.log(player);
	});
</script>
