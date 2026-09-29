<script lang="ts">
import {MapPin, Search} from "@lucide/svelte"

    let { query = $bindable(""), onSearch, onUseLocation}: {
        query?: string,
        onSearch: (query: string) => void;
        onUseLocation: () => void;
    } = $props()

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault()
        const trimmed = query.trim()
        if (trimmed) onSearch(trimmed)
    }
</script>

<form 
    class="flex items-center gap-2 w-full max-w-md px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border-white/20 shadow-lg" 
    onsubmit={handleSubmit}
>
    <input
    type="search"
    class="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/50"
    placeholder="Search a city..."
    bind:value={query}
    autocomplete="off"
    required
    />

    <button
    type="button"
    class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 active:scale-95 transition"
    onclick={onUseLocation}
    aria-label="Use my location"
    >
        <MapPin size={16}/>
    </button>

    <button
        type="submit"
        class="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 active:scale-95 transition"
        aria-label="Search"
    >
        <Search size={16}/>
    </button>
</form>