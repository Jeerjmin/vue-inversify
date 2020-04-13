import {
    Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import UserModel from '@/store/models/user.model';

@Module
export default class UserStore extends VuexModule {
    // TODO remove it after fix @serverError
    // user: UserModel | null = {
    //     email: 'email',
    //     firstName: 'firstName',
    //     hotelIds: [523353],
    //     id: 123,
    //     lastName: 'lastName',
    //     level: 'chain',
    //     token: 'token',
    // };
    user: UserModel | null = null;

    @Mutation
    setUserUserStore(user: UserModel): void {
        this.user = user;
    }
}
