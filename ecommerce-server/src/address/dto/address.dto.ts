import { UF } from '../../common/constants/uf.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  zipCode: string;
  @IsNotEmpty()
  neighborhood: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  @IsEnum(UF)
  state: UF;
}
