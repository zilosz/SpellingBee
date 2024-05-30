<script lang="ts">
	import LetterButton from './LetterButton.svelte';
	import reloadSymbol from '$lib/assets/reload-symbol.png';
	import { getNotificationsContext } from 'svelte-notifications';
	import type { Pangram } from '$lib/types/pangram.type';
	import { possibleWords } from '$lib/stores/possible-words-store';
	import { currentWord } from '$lib/stores/current-word-store';
	import { foundWords } from '$lib/stores/words-found-store';
	import { computeWordScore } from '$lib/utils/pangram-utils';
	import { settings } from '$lib/stores/settings-store';
	import { shuffledMap } from '$lib/utils/math-utils';

	const { addNotification, clearNotifications } = getNotificationsContext();

	export let pangram: Pangram;

	possibleWords.init(pangram);

	function shuffleLetters() {
		pangram.letters = shuffledMap(pangram.letters);
	}

	function submitWord() {
		clearNotifications();

		if (!$possibleWords.wordSet.has($currentWord)) {

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
			let hasMandatoryLetters = true;

			for (const [letter, mandatory] of pangram.letters) {

				if (mandatory && !$currentWord.includes(letter)) {
					hasMandatoryLetters = false;
					break;
				}
			}

			if (hasMandatoryLetters) {
				foundWords.addWord($currentWord, $settings.pangramLength);

				const score = computeWordScore($currentWord, $settings.pangramLength);

				addNotification({
					type: "success", 
					text: `${$currentWord.toUpperCase()}: +${score} points!`, 
					position: "top-center", 
					removeAfter: 1_500
				})

			} else {
				addNotification({
					type: "error", 
					text: `Missing center letter...`, 
					position: "top-center", 
					removeAfter: 1_500
				});
			}
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
		<span class:mandatory={pangram.letters.get(letter)}>{letter}</span>
	{/each}
</h2>
<div class="letters">
	{#each pangram.letters as [letter, mandatory]}
		<LetterButton letter={letter} mandatory={mandatory} />
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
		font-size: 45px;
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
