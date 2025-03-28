import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthRegisterLoginDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(userDto:AuthRegisterLoginDto): Promise<User> {
    const user = this.userRepository.create({ username:userDto.username, password: userDto.password,name:userDto.name });
    return this.userRepository.save(user);
  }
}
