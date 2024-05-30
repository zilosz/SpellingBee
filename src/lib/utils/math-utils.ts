export function randomInt(max: number): number {
    return Math.floor(Math.random() * max)
}

export function shuffleArray<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInt(arr.length);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

export function shuffledLetters(word: string): string {
    const letters = [...word];
    shuffleArray(letters);
    return letters.join("");
}

export function shuffledMap<K, V>(map: Map<K, V>): Map<K, V> {
    const newMap = new Map();

    const keys = [...map.keys()];
    shuffleArray(keys);

    for (const key of keys) {
        newMap.set(key, map.get(key));
    }

    return newMap;
}