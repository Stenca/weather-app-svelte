<script lang="ts">
	import {
		Sun,
		CloudSun,
		Cloud,
		CloudRain,
		CloudDrizzle,
		CloudSnow,
		CloudLightning,
		CloudFog
	} from '@lucide/svelte';

	let { code, size = 24 }: { code: number; size?: number } = $props();

	const Icon = $derived(
		code === 0
			? Sun
			: code <= 2
				? CloudSun
				: code === 3
					? Cloud
					: code === 45 || code === 48
						? CloudFog
						: code <= 57
							? CloudDrizzle
							: code <= 67
								? CloudRain
								: code <= 77
									? CloudSnow
									: code <= 82
										? CloudRain
										: code <= 86
											? CloudSnow
											: code >= 95
												? CloudLightning
												: Cloud
	);
</script>

<Icon {size} class="text-text" />
