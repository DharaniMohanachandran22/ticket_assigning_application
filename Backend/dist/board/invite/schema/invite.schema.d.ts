import { HydratedDocument, Types } from 'mongoose';
export declare enum InviteStatus {
    ACTIVE = "Active",
    DELETED = "Deleted",
    EXPIRED = "Expired"
}
export declare enum InvitePermission {
    ADMIN = "Admin",
    MEMBER = "Member",
    OBSERVER = "Observer"
}
export declare class Invite {
    boardId: Types.ObjectId;
    inviteToken: string;
    expireAt: Date;
    createdBy: Types.ObjectId;
    status: InviteStatus;
    permission: InvitePermission;
}
export type InviteDocument = HydratedDocument<Invite>;
export declare const InviteLinkSchema: import("mongoose").Schema<Invite, import("mongoose").Model<Invite, any, any, any, import("mongoose").Document<unknown, any, Invite> & Invite & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invite, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Invite>> & import("mongoose").FlatRecord<Invite> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
