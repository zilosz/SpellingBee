import { WORDS } from "$lib/constants/words";

export function findMaxWordLength(): number {
  let maxLength = 0;

  for (const word of WORDS) {

    if (word.length > maxLength) {
      maxLength = word.length;
    }
  }

  return maxLength;
}