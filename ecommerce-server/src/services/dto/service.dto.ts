import { IsNotEmpty } from "class-validator";

export class ServiceDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    price: number;
    id?: number;
}
