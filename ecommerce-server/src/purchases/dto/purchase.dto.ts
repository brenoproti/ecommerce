import { IsNotEmpty } from 'class-validator';
import { PurchaseItemDto } from '../../purchase-items/dto/purchase-item.dto';

export class PurchaseDto {
  @IsNotEmpty()
  items: PurchaseItemDto[];
}
