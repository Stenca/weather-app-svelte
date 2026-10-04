<script lang="ts">
	import { onMount } from 'svelte';
	import CurrentCard from '$lib/components/CurrentCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { Units } from '$lib/models/settings';
	import type { City, Weather } from '$lib/models/weather';
	import { SettingsService } from '$lib/services/settingsService';
	import { StorageService } from '$lib/services/storageService';
	import { WeatherService } from '$lib/services/weatherService';
	import Forecast from '$lib/components/Forecast.svelte';
	import { fly } from 'svelte/transition';
	import DetailsCard from '$lib/components/DetailsCard.svelte';
	import { cubicOut } from 'svelte/easing';

	const weatherService = new WeatherService();
	const storageService = new StorageService();
	const settingsService = new SettingsService();

	const DEFAULT_CITY: City = {
		id: 0,
		name: 'Paris',
		latitude: 48.8566,
		longitude: 2.3522,
		country: 'France'
	};

	let searchQuery = $state('');
	let settings = $state(settingsService.load());
	let weather = $state<Weather | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let showDetails = $state(false);

	async function loadWeather(city: City) {
		loading = true;
		error = null;
		try {
			weather = await weatherService.getWeather(city);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load';
		} finally {
			loading = false;
		}
	}

	async function handleSearch(query: string) {
		const cities = await weatherService.searchCities(query);
		if (cities.length === 0) {
			error = `No city found for "${query}"`;
			return;
		}
		storageService.saveCity(cities[0]);
		await loadWeather(cities[0]);
	}

	function handleUseLocation() {
		// later
	}

	function handleToggleUnits() {
		const next: Units = settings.units === 'metric' ? 'imperial' : 'metric';
		settings = settingsService.update({ units: next });
	}

	function handleToggleDetails() {
		showDetails = !showDetails;
	}

	onMount(() => {
		const city = storageService.loadCity() ?? DEFAULT_CITY;
		loadWeather(city);
	});
</script>

<div
	class="flex min-h-screen flex-col items-center gap-4 bg-linear-to-br from-gradient-1 via-gradient-2 to-gradient-3 p-8"
>
	<SearchBar bind:query={searchQuery} onSearch={handleSearch} onUseLocation={handleUseLocation} />

	{#if loading}
		<p class="text-text">Loading...</p>
	{:else if error}
		<p class="text-error-border">{error}</p>
	{:else if weather}
		<div class="flex justify-center">
			<div class="flex items-stretch gap-4" style="width: 41rem;">
				<div
					class="flex transition-transform duration-300 ease-out"
					style="transform: translateX({showDetails ? '0' : '10.5rem'})"
				>
					<CurrentCard
						{weather}
						units={settings.units}
						onToggleUnits={handleToggleUnits}
						onToggleDetails={handleToggleDetails}
					/>
				</div>

				{#if showDetails}
					<div in:fly={{ x: 40, duration: 300, easing: cubicOut }} class="flex">
						<DetailsCard {weather} units={settings.units} />
					</div>
				{/if}
			</div>
		</div>

		<Forecast daily={weather.daily} units={settings.units} />
	{/if}
</div>
