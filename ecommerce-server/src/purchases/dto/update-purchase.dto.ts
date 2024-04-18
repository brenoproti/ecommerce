import { PartialType } from '@nestjs/mapped-types';
import { PurchaseDto } from './purchase.dto';

export class UpdatePurchaseDto extends PartialType(PurchaseDto) {}
