<script lang="ts">
	import type { DailyForecast } from '$lib/models/weather';
	import type { Units } from '$lib/models/settings';
	import { formatDayShort } from '$lib/utils/date';
	import { formatTemp } from '$lib/utils/units';
	import WeatherIcon from './WeatherIcon.svelte';

	let {
		daily,
		units
	}: {
		daily: DailyForecast[];
		units: Units;
	} = $props();

	const days = $derived(daily.slice(1, 8));
</script>

<div
	class="grid w-full max-w-md grid-cols-7 rounded-3xl border border-glass-border-strong bg-glass py-4 shadow-lg backdrop-blur-xl"
>
	{#each days as day, i (day.date)}
		{@const high = formatTemp(day.tempMax, units)}
		{@const low = formatTemp(day.tempMin, units)}
		<div class="relative flex flex-col items-center gap-1.5 px-1 py-2 text-center">
			{#if i < days.length - 1}
				<span class="absolute top-[20%] right-0 bottom-[20%] w-px bg-divider"></span>
			{/if}

			<span class="text-sm font-medium text-text-tertiary">
				{formatDayShort(day.date)}
			</span>

			<WeatherIcon code={day.weatherCode} size={20} />

			<span class="text-xs font-semibold text-text tabular-nums">
				<span class="inline-flex items-start">
					<span>{high.value}</span>
					<span class="mt-[0.15em] text-[0.6em] font-normal">{high.unit}</span>
				</span>
			</span>

			<span class="text-xs text-text-muted tabular-nums">
				<span class="inline-flex items-start">
					<span>{low.value}</span>
					<span class="mt-[0.15em] text-[0.6em] font-normal">{low.unit}</span>
				</span>
			</span>
		</div>
	{/each}
</div>
