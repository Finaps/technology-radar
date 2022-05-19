<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import {select} from 'd3-selection'
    import {pie, arc} from 'd3-shape';
    import {bounded_ring, random_between, normal_between} from "../../helpers/bounding";
    import {sort, map, ticks, range} from "d3-array";
    import {cartesian, polar} from "$lib/helpers/geometry";
    import {forceSimulation, forceCollide} from 'd3-force';
    import {highlightEntry, unHighlightEntry, selectEntry} from "$lib/features/radar/radar.store";
    import {blipActionStore} from "./visualisation.store";

    let vis: HTMLElement; // binding with div for visualization

    export let entries;

    export let config;

    // ViewBox dimensions
    let offsetWidth
    let offsetHeight


    const viewBoxSize = 800;

    const rings = config.rings;
    const sections = config.sections;

    const circleRadius = ringRadii(80,viewBoxSize / 2, rings.length);

    // Radar sections

    const shape = arc()
        .innerRadius(0)
        .outerRadius(viewBoxSize / 2 - 1)
        .startAngle(function (d) {
            return d.startAngle + Math.PI / 2
        })
        .endAngle(function (d) {
            return d.endAngle + Math.PI / 2
        });

    const arcs = pie().padAngle(0).value(_ => 1)(sections.sort(function (a, b) {
        return a.index - b.index
    }));
    const blips = map<any, any>(entries, entry => {
        entry.segment = segment(entry.slice, entry.ring)
        const point = entry.segment.random();

        entry.x = point.x;
        entry.y = point.y;
        entry.color = sections[entry.slice].color;
        return entry;
    });

    $: $blipActionStore, blipAction();

    function blipAction() {
        if ($blipActionStore.entryIndex > -1) {
            const entry = entries[$blipActionStore.entryIndex];
            const color = entry.color;

            const blip = select(vis).select("#blip-" + entry.id);
            const circle = blip.select("circle");
            const text = blip.select("text");

            if ($blipActionStore.entryHighlight) {
                circle.attr("stroke", color)
                circle.attr("fill", "#fff")

                text.attr("fill", color)
            } else {
                circle.attr("stroke", null)
                circle.attr("fill", color)

                text.attr("fill", "#fff")
            }
        }
    }

    function ringRadii(offset= 0, endRadius, numberOfRings) {
        let arr;
        let d;

        if (numberOfRings === 0) {
            return [];
        }
        // Set the first value:
        if (numberOfRings === 1) {
            return [endRadius];
        }
        arr = [];
        // Calculate the increment:

        d = (endRadius - offset)  / numberOfRings;

        // Generate linearly spaced values:
        for (let i = 1; i <= numberOfRings; i++) {
            arr.push( Math.round(offset + (d * i)));
        }
        arr.push[endRadius-1];
        // Check whether to include the `stop` value in the output array:
        return arr;
    }

    function segment(section, ring) {

        const polar_min = {
            t: (arcs[section].startAngle),
            r: ring === 0 ? 30 : (circleRadius[ring-1] + 15)
        };
        const polar_max = {
            t: (arcs[section].endAngle),
            r: circleRadius[ring] - 15
        };
        return {
            clipx: function (d) {
                const polar_coor = polar(d);
                const p = bounded_ring(polar_coor, polar_min, polar_max);
                d.x = cartesian(p).x;
                return d.x;
            },
            clipy: function (d) {
                const polar_coor = polar(d);
                const p = bounded_ring(polar_coor, polar_min, polar_max)
                d.y = cartesian(p).y;
                return d.y;
            },
            random: function () {
                const coordinates = cartesian({
                    t: random_between(polar_min.t, polar_max.t),
                    r: normal_between(polar_min.r, polar_max.r)
                });
                return coordinates;
            }
        }
    }

    function translate(x, y) {
        return "translate(" + x + "," + y + ")";
    }

    // Prepare Entries for processing

    onMount(() => {
        draw();
        window.addEventListener('resize', () => draw());
    })

    function draw(): void {
        // create svg and create a group inside that is moved by means of margin

        const svgWidth = Math.min(offsetWidth, offsetHeight);
        // Generate arcs for correct grid plotting using d3-shapes


        const svg = select(vis)
            .html(null)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgWidth)
            .attr("viewBox", [-viewBoxSize / 2, -viewBoxSize / 2, viewBoxSize, viewBoxSize])
            .attr("class", "radar-visualisation");


        // create Radar
        const radar = svg.append("g")

        // Draw grid
        const grid = radar.append("g")
        grid.append("g")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", "#fff")
            .attr("d", shape);


        // Draw Circles


        for (let i = 0; i < circleRadius.length; i++) {
            grid.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", circleRadius[i])
                .style("fill", "none")
                .style('stroke', '#000');
            grid.append("text")
                .text(rings[i].label)
                .attr("y", -circleRadius[i]+69)
                .attr("text-anchor", "middle")
                .style("fill", "#e5e5e5")
                .style("font-family", "Arial, Helvetica")
                .style("font-size", "3rem")
                .style("font-weight", "bold")
                .style("pointer-events", "none")
                .style("user-select", "none");
        }

        // Draw Blips
        const rink = radar.attr("id","rink")
        const blip_elements = rink.selectAll(".blip")
            .data(blips)
            .enter()
                .append("g")
                    .attr("id", function (d) {return "blip-" + d.id })
                    .attr("class", "blip")
                    .attr("transform", function (b){
                        return translate(b.x,b.y);
                    })
                    .on("mouseover", function (event, d) {
                        highlightEntry(d.id);
                    })
                    .on("mouseout", function () {
                        unHighlightEntry();
                    })
                    .on("click", function (event,d) {
                        selectEntry(d.id)
                    });

        blip_elements.each( function (d) {
            let blip = select(this);
            blip.append("circle")
                .attr("r", 12)
                .attr("fill", d.color)
            blip.append("text")
                .text(d.id)
                .attr("y", 4)
                .attr("fill", "#fff")
                .attr("text-anchor", "middle")
                .style("font-size", "0.75rem")

        });

        // make sure that blips stay inside their segment
        function ticked() {
            blip_elements.attr("transform", function(d) {
                return translate(d.segment.clipx(d), d.segment.clipy(d));
            })
        }

        // distribute blips, while avoiding collisions
        forceSimulation()
            .nodes(blips)
            .velocityDecay(0.19) // magic number (found by experimentation)
            .force("collision", forceCollide().radius(12).strength(0.55).iterations(1))
            .on("tick", ticked);
    }
</script>


<div bind:offsetHeight={offsetHeight} bind:offsetWidth={offsetWidth} class="radar-visualisation-wrapper">
    <div class="radar-visualisation-wrapper" bind:this={vis}/>
</div>

<style>
    .radar-visualisation-wrapper {
        display: flex;
        height: 100%;
        width: 100%;
    }
</style>