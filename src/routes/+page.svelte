<script lang="ts">
	import Notifications from "svelte-notifications";
	import WordBuilder from "$lib/components/WordBuilder.svelte";
	import ProgressTracker from "$lib/components/ProgressTracker.svelte";
	import { loadPangram } from "$lib/utils/pangram-utils";
	import { settings } from "$lib/stores/settings-store";
</script>

<svelte:head>
    <title>Spelling Bee</title>
</svelte:head>

<Notifications>
    <div class="panel-wrapper">
        <div class="wrapper">
            <div class="word-builder">
                <WordBuilder pangram={loadPangram($settings.pangramLength, $settings.mandatoryCount)} />
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
