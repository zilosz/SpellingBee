import { DEFAULT_SETTINGS } from "$lib/constants/settings";
import { readable } from "svelte/store";

export const settings = readable(DEFAULT_SETTINGS);