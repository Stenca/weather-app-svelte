<script lang="ts">
	import { Compass, Wind, Droplets, Sunrise, Sunset, Sun, Umbrella } from '@lucide/svelte';
	import { formatTime } from '$lib/utils/date';
	import { kmhToMph, mmToInches } from '$lib/utils/units';
	import type { Weather } from '$lib/models/weather';
	import type { Units } from '$lib/models/settings';

	let {
		weather,
		units
	}: {
		weather: Weather;
		units: Units;
	} = $props();

	const current = $derived(weather.current);
	const today = $derived(weather.daily[0]);

	const windValue = $derived(
		Math.round(units === 'metric' ? current.windSpeed : kmhToMph(current.windSpeed))
	);
	const windUnit = $derived(units === 'metric' ? 'km/h' : 'mph');

	const precipValue = $derived(
		units === 'metric'
			? current.precipitation.toFixed(1)
			: mmToInches(current.precipitation).toFixed(2)
	);
	const precipUnit = $derived(units === 'metric' ? 'mm' : 'in');

	const rows = $derived([
		{
			icon: Compass,
			label: 'Wind dir.',
			value: `${current.windDirection}°`
		},
		{
			icon: Wind,
			label: 'Wind speed',
			value: `${windValue} ${windUnit}`
		},
		{
			icon: Droplets,
			label: 'Precip.',
			value: `${precipValue} ${precipUnit}`
		},
		...(today
			? [
					{
						icon: Sun,
						label: 'UV index',
						value: `${today.uvIndexMax}`
					},
					{
						icon: Umbrella,
						label: 'Rain',
						value: `${today.precipitationProbability}%`
					},
					{
						icon: Sunrise,
						label: 'Sunrise',
						value: formatTime(today.sunrise)
					},
					{
						icon: Sunset,
						label: 'Sunset',
						value: formatTime(today.sunset)
					}
				]
			: [])
	]);
</script>

<div
	class="flex w-80 shrink-0 flex-col rounded-3xl border border-glass-border-strong bg-glass p-8 shadow-lg backdrop-blur-xl"
>
	<div class="flex flex-1 flex-col justify-between">
		{#each rows as row}
			{@const Icon = row.icon}
			<div class="grid grid-cols-[1.25rem_1fr_auto] items-center gap-3">
				<Icon class="h-4 w-4 shrink-0 text-text-tertiary" />
				<span class="text-sm whitespace-nowrap text-text-tertiary">{row.label}</span>
				<span class="text-right text-sm font-semibold text-text">{row.value}</span>
			</div>
		{/each}
	</div>
</div>
