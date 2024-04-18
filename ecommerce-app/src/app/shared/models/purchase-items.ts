
import {ItemTypeEnum} from "../enums/item-type.enum";

export interface PurchaseItems {
    type: ItemTypeEnum,
    productId?: number,
    serviceId?: number,
    comboId?: number,
    quantity?: number
}
