<script lang="ts">
	import { settings } from '$lib/stores/settings-store';
	import { foundWords } from '$lib/stores/words-found-store';
	import { computeWordScore } from '$lib/utils/pangram-utils';
</script>

<div class="words-wrapper">
	<div class="words">
		<table>
			{#each $foundWords.wordSet as word}
				<tr>
					<td class="word">{word}</td>
					<td class="word-points">
						<strong>{computeWordScore(word, $settings.pangramLength)}</strong>
					</td>
				</tr>
			{/each}
		</table>
	</div>
</div>

<style>
	.words-wrapper {
		background-color: rgb(93, 53, 103);
		border-radius: 25px;
		height: 460px;
		display: flex;
		align-items: center;
	}

	.words {
		overflow-y: scroll;
		scrollbar-color: white rgb(147, 98, 142);
		height: 410px;
		padding-left: 20px;
		width: 100%;
	}

	table {
		font-family:
			Trebuchet MS,
			sans-serif;
	}

	td {
		padding: 0px;
	}

	.word {
		font-size: 20px;
		color: white;
	}

	.word-points {
		font-size: 25px;
		color: gold;
		padding-left: 20px;
	}
</style>
