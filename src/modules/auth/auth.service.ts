import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { AuthRegisterLoginDto } from '../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthRegisterLoginDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ username: dto.username, password: hash,name:dto.name });
    await this.userRepo.save(user);
    return { message: 'User created successfully' };
  }

  async login(dto: { username: string; password: string }) {
    const user = await this.userRepo.findOne({ where: { username: dto.username } });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    delete user.password
    return { access_token: this.jwtService.sign({ id: user.id, username: user.username,name:user.name }), user };
  }

  verifyToken = (token: string) => {
    try {
      const decode = this.jwtService.verify(token);
      return decode
    } catch (error) {
      throw error;
    }
  };

  async getMe(userId:number){
    return await this.userRepo.findOne({where:{id:userId}, select:["id","username","name"]})
  }
}
