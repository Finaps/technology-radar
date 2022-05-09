<script>
    import {highlightStore} from "./radar.store"
    import RadarLegendEntry from "$lib/features/radar/RadarLegendEntry.svelte";
    export let config;
    export let entries;

    const rings = config.rings;
    const sections = config.sections;


    let segmented = Array(sections.length)
        .fill()
        .map(() => Array(rings.length).fill().map(() => Array(0)));

    entries.forEach((entry )=>{
        segmented[entry.slice][entry.ring].push(entry);
    });

</script>

<div class="masonry p-0" style="--masonry-width: 250px;--masonry-gap: 2px;--masonry-columns: 2;">
    {#each sections as section , i}
        <div class="box mb-00">
        <h3 style="color: {section.color}">{section.label}</h3>
            <div class="masonry" style="--masonry-width: 25px;--masonry-gap: 2px;--masonry-columns: 2;">
            {#each rings as ring, j}
                <div class="box mr-0">
                    <h4 class="px-none">{ring.label}</h4>
                    {#each segmented[i][j] as entry}
                        <RadarLegendEntry {entry}/>
                    {/each }
                </div>
            {/each}
            </div>
        </div>
    {/each}
</div>