import {Address} from "./address";

export interface User {
    id?: number;
    name?: string;
    document?: string;
    age?: number;
    password?: number;
    address?: Address
}
