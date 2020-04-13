import { Store } from 'vuex';

export const StoreS = Symbol.for('StoreS');
export type StoreType = Store<any>;
export const StoreType = undefined; // need to remove warnings while building https://stackoverflow.com/questions/52258061/export-not-found-on-module

export interface WatchableStore {
    watch(types: string[], func: () => void): void;
}
