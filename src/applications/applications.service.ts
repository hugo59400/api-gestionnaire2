import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';
import * as request from 'request';
import * as fs from 'fs';
import { exec } from 'child_process';
import * as http from 'http';
import * as https from 'https';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
// import axios from 'axios';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly clientService: ClientsService,
    private readonly httpService: HttpService

  ) { }

  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    return this.applicationRepository.save(this.applicationRepository.create(createApplicationDto));
  }




  findAll() {
    return this.applicationRepository.find();

  }

  findOne(id: number) {
    const appli = this.applicationRepository.findOne({ where: { id }, relations: ["client"] });
    if (!appli) {
      throw new NotFoundException("Application not found")
    }
    return appli
  }


  // update(id: number, updateApplicationDto: UpdateApplicationDto) {
  //   return `This action updates a #${id} application`;
  // }


  // a check sur postman 
  async update(updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    const application = this.findOne(updateApplicationDto.id);
    const updatedApplication = await this.applicationRepository.save(this.applicationRepository.create(updateApplicationDto));
    return Object.assign(application, updatedApplication);
  }


  //ok
  remove(id: number) {
    const appli = this.applicationRepository.findOne({ where: { id } });
    if (!appli) {
      throw new NotFoundException()
    }
    this.applicationRepository.delete({ id: id });

  }


  //Une application peut être associée a un client
  async assignApplicationToClient(applicationId: number, clientId: number): Promise<any> {

    const application = await this.applicationRepository.findOne({ where: { id: applicationId } });
    //check
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    const client = await this.clientService.findOne(clientId);
    //check
    application.client = client;
    if (!application) {
      throw new NotFoundException('Client not found');
    }


    if (application != null && client != null) {

      await this.applicationRepository.save(application);
      return {
        message: "Client id = " + client.id + " is assigned to  application id = " + application.id
      };
    } else {
      return {
        message: "This client is not assigned to  application ",
        error: false
      }
    }
  }

  //On peut affecter une version particulière à un client
  async assignSpecificVersionToClient(applicationId: number, clientId: number, version: string): Promise<any> {
    const application = await this.applicationRepository.findOne({ where: { id: applicationId }, relations: ["client"] });

    //check 
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    const client = await this.clientService.findOne(clientId);
    //check 
    if (!client) {
      throw new NotFoundException('client  not found');
    }

    if (!version) {
      throw new NotFoundException('version  not fill ');
    }

    //  

    if (application.client.id !== client.id) {
      throw new ForbiddenException('This client is not assigned to this application');
    }

    if (application != null && client != null) {
      application.client = client;
      application.version = version;
      await this.applicationRepository.save(application);
      return {
        message: "Client id= " + client.id + " is assigned to  application id= " + application.id + " with version " + version
      };
    } else {
      return {
        message: "This client is not assigned to this application with version  "
      }
    }
  }


  //Seuls les clients affectés à l'application peuvent la télécharger

  async downloadApplication(@Param('applicationId') applicationId: number, @Param('clientId') clientId: number): Promise<any> {
    const application = await this.applicationRepository.findOne({ where: { id: applicationId }, relations: ["client"] });

    if (!application) {
      throw new NotFoundException('Application not found');
    }
    const client = await this.clientService.findOne(clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (application.client.id !== client.id) {
      throw new ForbiddenException('This client is not assigned to this application');
    } else {
      // code to download the application

      // request(application.download_url)
      //       .pipe(fs.createWriteStream(`${application.nom}.zip`))
      //       .on('close', () => console.log(`Application ${application.nom} has been downloaded.`));

      return {
        message: 'This client is assigned to this application',
        application: application,
        client: client
      };
    }

  }

  //methode dl : Proposer méthode de téléchargement (exemple : git , dl http, dl https)
  async downloadApplicationByMethode(@Param('applicationId') applicationId: number, @Param('clientId') clientId: number, @Query('method') method: string): Promise<any> {
    const application = await this.applicationRepository.findOne({ where: { id: applicationId }, relations: ["client"] });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    const client = await this.clientService.findOne(clientId);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    if (application.client.id !== client.id) {
      throw new ForbiddenException('This client is not assigned to this application');
    }
    if (method === 'git') {
      try {
        const specificFolder = 'C:\\Users\\h.coleau\\Documents\\dlProjet';
        //const specificFolder = process.env.SPECIFIC_FOLDER;

        if (application.download_url.includes('.git')) {
          if (!fs.existsSync(`${specificFolder}\\${application.nom}`)) {
            await exec(`git clone ${application.download_url} ${specificFolder}\\${application.nom}`);
            // console.log(`Application ${application.nom} has been downloaded using git in ${specificFolder}`);
            return {
              message: `Application ${application.nom} has been downloaded using git in ${specificFolder}`
            };
          } else {
            return {
              message: "Application " + application.nom + " already exists  in " + specificFolder
            };
          }
        } else {
          return {
            message: "the download_url field doesn't contain .git : application.download_url =  " + application.download_url

          };
        }
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }

    else if (method === 'http') {
      try {
        const specificFolder = 'C:\\Users\\h.coleau\\Documents\\dlProjet';

        // code to download application using http
        const file = fs.createWriteStream(`${specificFolder}\\${application.nom}`);

        lastValueFrom(this.httpService.get(application.download_url, { responseType: 'stream' })
        ).then(response => {
          response.data.pipe(file);
        });


      } catch (error) {
        throw new BadRequestException();
      }
    }
    else if (method === 'https') {
      try {
        const specificFolder = 'C:\\Users\\h.coleau\\Documents\\dlProjet';

        // code to download application using http
        const file = fs.createWriteStream(`${specificFolder}\\${application.nom}`);
        const request = https.get(application.download_url, function (response) {
          response.pipe(file);
          file.on('finish', function () {
            file.close();
            return {
              message: `Application ${application.nom} has been downloaded using https in ${specificFolder}`
            };
          });
        });
      } catch (error) {
       throw new BadRequestException();
      }
    }

    else {
      throw new BadRequestException('Invalid download method, method must be http , https or git ');
    }
  }





}
