import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDto {

@IsNotEmpty()
 @IsString()
  nom: string;

@IsOptional()
 @IsString()
  prenom: string;





}
