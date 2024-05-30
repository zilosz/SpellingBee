import { WORDS } from "$lib/constants/words";
import type { Pangram } from "$lib/types/pangram.type";
import type { Words } from "$lib/types/words.type";
import { isPangram, computeWordScore } from "$lib/utils/pangram-utils";
import { writable } from "svelte/store";

function findPossibleWords(pangram: Pangram): Words {
    const wordSet: Set<string> = new Set();
    const lengthFrequencies: Map<number, number> = new Map();

    let numPangrams = 0;
    let numPoints = 0;

    for (const word of WORDS) {
        let missingMandatory = false;

        for (const [letter, mandatory] of pangram.letters) {

            if (mandatory && !word.includes(letter)) {
                missingMandatory = true;
                break;
            }
        }

        if (missingMandatory) {
            continue;
        }

        let possible = true;

        for (const possibleLetter of word) {

            if (!pangram.letters.has(possibleLetter)) {
                possible = false;
                break;
            }
        }

        if (possible) {
            wordSet.add(word);

            const frequency = lengthFrequencies.get(word.length);

            if (frequency === undefined) {
                lengthFrequencies.set(word.length, 1);

            } else {
                lengthFrequencies.set(word.length, frequency + 1);
            }

            if (isPangram(word, pangram.letters.size)) {
                numPangrams++;
            }

            numPoints += computeWordScore(word, pangram.letters.size);
        }
    }

    const sortedLengthFrequencies = new Map();

    const lengthKeys = [...lengthFrequencies.keys()];
    lengthKeys.sort((a, b) => a - b);

    for (const length of lengthKeys) {
        sortedLengthFrequencies.set(length, lengthFrequencies.get(length));
    }

    return {
        wordSet: wordSet, 
        lengthFrequencies: sortedLengthFrequencies, 
        numPangrams: numPangrams, 
        numPoints: numPoints
    }
}

function createPossibleWordsStore(words: Words) {
    const { subscribe, set } = writable(words);

    function init(pangram: Pangram) {
        set(findPossibleWords(pangram));
    }

    return { subscribe, init };
}

export const possibleWords = createPossibleWordsStore({
    wordSet: new Set(), 
    lengthFrequencies: new Map(), 
    numPangrams: 0, 
    numPoints: 0
});