<script lang="ts">
import SearchBar from "$lib/components/SearchBar.svelte";

let searchQuery = $state("")

function handleSearch(query: string) {

}

function handleUseLocation() {

}

</script>

<div class="min-h-screen flex flex-col items-center gap-4 p-8">
    <SearchBar
        bind:query={searchQuery}
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
    />
</div>
