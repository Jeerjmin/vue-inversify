declare module 'vue-progressbar' {
    import { PluginFunction } from 'vue';

    // eslint-disable-next-line import/prefer-default-export
    export const install: PluginFunction<{}>;

    interface ProgressMethods {
        start(): void;
        finish(): void;
        fail(): void;
    }

    module 'vue/types/vue' {
        interface Vue {
            $Progress: ProgressMethods;
        }
    }
}
