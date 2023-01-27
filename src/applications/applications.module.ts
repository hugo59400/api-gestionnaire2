import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
  HttpModule,
    TypeOrmModule.forFeature([
      Application
    ]),
    ClientsModule
]
,
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule { }
