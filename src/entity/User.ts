import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Organisation } from "./Organisation";
@Entity()
export class User {
  @Column("uuid", { primary: true })
  userId: string;

  @Column("text", { nullable: false })
  firstName: string;

  @Column("text", { nullable: false })
  lastName: string;

  @Column("text", { unique: true, nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;

  @Column("text", { nullable: true })
  phone: string;

  @ManyToMany(() => Organisation, (organisation) => organisation.users)
  @JoinTable()
  organisation: Organisation[];
}
