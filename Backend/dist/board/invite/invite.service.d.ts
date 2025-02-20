import { Model, Types } from 'mongoose';
import { InviteDocument } from './schema/invite.schema';
import { CreateInviteLinkDto } from './dto/invite.dto';
import { BoardDocument } from '../schemas/board.schema';
import { JoinReqDocument, ReqStatus } from '../schemas/joinReq.schema';
import { BoardmembersDocument } from '../schemas/boardMembers.schema';
import { ConfigService } from '@nestjs/config';
export declare class InviteService {
    private readonly inviteLinkModel;
    private readonly boardModel;
    private readonly joinReqModel;
    private readonly boardMembersModel;
    private readonly configService;
    constructor(inviteLinkModel: Model<InviteDocument>, boardModel: Model<BoardDocument>, joinReqModel: Model<JoinReqDocument>, boardMembersModel: Model<BoardmembersDocument>, configService: ConfigService);
    createInviteLink(createInviteLinkDto: CreateInviteLinkDto, boardId: Types.ObjectId): Promise<{
        url: string;
    }>;
    deleteInvite(id: string): Promise<void>;
    joinBoard(inviteToken: string, userId: Types.ObjectId, boardId: Types.ObjectId): Promise<string>;
    handleJoinRequest(joinReqId: Types.ObjectId, status: ReqStatus): Promise<string>;
    private addBoardMember;
}
