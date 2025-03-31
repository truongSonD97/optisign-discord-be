import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reaction } from "src/entities/reaction.entity";
import { ReactionsController } from "./reactions.controller";
import { ReactionsService } from "./reactions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionsController],
  providers: [ReactionsService],
  exports: [ReactionsService],
})
export class ReactionModule {}