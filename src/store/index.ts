import Vue from 'vue';
import Vuex from 'vuex';
import UserStore from '@/store/user/user.store';
import AuthStore from '@/store/auth/auth.store';

Vue.use(Vuex);

let store;
export default store = new Vuex.Store({
    modules: {
        UserStore,
        AuthStore,
    },
    strict: true,
});
