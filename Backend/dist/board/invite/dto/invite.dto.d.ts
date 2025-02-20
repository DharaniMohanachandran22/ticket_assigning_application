import { Types } from 'mongoose';
import { InvitePermission } from '../schema/invite.schema';
export declare class CreateInviteLinkDto {
    boardId: Types.ObjectId;
    createdBy: Types.ObjectId;
    permission: InvitePermission;
}
