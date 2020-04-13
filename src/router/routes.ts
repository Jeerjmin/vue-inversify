import { container } from 'inversify-props';
import setGuards from '@/router/guards/set-guards';
import AuthGuard, { AuthGuardS } from '@/router/guards/auth-guard';
import { Route } from 'vue-router';

export default function initRoutes() {
    return [
        {
            path: '/auth',
            component: () => import('@/pages/auth.page.vue'),
            props: (route: Route) => ({ token: route.query.token }),
        },
        {
            path: '/',
            component: () => import('@/layouts/page.layout.vue'),
            beforeEnter: setGuards([container.get<AuthGuard>(AuthGuardS)]),
            children: [
                {
                    path: '',
                    redirect: 'home',
                },
                {
                    path: '*',
                    component: () => import('@/pages/not-found.page.vue'),
                },
            ],
        },
    ];
}
