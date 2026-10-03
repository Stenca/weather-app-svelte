import type { Units } from '$lib/models/settings';

export function celsiusToFahrenheit(c: number): number {
	return (c * 9) / 5 + 32;
}

export function kmhToMph(kmh: number): number {
	return kmh * 0.621371;
}

export function mmToInches(mm: number): number {
	return mm / 25.4;
}

export function formatTemp(celsius: number, units: Units): { value: number; unit: string } {
	return {
		value: Math.round(units === 'metric' ? celsius : celsiusToFahrenheit(celsius)),
		unit: units === 'metric' ? '°C' : '°F'
	};
}
