<script lang="ts">
	import { parse } from 'postcss';
	import { onMount } from 'svelte';
	import { getAPI, getAPIOrFail } from './spotifyAPI';
	import type { _Track } from './types';

	let totalDuration: number | null = 0;
	let elapsedDuration: number | null = 0;
	let isPlaying: boolean | null = false;
	let timeLastRetrieved = new Date().getTime();
	let nowPlaying: _Track | null = null;

	async function updatePlayerStatus() {
		const api = getAPIOrFail();
		const audioPlayer = await api.getMyCurrentPlaybackState();
		console.log(audioPlayer);
		elapsedDuration = audioPlayer.body['progress_ms'];
		let item = audioPlayer.body['item'];
		if (item !== null) {
			totalDuration = item['duration_ms'];
		}
		isPlaying = audioPlayer.body['is_playing'];
		timeLastRetrieved = new Date().getTime();
		nowPlaying = item as any;
	}

	function play() {
		const api = getAPIOrFail();
		api.play();
	}

	function pause() {
		const api = getAPIOrFail();
		api.pause();
	}

	function parseDuration(durationInMs: number): string {
		// Convert the duration from milliseconds to seconds
		var durationInSeconds = Math.round(durationInMs / 1000);

		// Calculate the number of hours, minutes, and seconds from the duration
		let hours = Math.floor(durationInSeconds / 3600);
		let minutes = Math.floor((durationInSeconds % 3600) / 60);
		let seconds = durationInSeconds % 60;
		return `${hours ? hours + ':' : ''}${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	onMount(async () => {
		updatePlayerStatus();
		setInterval(() => {
			if (elapsedDuration && isPlaying) {
				elapsedDuration += 500;
			}
			if (timeLastRetrieved + 5000 <= new Date().getTime()) updatePlayerStatus();
		}, 500);
	});
</script>

<div class="border-2 border-solid border-h11yred items-center flex flex-col p-2 m-3">
	{#if nowPlaying}
		<div class="items-start w-full mb-2">
			<p>{nowPlaying.name}</p>
			<p class="text-xs">{nowPlaying.artists[0].name}</p>
		</div>
	{/if}

	{#if elapsedDuration && totalDuration}
		<div class="flex flex-row h-3 w-full border-solid border-2 border-black">
			<div
				class="bg-blue-500 h-full"
				style="min-width: {(elapsedDuration / totalDuration) * 100}%;"
			/>
		</div>
		<div class="flex flex-row justify-between w-full">
			<p>{parseDuration(elapsedDuration)}</p>
			<p>{parseDuration(totalDuration)}</p>
		</div>
	{/if}

	{#if isPlaying}
		<button on:click={pause}>Pause</button>
	{:else}
		<button on:click={play}>Play</button>
	{/if}
</div>
