import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpExceptionUtils } from 'src/utils/http/http-exception';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>){

}


 async create(createClientDto: CreateClientDto) {
// console.log(createClientDto);
    return this.clientRepository.insert(this.clientRepository.create(createClientDto)).catch((error) => {throw new HttpExceptionUtils(error)} )
  }




  findAll() {
    return   this.clientRepository.find();
  

  }
//ok 
findOne(id: number) {
    const client =  this.clientRepository.findOne({ where: { id } });
    if(!client) {
      const message = { 'message': 'Not Found'};
      throw new HttpException({ error: message }, HttpStatus.NOT_FOUND);
    }
    return client;
  }




 

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }
//ok
   remove(id: number) {
const client =  this.clientRepository.findOne( { where: { id } });
    if (!client) {
       throw new NotFoundException()
    }
    this.clientRepository.delete( { id: id });

     return {
        message:"Client "+ client + " supprimé ",
        
        
      };
   
  }





}
