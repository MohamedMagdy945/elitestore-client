import { Routes } from '@angular/router';
import { AdminLayout} from './core/layouts/admin-layout/admin-layout';
import { UserLayout } from './core/layouts/user-layout/user-layout';
import { Home } from './features/user/home/home';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
                    
export const routes: Routes = [
    {
        path: '',
        component: UserLayout,
        children: [
            {
                path: '',
                component: Home,
            },
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            },

        ]
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            {
            path: '',
            loadComponent: () =>
                import('./features/admin/dashboard/dashboard')
                .then(m => m.Dashboard)
            }
        ]
    }
];
