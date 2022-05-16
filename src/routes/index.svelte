<script>
    import Radar from "$lib/features/radar/Radar.svelte";
    import input_data from "$lib/data/techRadarEntriesMock.json";

    let date = new Date();

    const config = input_data.config;

    const entries = input_data.entries.map((data, index) => {
        const slice = config.sections.find(sec => sec.name === data.section).index;
        const ring = config.rings.find(ring => ring.name === data.status).index;

        data.slice = slice;
        data.ring = ring;
        data.id = index + 1;
        return data;
    });

</script>

<svelte:head>
    <title>Finaps Technology Radar</title>
</svelte:head>

<div class="radar-layout">
    <h1 class="radar-header p-0">Finaps Technology Radar {date.getFullYear()}</h1>
    <Radar {entries} {config}/>
</div>

<style>
    .radar-layout {
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: auto 1fr auto;
        width: 100vw;
        height: calc(100vh - env(safe-area-inset-bottom));
        overflow: hidden;
    }

    .radar-header{
        grid-row: 1;
        grid-column: 1 / -1;
        border-bottom: 1px solid lightgray;
    }
</style>


