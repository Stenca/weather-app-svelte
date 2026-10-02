<script lang="ts">
	import type { Weather } from '$lib/models/weather';
	import type { Units } from '$lib/models/settings';
	import { formatDate, formatDay } from '$lib/utils/date';
	import { kmhToMph } from '$lib/utils/units';
	import { describeWeather } from '$lib/utils/weatherCodes';
	import Temp from './Temp.svelte';
	import WeatherIcon from './WeatherIcon.svelte';

	let {
		weather,
		units,
		onToggleUnits,
		onToggleDetails
	}: {
		weather: Weather;
		units: Units;
		onToggleUnits: () => void;
		onToggleDetails: () => void;
	} = $props();

	const wind = $derived(
		Math.round(units === 'metric' ? weather.current.windSpeed : kmhToMph(weather.current.windSpeed))
	);

	const windUnit = $derived(units === 'metric' ? 'km/h' : 'mph');
</script>

<div class="relative w-80">
	<button
		type="button"
		class="flex w-full cursor-pointer flex-col items-center rounded-3xl border border-glass-border-strong bg-glass p-8 text-center text-text shadow-lg backdrop-blur-xl"
		onclick={onToggleDetails}
	>
		<WeatherIcon code={weather.current.weatherCode} size={112} />

		<div class="mt-1 text-lg font-medium tracking-wider text-text-secondary uppercase">
			{weather.city.name}{weather.city.country ? `, ${weather.city.country}` : ''}
		</div>

		<div class="mt-2">
			<Temp celsius={weather.current.temperature} {units} size="large" />
		</div>

		<div class="mt-2 text-sm font-medium text-text-secondary">
			{formatDay(weather.current.time)}
		</div>
		<div class="mb-3 text-xs text-text-muted">
			{formatDate(weather.current.time)}
		</div>
		<div class="mb-6 text-base text-text-secondary">
			{describeWeather(weather.current.weatherCode)}
		</div>

		<div class="grid w-full grid-cols-2 gap-3 border-t border-divider pt-6">
			<div class="flex flex-col items-center gap-1">
				<span class="text-xs tracking-wider text-text-muted uppercase">Feels like</span>
				<span class="text-base font-medium text-text">
					<Temp celsius={weather.current.apparentTemperature} {units} />
				</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<span class="text-xs tracking-wider text-text-muted uppercase">Humidity</span>
				<span class="text-base font-medium text-text">{weather.current.humidity}%</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<span class="text-xs tracking-wider text-text-muted uppercase">Wind</span>
				<span class="text-base font-medium text-text">{wind} {windUnit}</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<span class="text-xs tracking-wider text-text-muted uppercase">Clouds</span>
				<span class="text-base font-medium text-text">{weather.current.cloudCover}%</span>
			</div>
		</div>
	</button>

	<button
		type="button"
		class="absolute top-3 right-3 rounded-full border border-glass-border-hover bg-overlay-light px-2.5 py-1 text-xs font-semibold text-text-secondary transition hover:bg-glass-border-hover hover:text-text"
		onclick={onToggleUnits}
		aria-label="Toggle units"
	>
		{units === 'metric' ? '°C' : '°F'}
	</button>
</div>
