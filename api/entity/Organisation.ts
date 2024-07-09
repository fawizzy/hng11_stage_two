import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import type { user } from "./User";

@Entity("organisation")
export class organisation {
  @Column("uuid", { primary: true })
  orgId: string;

  @Column("text", { nullable: false })
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @ManyToMany("user", "organisation")
  users: user[];
}
