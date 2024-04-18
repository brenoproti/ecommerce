import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../shared/models/product";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PageableUtils} from "../../shared/utils/pageable.utils";

@Injectable()
export class CombosService {
    baseUrl = 'combos';

    constructor(private http: HttpClient) {
    }

    getCombos(zipCode: string, pageable: any): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/${this.baseUrl}/${zipCode}${PageableUtils.getPageableUrlParams(pageable)}`);
    }
}
