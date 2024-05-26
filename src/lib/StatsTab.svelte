<script lang="ts">
	import { possibleWords } from "./stores/possible-words-store";
	import { foundWords } from "./stores/words-found-store";

    function getNumFoundWords(length: number): number | undefined {
        return $foundWords.lengthToFrequencyMap.has(length) ? $foundWords.lengthToFrequencyMap.get(length) : 0;
    }
</script>

<div class="stats-wrapper">
    <table>
        {#each [...$possibleWords.lengthToFrequencyMap] as [possibleLength, frequency]} 
            <tr>
                <td class="length-cell">{possibleLength} letter words</td>
                <td class="found-ratio-cell">
                    <strong><span class="numer">{getNumFoundWords(possibleLength)}</span></strong>
                    /
                    <strong><span class="denom">{frequency}</span></strong>
                </td>
            </tr>
        {/each}
        <tr>
            <td class="length-cell">Pangrams</td>
            <td class="found-ratio-cell">
                <strong><span class="numer">{$foundWords.numPangrams}</span></strong>
                /
                <strong><span class="denom">{$possibleWords.numPangrams}</span></strong>
            </td>
        </tr>
    </table>
</div>

<style>
    .stats-wrapper {
        background-color: rgb(93, 53, 103);
        border-radius: 25px;
        min-height: 460px;
        max-height: 460px;
    }

    table {
        font-family: Trebuchet MS, sans-serif;
        padding-top: 20px;
        padding-left: 20px;
    }

    td {
        font-family: Gill Sans, sans-serif;
        padding: 0px;
    }

    .length-cell {
        font-size: 20px;
        color: white;
    }

    .found-ratio-cell {
        font-size: 25px;
        color: white;
        padding-left: 20px;
    }

    .numer {
        color: gold;
    }

    .denom {
        color: rgb(57, 20, 74);
    }
</style>