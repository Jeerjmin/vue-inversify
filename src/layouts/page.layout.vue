<template>
    <div class="layout">
        <Header />
        <div class="main">
            <Sidebar />
            <div class="page">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from '@/components/header.vue';
import Sidebar from '@/components/sidebar.vue';

@Component({
    components: { Header, Sidebar },
})
export default class PageLayout extends Vue {
}
</script>

<style scoped lang="scss" >
    .layout {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .main {
            display: flex;
            flex-direction: row;
            flex: 1;

            .menu {
                margin-top: -4px;
            }

            .page {
                width: calc(100% - 60px);
                background: #F5F6F7;
            }
        }
    }
</style>
