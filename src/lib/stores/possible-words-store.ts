import type { Words } from "$lib/types/words.type";
import { isPangram, scoreLetters } from "$lib/utils/pangram-utils";
import { words } from "$lib/data/words";
import { writable } from "svelte/store";

function findPossibleWords(letters: string[], mandatoryLetter: string): Words {
    const wordSet: Set<string> = new Set();
    const lengthToFrequencyMap = new Map();

    let numPangrams = 0;
    let numPoints = 0;

    for (const word of words) {

        if (!word.includes(mandatoryLetter)) {
            continue;
        }

        let possible = true;

        for (const possibleLetter of word) {

            if (!letters.includes(possibleLetter)) {
                possible = false;
                break;
            }
        }

        if (possible) {
            wordSet.add(word);

            const frequency = lengthToFrequencyMap.get(word.length);

            if (frequency === undefined) {
                lengthToFrequencyMap.set(word.length, 1);

            } else {
                lengthToFrequencyMap.set(word.length, frequency + 1);
            }

            if (isPangram(word)) {
                numPangrams++;
            }

            numPoints += scoreLetters(word);
        }
    }

    const sortedLengthToFrequencyMap = new Map();

    const lengthKeys = [...lengthToFrequencyMap.keys()];
    lengthKeys.sort((a, b) => a - b);

    for (const length of lengthKeys) {
        sortedLengthToFrequencyMap.set(length, lengthToFrequencyMap.get(length));
    }

    return {
        wordSet: wordSet, 
        lengthToFrequencyMap: sortedLengthToFrequencyMap, 
        numPangrams: numPangrams, 
        numPoints: numPoints
    }
}

function createPossibleWordsStore(words: Words) {
    const { subscribe, set } = writable(words);

    function init(letters: string[], mandatoryLetter: string) {
        set(findPossibleWords(letters, mandatoryLetter));
    }

    return { subscribe, init };
}

export const possibleWords = createPossibleWordsStore({
    wordSet: new Set(), 
    lengthToFrequencyMap: new Map(), 
    numPangrams: 0, 
    numPoints: 0
});