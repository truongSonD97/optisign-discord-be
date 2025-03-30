import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
