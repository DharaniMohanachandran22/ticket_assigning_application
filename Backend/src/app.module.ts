import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { TicketModule } from './tickets/tickets.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './board/list/list.module';
import { InviteModule } from './board/invite/invite.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    TicketModule,
    BoardModule,
    ListModule,
    InviteModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
