import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Room } from './room.entity';
import { Reaction } from './reaction.entity';
import { User } from './user.entity';
import { IMessageType } from 'src/interfaces/IMessageType';

@Entity()
export class Message {
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

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // ✅ No need to link back to user
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[];
}
