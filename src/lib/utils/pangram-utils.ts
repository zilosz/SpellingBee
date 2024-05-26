import { randomInt, randomIntInBounds } from "./math-utils";
import { pangrams } from "../data/pangrams";

export function shufflePangram(letters: string[]): string[] {

    for (let i = letters.length - 1; i > 0; i--) {

        if (i == 3) {
            continue;
        }

        let j = Math.random() < 0.5 ? randomInt(3) : randomIntInBounds(4, 7);
        [letters[i], letters[j]] = [letters[j], letters[i]]
    }

    return letters;
}

function shuffleLetters(letters: string[]) {
    for (let i = letters.length - 1; i > 0; i--) {
        let j = randomInt(i + 1);
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
}

export function loadPangram(): string[] {
    const letters = [...pangrams[randomInt(pangrams.length)]]
    shuffleLetters(letters)
    return letters;
}

export function isPangram(letters: string): boolean {
    return new Set(letters).size == 7;
}

export function scoreLetters(letters: string): number {
    let score = letters.length;

    if (isPangram(letters)) {
        score += 7;
    }
    
    return score;
}