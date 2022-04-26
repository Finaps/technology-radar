export interface CartesianCoordinates  {
    x : number;
    y : number;
}

export interface PolarCoordinates {
    r: number;
    t: number;
}

export function cartesian(polar: PolarCoordinates) {
    return {
        x : polar.r * Math.cos(polar.t),
        y : polar.r * Math.sin(polar.t)
    }
}

export function polar(cartesian : CartesianCoordinates) {
    const x = cartesian.x;
    const y = cartesian.y;
    return {
        t: Math.atan2(y,x),
        r: Math.sqrt(x * x + y * y)
    }
}