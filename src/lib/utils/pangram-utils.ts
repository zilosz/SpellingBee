import { randomInt, shuffleArray, shuffledLetters } from "./math-utils";
import { PANGRAMS } from "../constants/pangrams";
import type { Pangram } from "$lib/types/pangram.type";

export function loadPangram(length: number, numMandatoryLetters: number): Pangram {
    const pangrams = PANGRAMS[length.toString()];
    const pangram = shuffledLetters(pangrams[randomInt(pangrams.length)]);

    const letterMap: Map<string, boolean> = new Map();

    for (const letter of pangram) {
        letterMap.set(letter, false);
    }

    const letters = [...pangram];
    shuffleArray(letters);

    for (let i = 0; i < numMandatoryLetters; i++) {
        const mandatoryLetter = letters.pop();

        if (mandatoryLetter !== undefined) {
            letterMap.set(mandatoryLetter, true);
        }
    }

    return {
        letters: letterMap
    }
}

export function isPangram(word: string, pangramLength: number): boolean {
    return new Set(word).size === pangramLength;
}

export function computeWordScore(word: string, pangramLength: number): number {
    let score = word.length;

    if (isPangram(word, pangramLength)) {
        score += pangramLength;
    }
    
    return score;
}