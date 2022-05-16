<script>
    import {slide} from "svelte/transition";
    import {createLegendEntryStateStore} from './legend.store';
    import {highlightEntry, unHighlightEntry, selectEntry} from "$lib/features/radar/radar.store";

    export let entry;
    let expanded;
    let HTMLElement;

    let legendEntryStateStore = createLegendEntryStateStore(entry);

    function handleMouseOver() {
        highlightEntry(entry.id);
    }

    function handleMouseOut() {
        unHighlightEntry();
    }

    legendEntryStateStore.subscribe( value => {
        if(value.expanded) HTMLElement.scrollIntoView({
            behavior: 'smooth'
        });
    })

</script>
<div bind:this={HTMLElement} id="legendEntry-{entry.id}">
    <div class="px-000"
         style:background-color={$legendEntryStateStore.headerBackgroundColor}
         style:color={$legendEntryStateStore.headerTextColor}
         on:mouseover={handleMouseOver}
         on:mouseout={handleMouseOut}
         on:click={() => selectEntry(entry.id) }>
        {entry.id}. {entry.name}
    </div>
    {#if $legendEntryStateStore.expanded}
        <div    class="p-00"
                style:background-color="lightgray"
                transition:slide>
            <b>Description:</b>
            <p>{entry.description}</p>
        </div>
    {/if}
</div>
