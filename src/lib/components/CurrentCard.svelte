<script lang="ts">
  import type { Weather } from "$lib/models/weather";
  import type { Units } from "$lib/models/settings";
  import { formatDate, formatDay } from "$lib/utils/date";
  import { kmhToMph } from "$lib/utils/units";
  import { describeWeather } from "$lib/utils/weatherCodes";
  import Temp from "./Temp.svelte";
  import WeatherIcon from "./WeatherIcon.svelte";

  let {
    weather,
    units,
    onToggleUnits,
    onToggleDetails,
  }: {
    weather: Weather;
    units: Units;
    onToggleUnits: () => void;
    onToggleDetails: () => void;
  } = $props();

  const wind = $derived(
    Math.round(
      units === "metric"
        ? weather.current.windSpeed
        : kmhToMph(weather.current.windSpeed)
    )
  );

  const windUnit = $derived(units === "metric" ? "km/h" : "mph");
</script>

<div class="relative w-80">
  <button
    type="button"
    class="w-full flex flex-col items-center text-center text-white p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg cursor-pointer"
    onclick={onToggleDetails}
  >
    <WeatherIcon code={weather.current.weatherCode} size={112} />

    <div class="text-lg font-medium uppercase tracking-wider opacity-90 mt-1">
      {weather.city.name}{weather.city.country ? `, ${weather.city.country}` : ""}
    </div>

    <div class="mt-2">
      <Temp celsius={weather.current.temperature} units={units} size="large" />
    </div>

    <div class="text-sm font-medium opacity-85 mt-2">
      {formatDay(weather.current.time)}
    </div>
    <div class="text-xs opacity-60 mb-3">
      {formatDate(weather.current.time)}
    </div>
    <div class="text-base opacity-85 mb-6">
      {describeWeather(weather.current.weatherCode)}
    </div>

    <div class="grid grid-cols-2 gap-3 w-full pt-6 border-t border-white/15">
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs uppercase tracking-wider opacity-60">Feels like</span>
        <span class="text-base font-medium">
          <Temp celsius={weather.current.apparentTemperature} units={units} />
        </span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs uppercase tracking-wider opacity-60">Humidity</span>
        <span class="text-base font-medium">{weather.current.humidity}%</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs uppercase tracking-wider opacity-60">Wind</span>
        <span class="text-base font-medium">{wind} {windUnit}</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs uppercase tracking-wider opacity-60">Clouds</span>
        <span class="text-base font-medium">{weather.current.cloudCover}%</span>
      </div>
    </div>
  </button>

  <button
    type="button"
    class="absolute top-3 right-3 px-2.5 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-semibold hover:bg-white/20 transition"
    onclick={onToggleUnits}
    aria-label="Toggle units"
  >
    {units === "metric" ? "°C" : "°F"}
  </button>
</div>