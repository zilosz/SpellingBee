<script lang="ts">
    import { currentWord } from "./stores/current-word-store";

    export let letter: string
    export let mandatory: boolean

    function addLetter() {
        if ($currentWord.length < 17) {
            currentWord.addLetter(letter);
        }
    }

    function onKeyDown(event: KeyboardEvent) {
        if (event.key === letter) {
            addLetter()
        }
    }
</script>

<div>
    <button 
        on:click={addLetter} 
        class:mandatory={mandatory} 
        class:optional={!mandatory}
    >
        {letter}
    </button>
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    div {
        min-width: 85px;
        min-height: 85px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button {
        font-size: 60px;
        font-family: Gill Sans, sans-serif;
        color: rgb(228, 227, 227);
        border-width: 4px;
        border-style: solid;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        cursor: grab;
        border-color: rgb(79, 44, 92);
    }

    .mandatory {
        background-color: rgb(220, 165, 16);
    }

    .optional {
        background-color: rgb(147, 98, 142);
    }

    button:hover {
        width: 85px;
        height: 85px;
        font-size: 70px;
    }
</style>