import {
    Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import AuthModel from '@/store/models/auth.model';

@Module
export default class AuthStore extends VuexModule {
    auth: AuthModel = {
        token: null,
    };

    @Mutation
    setAuthAuthStore(auth: AuthModel): void {
        this.auth = auth;
    }
}
