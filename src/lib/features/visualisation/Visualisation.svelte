<script lang="ts">
    import { onMount } from 'svelte';
    import {select} from 'd3-selection'
    import {pie, arc} from 'd3-shape';
    import {bounded_ring, random_between, normal_between} from "../../helpers/bounding";
    import {sort, map} from "d3-array";
    import {cartesian, polar} from "$lib/helpers/geometry";
    import {forceSimulation, forceCollide} from 'd3-force';
    import {highlightEntry, unHighlightEntry,selectEntry} from "$lib/features/radar/radar.store";
    import {blipActionStore} from "./visualisation.store";

    let vis: HTMLElement; // binding with div for visualization

    export let entries;

    export let config;

    // function convertRemToPixels(rem) {
    //     return rem * parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    // }

    let elementHeight;

    // ViewBox dimensions
    const width = 700;
    const height = 700;

    // const padding = {
    //     top: convertRemToPixels(1),
    //     bottom: convertRemToPixels(1),
    //     left: 12,
    //     right: 12
    // }

    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30
    };

    // Radar rings and sections
    const rings = config.rings;
    const sections = config.sections;

    $: $blipActionStore, blipAction();

    function blipAction(){
        if ($blipActionStore.entryIndex > -1){
            const entry = entries[$blipActionStore.entryIndex];
            const color = entry.color;

            const blip = select(vis).select("#blip-" + entry.id);
            const circle = blip.select("circle");
            const text = blip.select("text");

            if($blipActionStore.entryHighlight){
                circle.attr("stroke", color)
                circle.attr("fill","#fff")

                text.attr("fill", color)
            } else {
                circle.attr("stroke", null)
                circle.attr("fill",color)

                text.attr("fill", "#fff")
            }
        }
    }

    // Radar sections and rings
    const arcs = pie().padAngle(0).value( _ => 1)(sort(sections, section => section.index));
    const shape = arc()
        .innerRadius(0)
        .outerRadius(350)
        .startAngle(function (d) {return d.startAngle + Math.PI/2})
        .endAngle(function(d) {return d.endAngle + Math.PI/2});

    onMount(() => {
        draw();
    })

    function draw(): void {

        select(vis).html(null);

        function translate(x, y) {
            return "translate(" + x + "," + y + ")";
        }

        function segment(section, ring) {

            const polar_min = {
                t: (arcs[section].startAngle )  ,
                r: ring === 0 ? 30 : (rings[ring-1].radius + 15)
            };
            const polar_max = {
                t: (arcs[section].endAngle) ,
                r: rings[ring].radius - 15
            };
            return {
                clipx: function(d) {
                    const polar_coor = polar(d);
                    const p = bounded_ring(polar_coor, polar_min, polar_max);
                    d.x = cartesian(p).x;
                    return d.x;
                },
                clipy: function(d) {
                    const polar_coor = polar(d);
                    const p = bounded_ring(polar_coor, polar_min, polar_max)
                    d.y = cartesian(p).y;
                    return d.y;
                },
                random: function() {
                    const coordinates = cartesian({
                        t: random_between(polar_min.t, polar_max.t),
                        r: normal_between(polar_min.r, polar_max.r)
                    });
                    return coordinates;
                }
            }
        }
        // Generate arcs for correct grid plotting using d3-shapes

        // Prepare Entries for processing
        const blips = map(entries, entry => {
            entry.segment = segment(entry.slice, entry.ring)
            const point = entry.segment.random();

            entry.x = point.x;
            entry.y = point.y;
            entry.color = sections[entry.slice].color;
            return entry;
        });


        // create svg and create a group inside that is moved by means of margin
        const svg = select(vis)
            .append('svg')
            .attr('width', width )
            .attr('height', elementHeight )
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "display: block; margin: auto 0;");


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
        for (let i = 0; i < rings.length; i++) {
            grid.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", rings[i].radius)
                .style("fill", "none")
                .style('stroke', '#000');
            grid.append("text")
                .text(rings[i].label)
                .attr("y", -rings[i].radius + 62)
                .attr("text-anchor", "middle")
                .style("fill", "#e5e5e5")
                .style("font-family", "Arial, Helvetica")
                .style("font-size", "42px")
                .style("font-weight", "bold")
                .style("pointer-events", "none")
                .style("user-select", "none");
        }

        // Draw Blips
        const rink = radar.append("g")
            .attr("id","rink")
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
                    .on("mouseout", function (event, d) {
                        unHighlightEntry();
                    })
                    .on("click", function (event,d) {
                        selectEntry(d.id)
                    });

        blip_elements.each( function (d) {
            const blip = select(this);
            blip.append("circle")
                .attr("r", 9)
                .attr("fill", d.color)
            blip.append("text")
                .text(d.id)
                .attr("y", 4)
                .attr("fill", "#fff")
                .attr("text-anchor", "middle")
                .style("font-size", "10px")

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
            .force("collision", forceCollide().radius(9).strength(0.85).iterations(2))
            .on("tick", ticked);
    }
</script>




<div bind:clientHeight={elementHeight} class="radar-visualisation-wrapper" bind:this={vis} ></div>

<style>
    .radar-visualisation-wrapper{
        display: flex;
        height: 100%;
    }
</style>