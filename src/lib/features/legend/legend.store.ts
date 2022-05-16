import {derived} from "svelte/store"
import {highlightStore, selectedStore, selectEntry} from "$lib/features/radar/radar.store"
import {machineStore} from "$lib/helpers/stateMachineStore";
import type {MachineConfig} from "cogwheel/dist/types";
import {send} from "cogwheel";

function autoTransition(event: string) {
    return function () {
        return send({type: event});
    };
}

const machineStoreConfig: MachineConfig<any> = {
    init: 'closed',
    states: {
        open: {
            CLOSED: 'closing'
        },
        closing: {
            CLOSING_DONE: 'closed',
            _entry: [autoTransition('CLOSING_DONE')]
        },
        closed: {
            OPENED: 'opening'
        },
        opening: {
            OPENING_DONE: 'open',
            _entry: [autoTransition('OPENING_DONE')]
        }
    }
}

export const legendEntryStateStore = (entryId) => {
    const entryDrawerStateStore = machineStore<any>(machineStoreConfig)
    const entryStateStore = derived([highlightStore, selectedStore, entryDrawerStateStore],
        ([$highlightStore, $selectedStore, $entryDrawerStateStore]) => {

            const isSelected = ($selectedStore.context.entryId === entryId
                && $selectedStore.state == 'entrySelected');
            const isDrawerOpen = ($entryDrawerStateStore.state === 'open')
            const isDrawerTransitioning = ($entryDrawerStateStore.state === 'opening' || $entryDrawerStateStore.state === 'closing')
            const isHighlighted = ($highlightStore.context.entryId === entryId
                && $highlightStore.state === 'highlighted') || isSelected || (isDrawerOpen && isDrawerTransitioning);

            if (isSelected && !isDrawerOpen) entryDrawerStateStore.send({type: 'OPENED'});
            if (!isSelected && isDrawerOpen) entryDrawerStateStore.send({type: 'CLOSED'});

            return {
                isSelected,
                isDrawerOpen,
                isHighlighted
            }
        });
    return {
        subscribe: entryStateStore.subscribe
    }
}
export const entrySelected = (entryId) => {
    const selectedState = derived(selectedStore, ($selectedStore) => {
        return ($selectedStore.context.entryId === entryId && $selectedStore.state == 'entrySelected')
    })
    return {
        subscribe: selectedState.subscribe
    }
}