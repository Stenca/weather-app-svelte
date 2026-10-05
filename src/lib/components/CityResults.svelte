<script lang="ts">
	import type { City } from '$lib/models/weather';

	let {
		cities,
		onSelect
	}: {
		cities: City[];
		onSelect: (city: City) => void;
	} = $props();
</script>

{#if cities.length > 0}
	<ul
		class="bg-class w-full overflow-hidden rounded-2xl border border-glass-border-strong shadow-lg backdrop-blur-xl"
	>
		{#each cities as city (city.id)}
			<li>
				<button
					type="button"
					class="flex w-full flex-col items-start px-4 py-3 text-left transition hover:bg-white/5"
					onclick={() => onSelect(city)}
				>
					<span class="text-base font-semibold text-text">{city.name}</span>
					<span>{city.admin1 ? `${city.admin1},` : ''}{city.country}</span>
				</button>
			</li>
		{/each}
	</ul>
{/if}
