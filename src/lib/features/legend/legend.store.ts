import {derived} from "svelte/store"
import {highlightStore , selectedStore} from "$lib/features/radar/radar.store"
export const createLegendEntryStateStore = (entry) => {
    const legendEntryState = derived ([highlightStore,selectedStore], ([$store,$selectedStore]) => {
        const highlighted = ($store.context.entryId === entry.id && $store.state === 'highlighted')
        const selected = ($selectedStore.context.entryId === entry.id && $selectedStore.state === 'entrySelected')

        return{
            headerBackgroundColor: (highlighted || selected) ? entry.color : "#fff",
            headerTextColor: (highlighted || selected) ?  "#fff" : "#000",
            expanded: selected
        }
    })
    return {
        subscribe : legendEntryState.subscribe
    }
}