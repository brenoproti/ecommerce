import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PageableUtils} from "../../shared/utils/pageable.utils";

@Injectable()
export class ProductsService {
    baseUrl = 'products';

    constructor(private http: HttpClient) {
    }

    getProducts(pageable: any): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/${this.baseUrl}${PageableUtils.getPageableUrlParams(pageable)}`);
    }
}
