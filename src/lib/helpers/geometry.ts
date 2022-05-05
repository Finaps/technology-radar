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
    const tau = Math.atan2(y,x)

    return {
        t: ( (tau >= 0 ) ? tau : (Math.PI + (Math.PI - Math.abs(tau)))),
        r: Math.sqrt(x * x + y * y)
    }
}