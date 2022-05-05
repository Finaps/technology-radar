<script>
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
    function handleMouseOver(e){
        console.log(e.target.id)
    }
</script>

<div class="masonry p-0" style="--masonry-width: 200px;--masonry-gap: 2px;--masonry-columns: 2;">
    {#each sections as section , i}
        <div class="box mb-0">
        <h3 style="color: {section.color}">{section.label}</h3>
            <div class="masonry" style="--masonry-width: 20px;--masonry-gap: 2px;--masonry-columns: 2;">
            {#each rings as ring, j}
                <div class="box mr-0">
                    <h4 class="px-none">{ring.label}</h4>
                    {#each segmented[i][j] as entry}
                        <p class="radius-00 px-000"
                           id="entry-{entry.id}"
                           on:mouseover={handleMouseOver}>
                            {entry.id}. {entry.name}
                        </p>
                    {/each }
                </div>
            {/each}
            </div>
        </div>
    {/each}
</div>