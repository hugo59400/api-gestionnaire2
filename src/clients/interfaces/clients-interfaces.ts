import { Application } from "src/applications/entities/application.entity";
import { IBaseEntity } from "src/utils/interfaces/base-entity.interface";

export interface ClientInterface extends IBaseEntity {
  nom: string;
  prenom?: string;
  applications?: Application[];

}
