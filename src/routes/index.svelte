<script>
    import Radar from "$lib/features/radar/Radar.svelte";
    import Legend from "$lib/features/legend/Legend.svelte";

    const input_data = [
        {
            name : "Tet",
            section: "LANGUAGES",
            status : "ADOPT"
        },
        {
            name : "Test2",
            section: "FRAMEWORKS",
            status : "TRAIL"
        },
        {
            name : "Test3",
            section: "INFRASTRUCTURE",
            status : "ASSESS"
        },
        {
            name : "Test3",
            section: "TOOLS",
            status : "HOLD"
        },
        {
            name : "Test3",
            section: "METHODS",
            status : "ASSESS"
        },
        {
            name : "Test4",
            section: "METHODS",
            status : "ASSESS"
        },
        {
            name : "Test3",
            section: "TOOLS",
            status : "ASSESS"
        }
    ];
    const config = {
        sections: [
            {
                name: "LANGUAGES",
                label: "Languages & Frameworks",
                index: 0,
                color: "#fea000"

            },
            {
                name: "FRAMEWORKS",
                label: "Frameworks",
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
                name: "METHODS",
                label: "Methods",
                index: 4,
                color: "#01bfad"
            }
        ],
        rings: [
            {
                index: 0,
                name: "ADOPT",
                label: "Adopt",
                radius: 130
            },
            {
                index: 1,
                name: "TRAIL",
                label: "Trail",
                radius: 220
            },
            {
                index: 2,
                name: "ASSESS",
                label: "Assess",
                radius: 310
            },
            {
                index: 3,
                name: "HOLD",
                label: "Hold",
                radius: 400
            }
        ]
    };

    // pre-process input_data

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

<h1>Finaps Tech Radar 0.9</h1>

<section class="sidebar">
    <Radar {entries} {config} />
</section>


<Legend {entries} {config} />
