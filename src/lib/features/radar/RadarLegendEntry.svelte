<script lang="ts">
    import {highlightStore} from "./radar.store";

    export let entry;

    function handleMouseOver(){
        highlightStore.highlight(entry.id, entry.color);
    }
    function handleMouseOut(){
        highlightStore.unHighlight(entry.id, entry.color);
    }
</script>

{#if $highlightStore.highlighted && $highlightStore.entry === entry.id}
    <p class="radius-00 px-000"
       style="background-color: {entry.color}; color: white"
       on:mouseout={handleMouseOut}
       on:blur={handleMouseOut}
       on:mouseout={handleMouseOut}
       on:blur={handleMouseOut}
    >
        {entry.id}. {entry.name}
    </p>
{:else}
    <p class="radius-00 px-000"
       on:mouseover={handleMouseOver}
       on:focus={handleMouseOver}
       on:mouseout={handleMouseOut}
       on:blur={handleMouseOut}
    >
        {entry.id}. {entry.name}
    </p>
{/if}
