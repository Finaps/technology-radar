<script>
    import Radar from "$lib/features/radar/Radar.svelte";
    import input_data from "$lib/data/techRadarEntries.json";

    let date = new Date();

    const config = {
        sections: [
            {
                name: "LANGUAGES_AND_FRAMEWORKS",
                label: "Languages & Frameworks",
                index: 0,
                color: "#fea000"

            },
            {
                name: "PLATFORMS",
                label: "Platforms",
                index: 1,
                color: "#191970"
            },
            {
                name: "INFRASTRUCTURE",
                label: "Infrastructure",
                index: 2,
                color: "#A98FEF"
            },
            {
                name: "TOOLS",
                label: "Tools",
                index: 3,
                color: "#000"

            },
            {
                name: "DATASTORES_DATAMANAGEMENT",
                label: "Datastore & Data Management",
                index: 4,
                color: "#01bfad"
            }
        ],
        rings: [
            {
                index: 0,
                name: "ADOPT",
                label: "Adopt",
                radius: 80
            },
            {
                index: 1,
                name: "TRAIL",
                label: "Trail",
                radius: 170
            },
            {
                index: 2,
                name: "ASSESS",
                label: "Assess",
                radius: 260
            },
            {
                index: 3,
                name: "HOLD",
                label: "Hold",
                radius: 350
            }
        ]
    };

    // pre-process input_data
    // TODO Change this back to input file
    // const input_data = [
    //     {
    //         "name": "Xamarin",
    //         "section": "METHODS",
    //         "status": "HOLD"
    //     },
    //     {
    //         "name": "Test4",
    //         "section": "METHODS",
    //         "status": "TRAIL"
    //     },
    //     {
    //         "name": "Xamarin",
    //         "section": "METHODS",
    //         "status": "HOLD"
    //     },
    //     {
    //         "name": "Test4",
    //         "section": "METHODS",
    //         "status": "ASSESS"
    //     },
    // ];
    const entries = input_data.map((data, index) => {
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


<h1 class="p-0">Finaps Tech Radar {date.getFullYear()}</h1>

<Radar {entries} {config}/>





