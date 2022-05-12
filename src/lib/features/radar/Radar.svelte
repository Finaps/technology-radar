<script>
    import RadarVisualization from "$lib/features/radar/RadarVisualization.svelte";
    import RadarLegend from "$lib/features/radar/RadarLegend.svelte";

    export let entries;
    export let config;

    let date = new Date();
</script>

<div class="flex-grow sidebar-l sidebar-w-2 gap-0"
     style="--sidebar-width: 450px; --sidebar-content: 30%">
    <section class="sidebar p-0">
        <RadarLegend {entries} {config} />
    </section>
    <RadarVisualization {entries} {config} />
</div>