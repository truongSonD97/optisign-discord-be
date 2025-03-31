import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database-config/database.config';
import authConfig from './config/auth-config/auth.config';
import appConfig from './config/app-config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AwsModule } from './modules/aws/aws.module';
import { ReactionModule } from './modules/reactions/reactions.module';


// <database-block>
const infrastructureDatabaseModule =  TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    });
// </database-block> 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    WebsocketModule,
    UsersModule,
    AuthModule,
    MessagesModule,
    RoomsModule,
    AwsModule, 
    ReactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
