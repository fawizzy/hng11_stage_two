import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import type { organisation } from "./Organisation";
@Entity("user")
export class user {
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

  @ManyToMany("organisation", "user")
  @JoinTable()
  organisation: organisation[];
}
