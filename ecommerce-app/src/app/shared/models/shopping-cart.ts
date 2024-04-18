import {Service} from "./service";
import {Combo} from "./combo";
import {Product} from "./product";

export interface ShoppingCart {
    combos: Combo[];
    services: Service[]
    products: Product[]
}
