import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ParseIntPipe, HttpCode, HttpException, HttpStatus, ForbiddenException, UnauthorizedException, Query } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { IApplicationsController } from './interfaces/applications-controller.interface';

@Controller('applications')
export class ApplicationsController  {
  constructor(private readonly applicationsService: ApplicationsService,
    private readonly clientService: ClientsService
  ) {

  }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @Patch(':id')
  update(updateApplicationDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateApplicationDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applicationsService.remove(id);
  }

  //ok : {{url}}/applications/14/client/3 : assignApplicationToClient
  @Put('/:applicationId/client/:clientId')
  async assignApplicationToClient(@Param('applicationId') applicationId: number, @Param('clientId') clientId: number): Promise<void> {
    return await this.applicationsService.assignApplicationToClient(applicationId, clientId);
  }

  //test : {{url}}/applications/12/clients/9 
  //On peut affecter une version particulière à un client
  @Post('/:applicationId/clients/:clientId/')
  async assignSpecificVersionToClient(
    @Param('applicationId') applicationId: number,
    @Param('clientId') clientId: number,
   // @Param('version') version: string
  @Body('version') version: string
  ): Promise<void> {
    return await this.applicationsService.assignSpecificVersionToClient(applicationId, clientId, version);
  }




  // Seuls les clients affectés à l'application peuvent la télécharger
// url : {{url}}/applications/download/14/9

  @Post('/:applicationId/clients/:clientId/download') // ajouter 
  async downloadApplication(
    @Param('applicationId') applicationId: number,
    @Param('clientId') clientId: number,
  ): Promise<any> {
    return await this.applicationsService.downloadApplication(applicationId, clientId);
  }


  //Proposer méthode de téléchargement (exemple : git , dl http, dl https)
  @Post('/:applicationId/client/:clientId/download?')
  async downloadApplicationByMethode(@Param('applicationId') applicationId: number, @Param('clientId') clientId: number, @Query('method') method: string): Promise<void> {
    // votre code ici
    return await this.applicationsService.downloadApplicationByMethode(applicationId, clientId, method);
  }


}








