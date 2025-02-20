import { Types } from 'mongoose';
import { ReqStatus } from '../schemas/joinReq.schema';
import { InvitePermission } from '../invite/schema/invite.schema';
export declare class CreateJoinRedDto {
    boardId: Types.ObjectId;
    userId: Types.ObjectId;
    roleRequested: InvitePermission;
    status: ReqStatus;
    sendBy: Types.ObjectId;
    inviteToken: string;
}
