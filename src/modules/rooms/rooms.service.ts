import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}

  async createRoom(dto: { name: string; ownerId: number }) {
    const room = this.roomRepo.create(dto);
    return await this.roomRepo.save(room);
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
