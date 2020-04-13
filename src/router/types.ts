// eslint-disable-next-line import/extensions,import/no-unresolved
import { RawLocation } from 'vue-router/types';

export interface IGuard {
    canActivate: () => Promise<CanActivateReturn>
}

export type CanActivateReturn = string | true;

export type NextFunction = (to?: RawLocation | false | void) => void;
