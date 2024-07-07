import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Organisation {
  @Column("uuid", { primary: true })
  orgId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;
}
