import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


// import {IsEmail, IsEmpty, IsNotEmpty, Length} from 'class-validator';
import { Application } from 'src/applications/entities/application.entity';
import { ClientInterface } from '../interfaces/clients-interfaces';

@Entity()
export class Client extends BaseEntity implements ClientInterface {


  @PrimaryGeneratedColumn()
  id: number;


  @Column({unique:true})
  nom: string;

  @Column()
  prenom: string;


  @OneToMany(() => Application, (application) => application.client)
  applications: Application[];


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;


}