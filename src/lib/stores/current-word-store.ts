import { writable } from "svelte/store";

function createCurrentWordStore(word: string) {
    const { subscribe, set, update } = writable(word)

    function addLetter(letter: string) {
        update(word => word + letter)
    }

    function removeLetter() {
        update(word => word.substring(0, word.length - 1))
    }

    function clear() {
        set("")
    }

    return { subscribe, addLetter, removeLetter, clear }
}

export const currentWord = createCurrentWordStore("")