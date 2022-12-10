<script>
	import spotifyStore from '$lib/spotifyStore';
</script>

<div class="rounded-md bg-black text-h11ywhite p-3 flex flex-row items-center">
	<p>logged in to Spotify as <span class="text-h11ypeach">{$spotifyStore.username}</span></p>
	<a href="/logout" class="border-h11ywhite border-2 border-solid ml-5 p-2">Logout</a>
</div>
