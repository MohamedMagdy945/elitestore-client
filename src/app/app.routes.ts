import { Routes } from '@angular/router';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { UserLayout } from './core/layouts/user-layout/user-layout';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { Home } from './shared/home/home';
import { ShoppingCartComponent } from './features/basket/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './features/basket/checkout/checkout.component';
import { SuccessOrderComponent } from './features/basket/success-order/success-order.component';

export const routes: Routes = [
    {
        path: '',
        component: UserLayout,
        children: [
            {
                path: 'home',
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
            {
                path : 'basket',
                component : ShoppingCartComponent
            },
            {
                path: 'checkout',
                component: CheckoutComponent
            },
             {
                path: 'success-order',
                component: SuccessOrderComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'

            }

        ]
    },
    {
        path: 'admin',
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
                    import('./features/admin/user.component/user.component').then(m => m.UserComponent),
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
