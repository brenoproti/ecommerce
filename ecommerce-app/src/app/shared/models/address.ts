import {UfEnum} from "../enums/uf.enum";

export interface Address {
    zipCode?: string;
    neighborhood?: string;
    city?: string;
    state?: UfEnum;
}
