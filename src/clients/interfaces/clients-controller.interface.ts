import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";

export interface ClientsInterface {
create(createClientDto: CreateClientDto): any;
findAll(): any;
findOne(id: number): any;
update(id: number, updateClientDto: UpdateClientDto): any;
remove(id: number): any;
}