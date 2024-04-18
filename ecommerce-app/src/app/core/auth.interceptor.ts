import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from 'rxjs/operators';
import {AuthService} from "./auth.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, public router: Router) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (httpRequest.url.endsWith('/login-jwt') || httpRequest.url.endsWith('/document-validator')) {
            return next.handle(httpRequest);
        }

        let token = this.authService.getToken();
        return next.handle(httpRequest.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        })).pipe(
            tap({
                next: val => {},
                error: async err => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        await this.authService.logoutUser();
                    }
                }
            })
        )
    }
}
