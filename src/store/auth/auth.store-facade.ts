import { Inject, injectable } from 'inversify-props';
import AuthModel from '@/store/models/auth.model';
import { StoreS, StoreType } from '@/store/types';

export const AuthStoreFacadeS = Symbol.for('AuthStoreFacadeS');
@injectable(AuthStoreFacadeS as unknown as string)
export default class AuthStoreFacade {
    @Inject(StoreS) private store!: StoreType;

    get auth(): AuthModel { return this.store.state.AuthStore.auth; }
    async saveAuthModel(auth: AuthModel) { this.store.commit('setAuthAuthStore', auth); }
}
