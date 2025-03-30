import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Room } from './room.entity';
import { Reaction } from './reaction.entity';
import { User } from './user.entity';
import { IMessageType } from 'src/interfaces/IMessageType';
import { MessageBaseColumn } from './base.entity';

@Entity()
export class Message extends MessageBaseColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  senderId: number;

  @Column()
  type: IMessageType

  @ManyToOne(() => Room, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  @Index() // 
  room: Room;

  // 🔥 Index for quick filtering by sender
  @Index()
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  sender: User;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[];

}
