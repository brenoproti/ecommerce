import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PageableUtils} from "../../shared/utils/pageable.utils";
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/models/user";

@Injectable()
export class RegisterService {
    baseUrl = 'users';

    constructor(private http: HttpClient) {
    }

    create(user: User): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/${this.baseUrl}`, user);
    }
}
