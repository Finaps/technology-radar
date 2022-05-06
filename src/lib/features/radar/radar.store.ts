import {writable} from "svelte/store"

function createState(){
    const {subscribe,set,update} = writable({
        highlighted: false,
        highlightColor: null,
        entry: null
    })
    return {
        subscribe,
        highlight: (entry, color) => update(_ => ({
            highlighted: true,
            highlightColor: color,
            entry: entry
        })),
        unHighlight: (entry, color) => update(_ => ({
            highlighted: false,
            highlightColor: color,
            entry: entry
        })),
        reset: () => set({
            highlighted: false,
            highlightColor: null,
            entry: null
        })
    }
}
export const highlightStore = createState();