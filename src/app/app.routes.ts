import { Routes } from '@angular/router';
import { AdminLayout} from './core/layouts/admin-layout/admin-layout';
import { UserLayout } from './core/layouts/user-layout/user-layout';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Home } from './shared/home/home';
                    
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
       path: '',
        loadComponent: () =>
        import('./core/layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
        canActivate: [], 
        children: [
            {
                path: 'content',
                loadComponent: () =>
                    import('./features/admin/content/content').then(m => m.Content),
                title: 'Content Dashboard',
                canActivate: [],
            },
            {
                path: 'user',
                loadComponent: () =>
                    import('./features/admin/user/user').then(m => m.User),
                title: 'Users Dashboard',
                canActivate: [],
                
            },
             {
                path: 'product',
                loadComponent: () =>
                    import('./features/admin/admin-product/admin-product').then(m => m.AdminProduct),
                title: 'Products Dashboard',
                canActivate: [],   
            },
        ]
    }
];
