import {Routes} from "@angular/router";
import {canActivateRoute} from "../core/auth-guard.service";

export const PagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'combos',
        pathMatch: 'full'
    },
    {
        path: 'produtos',
        loadComponent: () => import("./products/products.component").then(c => c.ProductsComponent),
    },
    {
        path: 'servicos',
        loadComponent: () => import("./services/services.component").then(c => c.ServicesComponent),
    },
    {
        path: 'combos',
        loadComponent: () => import("./combos/combos.component").then(c => c.CombosComponent),
    },
    {
        path: 'comprar',
        loadComponent: () => import("./checkout/checkout.component").then(c => c.CheckoutComponent),
        canActivate: [canActivateRoute]
    },
]
