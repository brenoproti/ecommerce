import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Purchase} from "../../shared/models/purchase";

@Injectable()
export class CheckoutService {
    baseUrl = 'purchases';

    constructor(private http: HttpClient) {
    }

    save(purchase: Purchase): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/${this.baseUrl}`, purchase);
    }
}
