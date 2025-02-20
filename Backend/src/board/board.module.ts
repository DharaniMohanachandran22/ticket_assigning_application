import { Module } from '@nestjs/common';
import { InviteController } from './invite/invite.controller';
import { InviteModule } from './invite/invite.module';
import { ListService } from './list/list.service';
import { ListModule } from './list/list.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from './schemas/board.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { List, ListSchema } from './list/schema/list.schema';
import { Invite, InviteLinkSchema } from './invite/schema/invite.schema';
import { InviteService } from './invite/invite.service';
import { JoinReq, JoinReqSchema } from './schemas/joinReq.schema';
import {
  BoardMembersSchema,
  BoardMemebers,
} from './schemas/boardMembers.schema';

@Module({
  imports: [
    InviteModule,
    ListModule,
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: List.name,
        schema: ListSchema,
      },
      {
        name: Invite.name,
        schema: InviteLinkSchema,
      },
      {
        name: JoinReq.name,
        schema: JoinReqSchema,
      },
      {
        name: BoardMemebers.name,
        schema: BoardMembersSchema,
      },
    ]),
  ],
  controllers: [InviteController, BoardController],
  providers: [ListService, BoardService, InviteService],
})
export class BoardModule {}
