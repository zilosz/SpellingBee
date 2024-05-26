<script lang="ts">
	import ProgressTracker from "$lib/ProgressTracker.svelte";
    import WordBuilder from "$lib/WordBuilder.svelte";
	import { loadPangram } from "$lib/utils/pangram-utils";
	import Notifications from "svelte-notifications";
</script>

<svelte:head>
    <title>Spelling Bee</title>
</svelte:head>

<Notifications>
    <div class="panel-wrapper">
        <div class="wrapper">
            <div class="word-builder">
                <WordBuilder pangram={loadPangram()} />
            </div>
        </div>
        <div class="wrapper">
            <div class="progress-tracker">
                <ProgressTracker />
            </div>
        </div>
    </div>
</Notifications>

<style>
    :root {
        background-color: rgb(33, 26, 39);
    }

    .panel-wrapper {
        display: flex;
        height: 100vh;
        justify-content: center;
        gap: 100px;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .word-builder, .progress-tracker {
        width: max-content;
    }
</style>
