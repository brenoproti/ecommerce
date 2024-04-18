import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {PagesComponent} from "./pages/pages.component";
import {PagesRoutes} from "./pages/pages.routes";
import {RegisterComponent} from "./auth/register/register.component";

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: PagesRoutes
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'criar-conta',
        component: RegisterComponent
    },
];
