import {Injectable} from '@angular/core';
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class ZipCodeService {

    constructor() {
    }

    async findAddress(zipCode: string): Promise<any> {
        const url = `https://viacep.com.br/ws/${zipCode}/json/`;

        return axios.get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return null;
            });
    }
}
