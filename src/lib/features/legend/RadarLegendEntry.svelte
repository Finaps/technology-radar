<script lang="ts">
    import {slide} from "svelte/transition";
    import {createLegendEntryStateStore} from './legend.store';
    import {highlightEntry, unHighlightEntry, selectEntry} from "$lib/features/radar/radar.store";

    export let entry;

    const legendEntryStateStore = createLegendEntryStateStore(entry);

    function handleMouseOver() {
        highlightEntry(entry.id);
    }

    function handleMouseOut() {
        unHighlightEntry();
    }


</script>
<div    id="legendEntry-{entry.id}"
        class="radius-00">
    <div class="px-000 radius-00"
         style="background-color: {$legendEntryStateStore.headerBackgroundColor}; color: {$legendEntryStateStore.headerTextColor}"
         on:mouseover={handleMouseOver}
         on:mouseout={handleMouseOut}
         on:click={() => selectEntry(entry.id) }>
        {entry.id}. {entry.name}
    </div>
    {#if $legendEntryStateStore.expanded}
        <div    style="background-color: lightgray"
                transition:slide>{entry.description}</div>
    {/if}
</div>


