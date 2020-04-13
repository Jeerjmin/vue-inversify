<template>
    <div id="app">
        <router-view/>
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Inject } from 'inversify-props';
import { Notification } from 'element-ui';
import ApiService, { ApiServiceS } from '@/services/api/api.service';
import NotifyService, { NotifyServiceS } from '@/services/notify.service';
import AuthService, { AuthServiceS } from '@/services/auth.service';
import ErrorException from '@/services/exceptions/error.exception';
import ExceptionHandler, { ExceptionHandlerS } from '@/services/exceptions/exception-handler.service';

@Component
export default class App extends Vue {
    @Inject(ApiServiceS) private apiService!: ApiService;
    @Inject(NotifyServiceS) private notifyService!: NotifyService;
    @Inject(AuthServiceS) private authService!: AuthService;
    @Inject(ExceptionHandlerS) private exceptionHandler!: ExceptionHandler;

    /**
     * Here we will connect services with vue features
     */
    created() {
        this.apiService.setRequestInterceptor(config => {
            this.$Progress.start();
            return config;
        });
        this.apiService.setResponseInterceptor(response => {
            this.$Progress.finish();
            return response;
        });

        this.notifyService.init({
            errorNotification: () => {
                Notification({
                    title: 'ERROR',
                    message: '',
                    type: 'error',
                    showClose: false,
                    customClass: 'custom-notification error',
                });
            },
            infoNotification: () => {
                Notification({
                    title: 'INFO',
                    message: '',
                    type: 'info',
                    showClose: false,
                    customClass: 'custom-notification info',
                });
            },
            successNotification: () => {
                Notification({
                    title: 'SUCCESS',
                    message: '',
                    type: 'success',
                    showClose: false,
                    customClass: 'custom-notification success',
                });
            },
            warningNotification: () => {
                Notification({
                    title: 'WARNING',
                    message: '',
                    type: 'warning',
                    showClose: false,
                    customClass: 'custom-notification warning',
                });
            },
        });
    }

    errorCaptured(error: Error, vm: Vue, info: string): boolean | void {
        if (error instanceof ErrorException) {
            this.exceptionHandler.catch(error);
        }
        return true;
    }
}
</script>

<style lang="scss">
    @import "assets/scss/app.scss";

    .custom-notification {
        position: absolute;
        width: 104px;
        height: 38px;
        padding: 0;

        border: 2px solid;
        box-sizing: border-box;
        border-radius: 25px;

        &.error {
            border-color: #E7472D;
            color: #E7472D;
        }
        &.warning {
            border-color: #F68121;
            color: #F68121;
        }
        &.success {
            border-color: #01B875;
            color: #01B875;
        }
        &.info {
            border-color: #52A9FF;
            color: #52A9FF;
        }

        .el-notification__group {
            margin: 0;
            width: 100%;

            .el-notification__title {
                font-family: Lato,serif;
                font-style: normal;
                font-weight: bold;
                font-size: 14px;
                color: inherit;

                line-height: 34px;
                text-align: center;
                vertical-align: middle;
                letter-spacing: 0.2px;
                text-transform: uppercase;
            }
        }

        .el-notification__icon, .el-notification__content {
            display: none;
        }
    }
</style>
