import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 🔥 Indexing the owner for faster queries when fetching user-owned rooms
  @Index()
  @ManyToOne(() => User, (user) => user.ownedRooms, { onDelete: 'CASCADE' })
  owner: User;

  // 🔥 Many-to-Many relation with Users for room members
  @ManyToMany(() => User, (user) => user.rooms, { cascade: true })
  @JoinTable() // Creates a join table `room_members`
  members: User[];

  // 🔥 One-to-Many relation with Messages
  @OneToMany(() => Message, (message) => message.room, { cascade: true })
  messages: Message[];
}
