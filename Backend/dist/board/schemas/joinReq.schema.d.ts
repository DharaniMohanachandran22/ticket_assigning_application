import { HydratedDocument, Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';
export declare enum ReqStatus {
    ACCEPTED = "Accepted",
    REJECTED = "Rejected",
    PENDING = "Pending"
}
export declare class JoinReq {
    boardId: Types.ObjectId;
    userId: Types.ObjectId;
    roleRequested: InvitePermission;
    status?: ReqStatus;
    sendBy: Types.ObjectId;
    inviteToken: string;
}
export type JoinReqDocument = HydratedDocument<JoinReq>;
export declare const JoinReqSchema: import("mongoose").Schema<JoinReq, import("mongoose").Model<JoinReq, any, any, any, import("mongoose").Document<unknown, any, JoinReq> & JoinReq & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, JoinReq, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<JoinReq>> & import("mongoose").FlatRecord<JoinReq> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
