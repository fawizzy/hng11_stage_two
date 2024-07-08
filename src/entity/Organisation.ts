import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Organisation {
  @Column("uuid", { primary: true })
  orgId: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @ManyToMany(() => User, (user) => user.organisation)
  users: User[];
}
