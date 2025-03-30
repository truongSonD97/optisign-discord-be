import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, Index } from 'typeorm';
import { Room } from './room.entity';
import { Message } from './message.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true }) // 🔥 Index for fast lookup
  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  // ✅ Relation to owned rooms
  @OneToMany(() => Room, (room) => room.owner)
  ownedRooms: Room[];

  // ✅ Relation to rooms where the user is a member
  @ManyToMany(() => Room, (room) => room.members)
  rooms: Room[];

  // ✅ Relation to messages sent by the user
  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
