import 'reflect-metadata';
import 'es6-shim';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
// @ts-ignore
import ElementLocale from 'element-ui/lib/locale';
import VueRouter from 'vue-router';
import VueProgressBar from 'vue-progressbar';
import { bootstrapContainer, loadAsyncModules } from '@/app.container';
import App from './app.vue';
import './registerServiceWorker';
import initRouter from './router';
import messages from './languages';

class AppBootstrap {
    async init() {
        await this.loadDependencyContainer();
        this.configApp();
        this.loadVueApp();
    }

    private async loadDependencyContainer() {
        bootstrapContainer();
        await loadAsyncModules();
    }

    private configApp(): void {
        /**
         * Here is no Vue.use(Vuex) cause Vuex is workable only with the Vue instance.
         * Vuex depends largely on Vue for its reactivity inner workings.
         */
        Vue.config.productionTip = false;
        Vue.use(VueRouter);
        Vue.use(VueI18n);
        Vue.use(VueProgressBar, {
            color: '#A1A2FF', // TODO get these colors from scss
            failedColor: 'red',
            height: '5px',
        });
        ElementLocale.use(messages.en);
    }

    private loadVueApp(): void {
        new Vue({
            router: initRouter(),
            i18n: new VueI18n({ locale: 'en', messages }),
            render: h => h(App),
        }).$mount('#app');
    }
}

(async () => {
    const app = new AppBootstrap();
    await app.init();
})();
