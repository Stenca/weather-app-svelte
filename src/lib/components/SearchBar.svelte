<script lang="ts">
	import { MapPin, Search } from '@lucide/svelte';

	let {
		query = $bindable(''),
		onInput,
		onFocus,
		onSearch,
		onUseLocation
	}: {
		query?: string;
		onInput?: (query: string) => void;
		onFocus?: () => void;
		onSearch: (query: string) => void;
		onUseLocation: () => void;
	} = $props();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const trimmed = query.trim();
		if (trimmed) onSearch(trimmed);
	}
</script>

<form
	class="flex w-full max-w-md items-center gap-2 rounded-full border border-glass-border-strong bg-glass px-4 py-1.5 shadow-lg backdrop-blur-xl"
	onsubmit={handleSubmit}
>
	<input
		type="search"
		class="min-w-0 flex-1 border-none bg-transparent text-sm text-text outline-none placeholder:text-text-faint"
		placeholder="Search a city..."
		bind:value={query}
		oninput={() => onInput?.(query)}
		onfocus={() => onFocus?.()}
		onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && onSearch(query)}
		autocomplete="off"
		required
	/>

	<button
		type="button"
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-overlay-medium text-text transition hover:bg-overlay-strong active:scale-95"
		onclick={onUseLocation}
		aria-label="Use my location"
	>
		<MapPin size={16} />
	</button>

	<button
		type="submit"
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-overlay-medium text-text transition hover:bg-overlay-strong active:scale-95"
		aria-label="Search"
	>
		<Search size={16} />
	</button>
</form>
