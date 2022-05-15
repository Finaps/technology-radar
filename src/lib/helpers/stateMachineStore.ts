import { machine as fsm } from 'cogwheel';
import type { MachineConfig, Event } from 'cogwheel/dist/types';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type O = {
    [key: string]: unknown;
};

type Store<T extends O> = {
    state: string;
    context: T;
};

export type MachineStore<T extends O> = {
    subscribe: Writable<Store<T>>['subscribe'];
    send(event: Event): void;
};

export function machineStore<T extends O>(config: MachineConfig<T>): MachineStore<T> {
    const machine = fsm(config);
    const store: Writable<Store<T>> = writable({ state: machine.current, context: machine.context });

    machine.listen(({ current, context }) => {
        store.update(() => ({ state: current, context }));
    });

    return { subscribe: store.subscribe, send: machine.send };
}
