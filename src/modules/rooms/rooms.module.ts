import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "src/entities/room.entity";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { User } from "src/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Room, User])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}