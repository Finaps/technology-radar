<script>
    import RadarVisualization from "$lib/features/visualisation/Visualisation.svelte";
    import RadarLegend from "$lib/features/legend/RadarLegend.svelte";

    export let entries;
    export let config;

    let w;

    let date = new Date();
</script>

<svelte:window bind:outerHeight={w}/>

<div class="flex-grow sidebar-l sidebar-w-2 radar-content gap-0"
     style="--sidebar-width: 450px; --sidebar-content: 30%">
    <section class="sidebar p-0">
        <RadarLegend {entries} {config} />
    </section>
    <div>
        <RadarVisualization {entries} {config} />
    </div>

</div>

<style>
    .radar-content{
        grid-row: 2;
        grid-column: 2;
        overflow-y: auto;
    }
</style>