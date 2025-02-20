import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { InviteService } from './invite.service';
import { Types } from 'mongoose';
import { ReqStatus } from '../schemas/joinReq.schema';
import { CreateInviteLinkDto } from './dto/invite.dto';

@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  // Create Invite Link
  @Post('create')
  async createInvite(
    @Body() createInviteLinkDto: CreateInviteLinkDto,
    @Body('boardId') boardId: string,
  ): Promise<{ url: string }> {
    const invite = await this.inviteService.createInviteLink(
      createInviteLinkDto,
      new Types.ObjectId(boardId),
    );
    return invite;
  }

  // Delete Invite
  @Delete(':id')
  async deleteInvite(@Param('id') id: string): Promise<void> {
    return this.inviteService.deleteInvite(id);
  }

  //join board
  @Post('join/:boardId/:accessToken')
  async joinBoard(
    @Param('boardId') boardId: string,
    @Param('accessToken') accessToken: string,
    @Body('userId') userId: string,
  ) {
    if (!boardId || !accessToken) {
      throw new NotFoundException(
        'Board ID, access token, and board name are required.',
      );
    }

    const message = await this.inviteService.joinBoard(
      accessToken,
      new Types.ObjectId(userId),
      new Types.ObjectId(boardId),
    );

    return { message };
  }

  //Admin accept the request
  @Patch('join-request/:joinReqId')
  async handleJoinRequest(
    @Param('joinReqId') joinReqId: Types.ObjectId,
    @Body('status') status: ReqStatus,
  ) {
    if (![ReqStatus.ACCEPTED, ReqStatus.REJECTED].includes(status)) {
      throw new NotFoundException('Invalid status.');
    }
    return this.inviteService.handleJoinRequest(joinReqId, status);
  }
}
