import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, ParseIntPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsInterface } from './interfaces/clients-controller.interface';

@Controller('clients')
export class ClientsController implements ClientsInterface {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
   create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number , @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

@HttpCode(204)
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }




}
