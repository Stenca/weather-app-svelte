# Weather App (Svelte)

A weather application built with SvelteKit, TypeScript, and Tailwind CSS.
Fetches live weather data from Open-Meteo.

**🔗 Live demo:** https://stenca.github.io/weather-app-svelte/

> A vanilla TypeScript version of the same app lives at
> [stenca/weather-app](https://github.com/Stenca/weather-app) — same
> features, different architecture.

## Features

### Search
- Search any city by name
- Live results dropdown while typing (debounced)
- Pick from multiple matches (Paris, TX vs Paris, FR)
- Geolocation button — use your current position

### Current weather
- Weather icon (Lucide Svelte)
- Temperature with split number/unit styling
- Feels like, humidity, wind, cloud cover
- Day and date
- Condition label

### Details panel
- Expand the current card to open a side panel
- Wind direction, wind speed, precipitation
- Sunrise, sunset, UV index, rain chance
- Toggle open and closed with a click

### Forecast
- 7-day forecast starting tomorrow
- Weather icon, high, and low for each day
- Dividers between days

### Polish
- Unit toggle (°C / °F)
- Glass UI with Tailwind + custom theme tokens
- Animation on card toggle (fly transition)
- Error handling with clear messages
- Remember last searched city
- Default city on first visit

## Tech Stack

- **SvelteKit** - app framework
- **Svelte 5** - runes mode (`$state`, `$derived`, `$props`)
- **TypeScript** - strict types
- **Tailwind CSS** - styling
- **Lucide Svelte** - SVG icons
- **Open-Meteo** - weather and geocoding APIs
- **localStorage** - persistence

## Architecture

```
src/
├── lib/
│   ├── actions/           Svelte actions
│   │   ├── clickOutside.ts
│   │   └── escapeKey.ts
│   ├── components/        Svelte components
│   │   ├── CurrentCard.svelte
│   │   ├── DetailsCard.svelte
│   │   ├── Forecast.svelte
│   │   ├── SearchBar.svelte
│   │   ├── CityResults.svelte
│   │   └── WeatherIcon.svelte
│   ├── models/            Type definitions
│   │   ├── weather.ts     City, Weather, CurrentWeather, DailyForecast
│   │   └── settings.ts    Settings, Units
│   ├── services/          Business logic + external APIs
│   │   ├── weatherService.ts
│   │   ├── storageService.ts
│   │   ├── settingsService.ts
│   │   └── geolocationService.ts
│   └── utils/             Pure helpers
│       ├── date.ts        formatDay, formatDate, formatTime, formatDayShort
│       ├── units.ts       celsiusToFahrenheit, kmhToMph, mmToInches, formatTemp
│       ├── weatherCodes.ts WMO code → label
│       └── errors.ts      getErrorMessage
└── routes/
    ├── +layout.ts         prerender + ssr config
    └── +page.svelte       main screen
```

**Design principles:**

- State lives in `+page.svelte` — a small set of `$state` variables
- Components are presentational — they take props, render markup
- Services own data — no DOM code in services
- Shared types live in `lib/models/`

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
git clone https://github.com/Stenca/weather-app-svelte.git
cd weather-app-svelte
npm install
```

### Develop

```bash
npm run dev
```

Opens at `http://localhost:5173/`.

### Build

```bash
npm run build
npm run preview
```

The static site is written to `build/`.

## APIs

### Open-Meteo (no API key)

**Geocoding** — city name → coordinates:

```
https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=5
```

**Forecast** — coordinates → current + daily:

```
https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=...&daily=...
```

## Deployment

Auto-deploys to GitHub Pages on every push to `main` via GitHub Actions
(`.github/workflows/deploy.yml`).

The repo name is part of the deployed URL, so `kit.paths.base` in
`svelte.config.js` must match it — currently `/weather-app-svelte`.
