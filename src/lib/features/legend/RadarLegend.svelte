<script>
    import RadarLegendEntry from "$lib/features/legend/RadarLegendEntry.svelte";

    export let config;
    export let entries;

    const rings = config.rings;
    const sections = config.sections;


    let segmented = Array(sections.length)
        .fill()
        .map(() => Array(rings.length).fill().map(() => Array(0)));

    entries.forEach((entry) => {
        segmented[entry.slice][entry.ring].push(entry);
    });

</script>

<div>
    {#each sections as section , i}
        <div>
            <h3 class="radar-legend-sticky-header p-000"
                style:color={section.color}>
                {section.label}
            </h3>
            <div class="mb-0">
                {#each rings as ring, j}
                    {#if segmented[i][j].length > 0}
                        <div>
                            <h4 class="px-000">{ring.label}</h4>
                            {#each segmented[i][j] as entry}
                                <RadarLegendEntry {entry}/>
                            {/each   }
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .radar-legend-sticky-header {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: white;
        border-bottom: 1px solid lightgrey;
    }
</style>