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

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  phone: string;

  @ManyToMany(() => Organisation, (organisation) => organisation.users)
  @JoinTable()
  organisation: Organisation[];
}
