import { findMaxWordLength } from "$lib/utils/words-utils";
import { readable } from "svelte/store";

export const maxWordLength = readable(findMaxWordLength());