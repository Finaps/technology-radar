import {derived} from "svelte/store";
import {highlightStore} from "$lib/features/radar/radar.store";

export const blipActionStore = derived([highlightStore], ([$highlightStore]) => {
    const entryIndex = ($highlightStore.context.entryId) ? $highlightStore.context.entryId : 0
    return {
        entryIndex: entryIndex - 1,
        entryHighlight: ($highlightStore.state === 'highlighted')
    }
})
