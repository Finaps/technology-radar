<script>
    import Radar from "$lib/features/radar/Radar.svelte";
    import input_data from "$lib/data/techRadarEntries.json";
    import Footer from "$lib/components/structure/Footer.svelte";
    import Header from "$lib/components/structure/Header.svelte";

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

<div class="radar-layout">
    <Header/>
    <Radar {entries} {config}/>
    <Footer/>
</div>



<style>
    .radar-layout {
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: min(33%,350px) 2fr;
        width: 100vw;
        height: calc(100vh - env(safe-area-inset-bottom));
        overflow: hidden;
    }
</style>


