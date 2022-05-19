<script lang="ts">
    import RadarVisualization from "$lib/features/visualisation/Visualisation.svelte";
    import RadarLegend from "$lib/features/legend/RadarLegend.svelte";

    export let entries;
    export let config;
</script>

<div class="radar-legend-view">
    <RadarLegend {entries} {config}/>
</div>
<div class="px-0 py-2 radar-visualisation-view">
    <RadarVisualization {entries} {config}/>
</div>



<style>
    .radar-legend-view {
        grid-row: 2;
        grid-column: 1;
        overflow-y: auto;
        border-right: 1px solid lightgray;
    }

    .radar-visualisation-view {
        grid-row: 2;
        grid-column: 2;
        overflow-y: auto;
    }
</style>