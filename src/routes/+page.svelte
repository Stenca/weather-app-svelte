<script lang="ts">
	import { onMount } from 'svelte';
	import CurrentCard from '$lib/components/CurrentCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { Units } from '$lib/models/settings';
	import type { City, Weather } from '$lib/models/weather';
	import { SettingsService } from '$lib/services/settingsService';
	import { StorageService } from '$lib/services/storageService';
	import { WeatherService } from '$lib/services/weatherService';
	import { GeolocationService } from '$lib/services/geolocationService';
	import CityResults from '$lib/components/CityResults.svelte';
	import Forecast from '$lib/components/Forecast.svelte';
	import { fly } from 'svelte/transition';
	import DetailsCard from '$lib/components/DetailsCard.svelte';
	import { cubicOut } from 'svelte/easing';
	import { clickOutside } from '$lib/actions/clickOutside';
	import { escapeKey } from '$lib/actions/escapeKey';
	import { getErrorMessage } from '$lib/utils/errors';

	const weatherService = new WeatherService();
	const storageService = new StorageService();
	const settingsService = new SettingsService();
	const geolocationService = new GeolocationService();

	const DEFAULT_CITY: City = {
		id: 0,
		name: 'Paris',
		latitude: 48.8566,
		longitude: 2.3522,
		country: 'France'
	};

	let searchQuery = $state('');
	let searchResults = $state<City[]>([]);
	let showResults = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout> | undefined;
	let settings = $state(settingsService.load());
	let weather = $state<Weather | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);
	let showDetails = $state(false);

	function dismissResults() {
		showResults = false;
	}

	async function loadWeather(city: City) {
		loading = true;
		error = null;
		try {
			weather = await weatherService.getWeather(city);
		} catch (err) {
			error = getErrorMessage(err);
		} finally {
			loading = false;
		}
	}

	function handleSearchInput(query: string) {
		searchQuery = query;
		clearTimeout(searchTimeout);
		showResults = true;

		if (query.trim().length < 2) {
			searchResults = [];
			return;
		}
		searchTimeout = setTimeout(async () => {
			try {
				searchResults = await weatherService.searchCities(query);
			} catch {
				searchResults = [];
			}
		}, 300);
	}

	function handleSearchFocus() {
		if (searchResults.length > 0) showResults = true;
	}

	async function handleSelectCity(city: City) {
		showResults = false;
		searchResults = [];
		searchQuery = '';
		storageService.saveCity(city);
		await loadWeather(city);
	}

	async function handleSearch(query: string) {
		const cities = await weatherService.searchCities(query);
		if (cities.length === 0) {
			error = `No city found for "${query}"`;
			return;
		}
		storageService.saveCity(cities[0]);
		await handleSelectCity(cities[0]);
	}

	async function handleUseLocation() {
		error = null;
		try {
			const coords = await geolocationService.getCurrentPosition();
			const city = await weatherService.reverseGeocode(coords.latitude, coords.longitude);
			if (!city) {
				error = 'Could not determine your location';
				return;
			}
			storageService.saveCity(city);
			await loadWeather(city);
		} catch (err) {
			error = getErrorMessage(err);
		}
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
	<div
		class="relative w-full max-w-md"
		use:clickOutside={dismissResults}
		use:escapeKey={dismissResults}
	>
		<SearchBar
			bind:query={searchQuery}
			onInput={handleSearchInput}
			onFocus={handleSearchFocus}
			onSearch={handleSearch}
			onUseLocation={handleUseLocation}
		/>
		{#if showResults && searchResults.length > 0}
			<div
				class="absolute top-full right-0 left-0 z-10 mt-2"
				in:fly={{ y: -8, duration: 200, easing: cubicOut }}
				out:fly={{ y: -8, duration: 150, easing: cubicOut }}
			>
				<CityResults cities={searchResults} onSelect={handleSelectCity} />
			</div>
		{/if}
	</div>
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
					<div in:fly={{ x: 40, duration: 500, easing: cubicOut }} class="flex">
						<DetailsCard {weather} units={settings.units} />
					</div>
				{/if}
			</div>
		</div>

		<Forecast daily={weather.daily} units={settings.units} />
	{/if}
</div>
