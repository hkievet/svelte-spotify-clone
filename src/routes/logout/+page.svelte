<script>
	import { resetLocalStorage } from '$lib/persistence';
	import { onMount } from 'svelte';

	onMount(() => {
		resetLocalStorage();
		window.location.href = '/';
	});
</script>

<p>Logging out...</p>
