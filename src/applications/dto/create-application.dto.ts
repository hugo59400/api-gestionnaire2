import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Client } from "src/clients/entities/client.entity";

export class CreateApplicationDto {

@IsNotEmpty()
 @IsString()
  nom: string;

@IsNotEmpty()
 @IsString()
  description: string;

@IsNotEmpty()
 @IsString()
  type_application: string;

@IsOptional()
@IsString()
download_url: string;

@IsNotEmpty()
 @IsString()
  version: string;

  @IsOptional()
    @Type(() => Client)
    client:Client;



}
