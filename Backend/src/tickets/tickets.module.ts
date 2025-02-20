import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Ticket, TicketSchema } from './schemas/ticket.schma';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/schemas/user.schmas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
