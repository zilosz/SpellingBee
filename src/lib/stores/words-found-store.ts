import type { Words } from "$lib/types/words.type";
import { isPangram, computeWordScore } from "$lib/utils/pangram-utils";
import { writable } from "svelte/store";

function updateFoundWords(foundWords: Words, word: string, pangramLength: number): Words {
    const newWords = foundWords.wordSet;
    newWords.add(word);

    const newLengthFrequencies = foundWords.lengthFrequencies;
    const frequency = newLengthFrequencies.get(word.length);

    if (frequency === undefined) {
        newLengthFrequencies.set(word.length, 1);

    } else {
        newLengthFrequencies.set(word.length, frequency + 1);
    }

    let numPangrams = foundWords.numPangrams;

    if (isPangram(word, pangramLength)) {
        numPangrams++;
    }

    return {
        wordSet: newWords, 
        lengthFrequencies: newLengthFrequencies, 
        numPangrams: numPangrams, 
        numPoints: foundWords.numPoints + computeWordScore(word, pangramLength)
    }
}

function createFoundWordsStore(words: Words) {
    const { subscribe, update } = writable(words)

    function addWord(word: string, pangramLength: number) {
        update(words => updateFoundWords(words, word, pangramLength));
    }

    return { subscribe, addWord };
}

export const foundWords = createFoundWordsStore({
    wordSet: new Set(), 
    lengthFrequencies: new Map(), 
    numPangrams: 0, 
    numPoints: 0
})