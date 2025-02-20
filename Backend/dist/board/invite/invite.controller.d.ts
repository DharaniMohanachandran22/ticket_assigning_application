import { InviteService } from './invite.service';
import { Types } from 'mongoose';
import { ReqStatus } from '../schemas/joinReq.schema';
import { CreateInviteLinkDto } from './dto/invite.dto';
export declare class InviteController {
    private readonly inviteService;
    constructor(inviteService: InviteService);
    createInvite(createInviteLinkDto: CreateInviteLinkDto, boardId: string): Promise<{
        url: string;
    }>;
    deleteInvite(id: string): Promise<void>;
    joinBoard(boardId: string, accessToken: string, userId: string): Promise<{
        message: string;
    }>;
    handleJoinRequest(joinReqId: Types.ObjectId, status: ReqStatus): Promise<string>;
}
