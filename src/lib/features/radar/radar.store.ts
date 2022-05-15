import {machineStore} from "$lib/helpers/stateMachineStore";
import type {MachineConfig, MachineState} from "cogwheel/dist/types";
import {assign, send} from "cogwheel";

type Ctx = {
    entryId?: number;
}

// Highlight Store
function setHighlightCtx(state: MachineState<Ctx>, entryId: number){
    return assign({entryId});
}

const highlightConfig : MachineConfig<Ctx> = {
    init: 'notHighlighted',
    states:{
        highlighted : {
            UN_HIGHLIGHT : 'notHighlighted',
            _entry: [setHighlightCtx]
        },
        notHighlighted :{ HIGHLIGHT: 'highlighted' }
    }
}

export const highlightStore = machineStore(highlightConfig);

export function highlightEntry(entryId: number){
    highlightStore.send({type:'HIGHLIGHT', payload: entryId})
}

export function unHighlightEntry(){
    highlightStore.send({type: 'UN_HIGHLIGHT'})
}

// Selection Store
function setSelectedCtx(state: MachineState<Ctx>, entryId: number){
    if (state.context.entryId === entryId) return send({type:'DESELECT'});
    return assign({entryId});
}

function clearCtx(){
    return assign({entryId: null});
}
const selectedConfig : MachineConfig<Ctx> = {
    init: 'noEntrySelected',
    states: {
        entrySelected: {
            DESELECT: 'noEntrySelected',
            SELECT: 'entrySelected',
            _entry:[setSelectedCtx]
        },
        noEntrySelected: {
            SELECT: 'entrySelected',
            _entry:[clearCtx]
        }
    }
}

export const selectedStore = machineStore(selectedConfig)

export function selectEntry(entryId: number){
    selectedStore.send({type:'SELECT', payload: entryId})
}
export function deSelect(){
    selectedStore.send({type: 'DESELECT'})
}

