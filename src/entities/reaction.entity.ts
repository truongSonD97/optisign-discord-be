import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Reaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emoji: string;

  @Column()
  userId: number;

  @ManyToOne(() => Message, (message) => message.reactions)
  message: Message;
}
