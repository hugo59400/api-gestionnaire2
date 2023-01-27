import { Client } from "src/clients/entities/client.entity";
import { IBaseEntity } from "src/utils/interfaces/base-entity.interface";

export interface ApplicationInterface extends IBaseEntity {
  
  nom: string;
  description?: string;
  type_application?: string;
  download_url?: string;
  version?: string;
  client?: Client;
 
}
