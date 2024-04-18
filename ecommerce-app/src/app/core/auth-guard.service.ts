import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class AuthGuardService {
    constructor(public router: Router, public auth: AuthService) { }
    canActivate(): Observable<boolean> {
        return this.auth.isLoggedIn().pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']).then(null, null);
                    return false;
                }
                return true;
            })
        );
    }
}

export const canActivateRoute: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuardService).canActivate();
};
