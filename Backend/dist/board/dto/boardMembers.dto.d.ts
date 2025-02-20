import { Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';
export declare class CreateBoardMembers {
    boardId: Types.ObjectId;
    userId: Types.ObjectId;
    role: InvitePermission;
}
