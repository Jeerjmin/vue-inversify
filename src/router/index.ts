import VueRouter from 'vue-router';
import initRoutes from '@/router/routes';

export default function initRouter() {
    return new VueRouter({
        mode: 'history',
        routes: initRoutes(),
    });
}
