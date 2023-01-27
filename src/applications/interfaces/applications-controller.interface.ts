import { CreateApplicationDto } from "../dto/create-application.dto";
import { UpdateApplicationDto } from "../dto/update-application.dto";
import { Application } from "../entities/application.entity";



export interface IApplicationsController {
create(createApplicationDto: CreateApplicationDto): Promise<Application>;
findAll(): Promise<Application[]>;
findOne(id: string): Promise<Application>;
update(updateApplicationDto: UpdateApplicationDto): Promise<Application>;
remove(id: number): Promise<void>;
assignApplicationToClient(applicationId: number, clientId: number): Promise<void>;
assignSpecificVersionToClient(applicationId: number, clientId: number, version: string): Promise<void>;
downloadApplication(applicationId: number, clientId: number): Promise<any>;
downloadApplicationByMethode(applicationId: number, clientId: number, method: string): Promise<void>;
}