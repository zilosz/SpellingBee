import { loadPangram } from "$lib/utils/pangram-utils"

export const load = async () => {
    return {
        pangram: loadPangram()
    };
}