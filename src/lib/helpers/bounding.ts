import type {PolarCoordinates} from "./geometry";

let seed = 42;

function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function random_between(min, max) {
    return min + random() * (max - min);
}

export function normal_between(min, max) {
    return min + (random() + random()) * 0.5 * (max - min);
}

export function bounded_interval(value : number, min: number, max: number) {
    const low = Math.min(min, max);
    const high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
}

export function bounded_ring(polar: PolarCoordinates, polar_min: PolarCoordinates, polar_max: PolarCoordinates) {
    return {
        t: bounded_interval(polar.t, polar_min.t, polar_max.t),
        r: bounded_interval(polar.r, polar_min.r, polar_max.r)
    }
}