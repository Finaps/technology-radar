<script lang="ts">
    import { onMount } from 'svelte';
    import {select} from 'd3-selection'
    import {pie, arc} from 'd3-shape';
    import {bounded_ring, random_between, normal_between} from "../../helpers/bounding";
    import {sort, map} from "d3-array";
    import {cartesian, polar} from "../../helpers/geometry";

    let vis; // binding with div for visualization

    export let entries;

    export let config;

    // ViewBox dimensions
    const width = 800;
    const height = 800;
    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30
    };

    // Radar rings and sections
    const rings = config.rings;
    const sections = config.sections;


    // Radar sections and rings
    const arcs = pie().padAngle(0).value( _ => 1)(sort(sections, section => section.index));
    const shape = arc().innerRadius(0).outerRadius(400);

    // console.log(arcs)
    onMount(() => {
        draw();
    })

    function draw(): void {

        function translate(x, y) {
            return "translate(" + x + "," + y + ")";
        }

        function segment(section, ring) {

            const polar_min = {
                t: (arcs[section].startAngle -( 0.5* Math.PI ) )  ,
                r: ring === 0 ? 15 : (rings[ring-1].radius + 15)
            };
            const polar_max = {
                t: (arcs[section].endAngle - (0.5* Math.PI) ) ,
                r: rings[ring].radius - 15
            };
            return {
                clipx: function(d) {
                    const p = bounded_ring(polar(d), polar_min, polar_max);
                    d.x = cartesian(p).x;
                    return d.x;
                },
                clipy: function(d) {
                    const p = bounded_ring(polar(d), polar_min, polar_max);
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
            const point = segment(entry.slice, entry.ring).random();

            entry.x = point.x;
            entry.y = point.y;
            entry.color = sections[entry.slice].color;
            return entry;
        });


        // create svg and create a group inside that is moved by means of margin
        const svg = select(vis)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);
            // .attr("viewBox", [-width / 2, -height / 2, width, height]);


        // create Radar
        const radar = svg.append("g")
            .attr("transform",  translate(width / 2, height / 2) )

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
                    .attr("class", "blip")
                    .attr("transform", function (b){
                        return translate(b.x,b.y);
                    });

        blip_elements.each( function (d) {
            const blip = select(this);
            blip.append("circle")
                .attr("r", 7)
                .attr("fill", d.color)
            blip.append("text")
                .text(d.id)
                .attr("y", 4)
                .attr("fill", "#fff")
                .attr("text-anchor", "middle")
                .style("font-size", "12px")

        });
    }
</script>

<div bind:this={vis} class="p-0"></div>