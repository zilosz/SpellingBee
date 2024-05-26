<script lang="ts">
	import LetterButton from './LetterButton.svelte';
	import reloadSymbol from '$lib/assets/reload-symbol.png';
	import { currentWord } from './stores/current-word-store';
	import { foundWords } from './stores/words-found-store';
	import { scoreLetters, shufflePangram } from './utils/pangram-utils';
	import { getNotificationsContext } from 'svelte-notifications';
	import { possibleWords } from './stores/possible-words-store';

	const { addNotification, clearNotifications } = getNotificationsContext();

	export let pangram: string[];

	const mandatoryLetter = pangram[3];
	possibleWords.init(pangram, mandatoryLetter);

	function shuffleLetters() {
		pangram = shufflePangram(pangram);
	}

	function submitWord() {
		clearNotifications();

		if (!$currentWord.includes(mandatoryLetter)) {

			addNotification({
				type: "error", 
				text: `Missing center letter...`, 
				position: "top-center", 
				removeAfter: 1_500
			});

		} else if (!$possibleWords.wordSet.has($currentWord)) {

			addNotification({
				type: "error", 
				text: `${$currentWord.toUpperCase()} is not a word...`, 
				position: "top-center", 
				removeAfter: 1_500
			});

		} else if ($foundWords.wordSet.has($currentWord)) {

			addNotification({
				type: "error", 
				text: `Already found ${$currentWord.toUpperCase()}...`, 
				position: "top-center", 
				removeAfter: 1_500
			});

		} else {
			foundWords.addWord($currentWord);

			addNotification({
				type: "success", 
				text: `${$currentWord.toUpperCase()}: +${scoreLetters($currentWord)} points!`, 
				position: "top-center", 
				removeAfter: 1_500
			})
		}

		currentWord.clear();
	}

	function onKeyDown(event: KeyboardEvent) {

		switch (event.key) {

			case 'Backspace':
				if (event.shiftKey) {
					currentWord.clear();
				} else {
					currentWord.removeLetter();
				}
				break;

			case 'Enter':
				submitWord();
				break;

			case ' ':
				shuffleLetters();
				break;
		}
	}
</script>

<h2>
	{#each $currentWord as letter}
		<span class:mandatory={letter === mandatoryLetter}>{letter}</span>
	{/each}
</h2>
<div class="letters">
	{#each pangram as letter}
		<LetterButton {letter} mandatory={letter === mandatoryLetter} />
	{/each}
</div>
<div class="buttons">
	<button class="text-button" on:click={currentWord.clear}>Clear</button>
	<button class="text-button" on:click={currentWord.removeLetter}>Delete</button>
	<button class="shuffle-button" on:click={shuffleLetters}>
		<img id="shuffle-image" alt="Shuffle" src={reloadSymbol} />
	</button>
	<button class="text-button" on:click={submitWord}>Enter</button>
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
	.letters,
	.buttons {
		display: flex;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		width: max-content;
	}

	.letters {
		background-color: rgb(93, 53, 103);
		border-radius: 50px;
		align-items: center;
	}

	.buttons {
		margin-top: 25px;
		gap: 25px;
	}

	button {
		background-color: rgb(147, 98, 142);
		margin-bottom: auto;
		margin-top: auto;
		cursor: grab;
		border-style: none;
	}

	button:hover {
		background-color: rgb(93, 53, 103);
	}

	.text-button {
		font-family:
			Gill Sans,
			sans-serif;
		font-size: 23px;
		border-radius: 15px;
		color: rgb(228, 227, 227);
		padding: 5px 10px 5px 10px;
	}

	.shuffle-button {
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#shuffle-image {
		width: 70px;
		height: 45px;
		color: white;
		filter: invert(95%);
	}

	h2 {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family:
			Gill Sans,
			sans-serif;
		font-size: 56px;
		color: white;
		margin-bottom: 20px;
		height: 70px;
		margin-top: 0px;
	}

	@keyframes cursor-blink {
		0% {
			opacity: 0;
		}
	}

	h2::after {
		width: 5px;
		height: 56px;
		background-color: gold;
		content: '';
		margin-left: 10px;
		border-radius: 10px;
		animation: cursor-blink 1.2s steps(2) infinite;
	}

	.mandatory {
		color: gold;
	}
</style>
