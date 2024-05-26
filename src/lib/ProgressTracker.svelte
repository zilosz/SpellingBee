<script lang="ts">
	import StatsTab from "./StatsTab.svelte";
    import WordsTab from "./WordsTab.svelte";
	import { possibleWords } from "./stores/possible-words-store";
	import { foundWords } from "./stores/words-found-store";
    import { getNotificationsContext } from "svelte-notifications";
	import { isPangram } from "./utils/pangram-utils";

    const { addNotification } = getNotificationsContext();

    let currentComponent: any = WordsTab;

    function showAnswers() {
        const wordsLeft = [];

        for (const word of $possibleWords.wordSet) {

            if (!$foundWords.wordSet.has(word)) {
                wordsLeft.push(word);
            }
        }

        wordsLeft.sort((a, b) => b.length - a.length);

        const pangrams: string[] = [];

        for (const word of wordsLeft) {
            console.log(word);

            if (isPangram(word)) {
                pangrams.push(word);
            }
        }

        console.log(`${wordsLeft.length} total words.`)

        for (const pangram of pangrams) {
            console.log(pangram);
        }

        console.log(`${pangrams.length} pangrams.`)

        addNotification({
            type: "warning", 
            text: "Logged answers in console.", 
            position: "top-center", 
            removeAfter: 1_500
        });
    }
</script>

<button 
    class="tab-button"
    class:shown={currentComponent === WordsTab} 
    class:hidden={currentComponent !== WordsTab}
    on:click={() => currentComponent = WordsTab}
>
    Words
</button>
<button 
    class="tab-button"
    class:shown={currentComponent === StatsTab}
    class:hidden={currentComponent !== StatsTab}
    on:click={() => currentComponent = StatsTab}
>
    Stats
</button>
<button
    class="show-answers-button"
    on:click={showAnswers}
>
    Log Answers
</button>
<div class="component-wrapper">
    <div class="header-wrapper">
        <div class="words">
            Found:
            <strong><span class="numer">{$foundWords.wordSet.size}</span></strong>
            /
            <strong><span class="denom">{$possibleWords.wordSet.size}</span></strong>
        </div>
        <div class="points">
            Points:
            <strong><span class="numer">{$foundWords.numPoints}</span></strong>
            /
            <strong><span class="denom">{$possibleWords.numPoints}</span></strong>
        </div>
    </div>
    {#key $foundWords}
        <svelte:component this={currentComponent} />
    {/key}
</div>

<style>
    button {
        font-family: Gill Sans, sans-serif;
        font-size: 25px;
        color: white;
        background-color: rgb(93, 53, 103);
        border-style: none;
        border-radius: 10px;
        padding: 5px;
        cursor: grab;
    }

    .show-answers-button {
        float: right;
        margin-top: 5px;
    }

    .hidden:hover, .show-answers-button:hover {
        background-color: rgb(61, 35, 67);
    }

    .shown {
        background-color: rgb(228, 227, 227);
        color: black;
        border-style: solid;
        border-width: 5px;
        border-color: rgb(93, 53, 103);
    }

    .component-wrapper {
        min-height: 540px;
        max-height: 540px;
        width: 500px;
        overflow: hidden;
    }

    .header-wrapper {
        display: flex;
        align-items: center;
        justify-content:space-between;
        margin-top: 7px;
        margin-bottom: 7px;
    }

    .words, .points {
        font-family: Gill Sans, sans-serif;
        font-size: 25px;
        color: white;
    }

    strong {
        font-size: 30px;
    }

    .numer {
        color: gold;
    }

    .denom {
        color: rgb(93, 53, 103);
    }
</style>