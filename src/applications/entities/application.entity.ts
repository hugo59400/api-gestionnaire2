import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


import { Client } from 'src/clients/entities/client.entity';
import { ApplicationInterface } from '../interfaces/applications.interface';

@Entity()
export class Application extends BaseEntity implements ApplicationInterface  {


@PrimaryGeneratedColumn()
  id: number;


 @Column()
  nom: string;

 @Column()
  description: string;

 @Column()
  type_application: string;

 @Column()
  download_url: string;

 @Column()
  version: string;


  @ManyToOne(type => Client, client => client.applications)
  client: Client;


 @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


}