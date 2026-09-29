<script lang="ts">
  import CurrentCard from "$lib/components/CurrentCard.svelte";
  import SearchBar from "$lib/components/SearchBar.svelte";
  import type { Weather } from "$lib/models/weather";

let searchQuery = $state("")
let units = $state(<"metric" | "imperial">("metric"))

const weather: Weather = {
    city: { id: 1, name: "Paris", country: "France", latitude: 48.85, longitude: 2.35 },
    current: {
      time: new Date(),
      temperature: 18,
      apparentTemperature: 16,
      weatherCode: 3,
      windSpeed: 12,
      windDirection: 220,
      humidity: 72,
      precipitation: 0,
      cloudCover: 80,
      isDay: true,
    },
    daily: [],
  };

function handleSearch(query: string) {

}

function handleUseLocation() {

}

function handleToggleUnits() {

}

function handleToggleDetails() {

}

</script>

<div class="min-h-screen flex flex-col items-center gap-4 p-8 bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
    <SearchBar
        bind:query={searchQuery}
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
    />
    <CurrentCard
        {weather}
        {units}
        onToggleUnits={handleToggleUnits}
        onToggleDetails={handleToggleDetails}
    />
</div>
