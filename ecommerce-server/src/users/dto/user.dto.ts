import { AddressDto } from '../../address/dto/address.dto';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @MaxLength(11)
  @MinLength(11)
  document: string;
  @IsNotEmpty()
  @Max(999)
  @Min(1)
  age: number;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  address: AddressDto;
}
