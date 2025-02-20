import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  Invite,
  InviteDocument,
  InvitePermission,
} from './schema/invite.schema';
import { CreateInviteLinkDto } from './dto/invite.dto';
import { Board, BoardDocument } from '../schemas/board.schema';
import { JoinReq, JoinReqDocument, ReqStatus } from '../schemas/joinReq.schema';
import {
  BoardmembersDocument,
  BoardMemebers,
} from '../schemas/boardMembers.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InviteService {
  constructor(
    @InjectModel(Invite.name)
    private readonly inviteLinkModel: Model<InviteDocument>,
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
    @InjectModel(JoinReq.name)
    private readonly joinReqModel: Model<JoinReqDocument>,
    @InjectModel(BoardMemebers.name)
    private readonly boardMembersModel: Model<BoardmembersDocument>,
    private readonly configService: ConfigService,
  ) {}

  // Create Invite Link
  async createInviteLink(
    createInviteLinkDto: CreateInviteLinkDto,
    boardId: Types.ObjectId,
  ): Promise<{ url: string }> {
    const baseUrl = this.configService.get<string>('BASE_URL');
    const inviteToken = uuidv4();

    const newInvite = new this.inviteLinkModel({
      ...createInviteLinkDto,
      inviteToken,
      expireAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    newInvite.save();
    return {
      url: `${baseUrl}/invite/join/${boardId}/${inviteToken}`,
    };
  }

  // Delete Invite
  async deleteInvite(id: string): Promise<void> {
    const result = await this.inviteLinkModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Invite with ID ${id} not found.`);
    }
  }

  //join board
  async joinBoard(
    inviteToken: string,
    userId: Types.ObjectId,
    boardId: Types.ObjectId,
  ): Promise<string> {
    const invite = await this.inviteLinkModel.findOne({ inviteToken }).exec();
    if (!invite) throw new NotFoundException('Invite not found');

    //token validation
    if (invite.expireAt && new Date(invite.expireAt) < new Date()) {
      throw new NotFoundException('The token is expried!!');
    }

    const existingMember = await this.boardMembersModel
      .findOne({ boardId, userId })
      .exec();
    if (existingMember)
      throw new NotFoundException('User is already exist in the board');

    const board = await this.boardModel.findById(boardId).exec();
    if (!board) throw new NotFoundException('Board not found');

    const isPublic = board.visiblity === 'public';

    const joinReq = new this.joinReqModel({
      boardId,
      userId,
      roleRequested: invite.permission,
      status: isPublic ? ReqStatus.ACCEPTED : ReqStatus.PENDING,
      sendBy: invite.createdBy,
      inviteToken,
    });

    await joinReq.save();

    if (isPublic) {
      await this.addBoardMember(boardId, userId, invite.permission);
      return 'User successfully joined the public board!';
    } else {
      return 'User request sent. Waiting for admin approval.';
    }
  }

  async handleJoinRequest(
    joinReqId: Types.ObjectId,
    status: ReqStatus,
  ): Promise<string> {
    const joinReq = await this.joinReqModel.findById(joinReqId).exec();
    if (!joinReq) throw new NotFoundException('Join request not found');

    if (joinReq.status !== ReqStatus.PENDING) {
      throw new NotFoundException('Request is already processed.');
    }

    joinReq.status = status;
    await joinReq.save();

    if (status === ReqStatus.ACCEPTED) {
      await this.addBoardMember(
        joinReq.boardId,
        joinReq.userId,
        joinReq.roleRequested,
      );
      return 'User successfully joined the private board!';
    }

    return 'Join request rejected.';
  }

  private async addBoardMember(
    boardId: Types.ObjectId,
    userId: Types.ObjectId,
    role: InvitePermission,
  ) {
    const boardMember = new this.boardMembersModel({
      boardId,
      userId,
      role,
    });

    await boardMember.save();
  }
}
