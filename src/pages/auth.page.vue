<template>
    <router-link :to="'/'">to home</router-link>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Inject } from 'inversify-props';
import AuthService, { AuthServiceS } from '@/services/auth.service';

@Component
export default class AuthPage extends Vue {
    @Inject(AuthServiceS) private authService!: AuthService;

    @Prop({ required: false })
    private token?: string;

    async mounted() {
        if (this.token) {
            await this.authService.authentication(this.token);
            this.$router.push('/');
        } else {
            window.location.href = this.authService.loginUrl;
        }
    }
}
</script>
