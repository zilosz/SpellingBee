import type { Words } from "$lib/types/words.type";
import { isPangram, scoreLetters } from "$lib/utils/pangram-utils";
import { writable } from "svelte/store";

function updateFoundWords(foundWords: Words, word: string): Words {
    const newWords = foundWords.wordSet;
    newWords.add(word);

    const newMap = foundWords.lengthToFrequencyMap;
    const frequency = newMap.get(word.length);

    if (frequency === undefined) {
        newMap.set(word.length, 1);

    } else {
        newMap.set(word.length, frequency + 1);
    }

    let numPangrams = foundWords.numPangrams;

    if (isPangram(word)) {
        numPangrams++;
    }

    return {
        wordSet: newWords, 
        lengthToFrequencyMap: newMap, 
        numPangrams: numPangrams, 
        numPoints: foundWords.numPoints + scoreLetters(word)
    }
}

function createFoundWordsStore(wordsFound: Words) {
    const { subscribe, update } = writable(wordsFound)

    function addWord(word: string) {
        update(wordsFound => updateFoundWords(wordsFound, word));
    }

    return { subscribe, addWord }
}

export const foundWords = createFoundWordsStore({
    wordSet: new Set(), 
    lengthToFrequencyMap: new Map(), 
    numPangrams: 0, 
    numPoints: 0
})