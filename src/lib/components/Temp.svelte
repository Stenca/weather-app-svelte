<script lang="ts">
  import type { Units } from "$lib/models/settings";
  import { celsiusToFahrenheit } from "$lib/utils/units";

    let { celsius, units, size = "base" }: {
        celsius: number;
        units: Units;
        size?: "base" | "large";
    } = $props();

    const value = $derived(
        Math.round(units === "metric" ? celsius : celsiusToFahrenheit(celsius))
    );

    const unit = $derived(
        units === "metric" ? "°C" : "°F"
    );
</script>

<span class="inline-flex items-start">
    <span class={size === "large" ? "text-8xl font-light" : "text-base font-medium"}>
        {value}

    </span>
    <span class={size === "large" ? "text-3xl mt-2 ml-1" : "text-xs mt-1 ml-0.5"}>
        {unit}
    </span>
</span>
