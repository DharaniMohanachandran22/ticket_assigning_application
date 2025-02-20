import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteLinkSchema } from './schema/invite.schema';
import { Board, BoardSchema } from '../schemas/board.schema';
import {
  BoardMembersSchema,
  BoardMemebers,
} from '../schemas/boardMembers.schema';
import { JoinReq, JoinReqSchema } from '../schemas/joinReq.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invite.name,
        schema: InviteLinkSchema,
      },
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: BoardMemebers.name,
        schema: BoardMembersSchema,
      },
      {
        name: JoinReq.name,
        schema: JoinReqSchema,
      },
    ]),
  ],
  providers: [InviteService],
  controllers: [InviteController],
})
export class InviteModule {}
