import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 
    ),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('auth.secret',{infer:true}),
        secret: configService.get<string>('auth.secret'),
        signOptions: { algorithm: 'HS256', expiresIn: ms(configService.get<string>('auth.expires') as ms.StringValue)  },
      }),
    }),
    ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
