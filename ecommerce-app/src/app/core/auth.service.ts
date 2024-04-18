import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    baseUrl = 'auth';

    private loggedIn = new BehaviorSubject<boolean>(false);

    @Output()
    userLoggedIn = new EventEmitter<boolean>();

    constructor(private http: HttpClient, private router: Router) {}

    loginUser(user: any): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/${this.baseUrl}/login`, user, {observe: 'response'}).pipe(
            tap(response => {
                if(response && response.status === 201){
                    const body = response.body;
                    this.storeToken(body.token);
                    localStorage.setItem("username", body.name);
                }
            })
        );
    }

    async logoutUser() {
        localStorage.removeItem('fp_token_jwt');
        this.loggedIn.next(false);
        this.userLoggedIn.emit(false);

        await this.router.navigate(['/']);
    }

    storeToken(token: string | null): void {
        if(token) {
            localStorage.setItem("fp_token_jwt", token);
            this.userLoggedIn.emit(true);
            this.loggedIn.next(true);
        }
    }

    getToken() {
        return localStorage.getItem('fp_token_jwt');
    }

    isLoggedIn(): Observable<boolean> {
        const token = this.getToken();
        if (token) {
            this.loggedIn.next(true);
        }
        return this.loggedIn.asObservable();
    }
}
