import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PageableUtils} from "../../shared/utils/pageable.utils";

@Injectable()
export class ServicesService {
    baseUrl = 'services';

    constructor(private http: HttpClient) {
    }

    getServices(pageable: any): Observable<any> {
        return this.http.get<any>(`${environment.apiBaseUrl}/${this.baseUrl}${PageableUtils.getPageableUrlParams(pageable)}`);
    }
}
