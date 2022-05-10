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


<h1 class="p-0">Finaps Technology Radar {date.getFullYear()}</h1>

<Radar {entries} {config}/>





