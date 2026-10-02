import type { Settings } from '$lib/models/settings';

export class SettingsService {
	private key = 'weather:settings';

	DEFAULTS: Settings = {
		units: 'metric',
		theme: 'dark'
	};

	load(): Settings {
		if (typeof localStorage === 'undefined') return { ...this.DEFAULTS };
		const saved = localStorage.getItem(this.key);
		if (!saved) return { ...this.DEFAULTS };

		try {
			return { ...this.DEFAULTS, ...JSON.parse(saved) };
		} catch {
			return { ...this.DEFAULTS };
		}
	}

	save(settings: Settings): void {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(this.key, JSON.stringify(settings));
	}

	update(patch: Partial<Settings>): Settings {
		const next = { ...this.load(), ...patch };
		this.save(next);
		return next;
	}
}
