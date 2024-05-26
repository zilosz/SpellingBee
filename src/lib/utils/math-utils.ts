export function randomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function randomIntInBounds(min: number, max: number): number {
    return randomInt(max - min) + min;
}