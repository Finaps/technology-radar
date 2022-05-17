<script lang="ts">
    import {slide} from "svelte/transition";
    import {entrySelected, legendEntryStateStore as entryStore} from './legend.store';
    import {highlightEntry, unHighlightEntry, selectEntry} from "$lib/features/radar/radar.store";

    export let entry;

    let HTMLElement :HTMLElement;

    const entryStateStore = entryStore(entry.id);
    const entrySelectedState = entrySelected(entry.id);

    function handleMouseOver() {
        highlightEntry(entry.id);
    }

    function handleMouseOut() {
        unHighlightEntry();
    }

    entrySelectedState.subscribe( isSelected =>{
        if (isSelected) HTMLElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    })
</script>
<div bind:this={HTMLElement}>
    <div class="px-000"
         style:background-color={($entryStateStore.isHighlighted) ? entry.color : "#fff" }
         style:color={($entryStateStore.isHighlighted) ? "#fff" :"#000"}
         on:mouseover={handleMouseOver}
         on:mouseout={handleMouseOut}
         on:click={() => selectEntry(entry.id) }>
        {entry.id}. {entry.name}
    </div>
    {#if $entryStateStore.isDrawerOpen}
        <div class="p-00" style:background-color="lightgray"
                transition:slide>
            <b>Description:</b>
            <p>{entry.description}</p>
        </div>
    {/if}
</div>

