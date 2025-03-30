import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepo: Repository<Room>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createRoom(dto: { name: string; ownerId: number,usernames:string[] }) {
    const {name, ownerId,usernames} = dto;
    const users = await this.userRepo.find({
      where: { username: In([ownerId, ...(usernames || [])])  },
    });
    console.log("🚀 ~ RoomsService ~ createRoom ~ users:", users)
    
    if (users.length === 0) {
      throw new Error("No valid users found.");
    }
    const owner = users.find(user => user.id === ownerId);
    const members = users.filter(user => user.id !== ownerId);
    const newRoom = this.roomRepo.create({ name, members, owner });
    return await this.roomRepo.save(newRoom);
  }

  async getRooms() {
    return await this.roomRepo.find();
  }

  async getRoomDetail(id: number) {
    return await this.roomRepo.findOne({
      where: { id },
      relations: ['messages'],
    });
  }
}
