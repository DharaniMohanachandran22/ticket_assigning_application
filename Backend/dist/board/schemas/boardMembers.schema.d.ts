import { HydratedDocument, Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';
export declare class BoardMemebers {
    boardId: Types.ObjectId;
    userId: Types.ObjectId;
    role: InvitePermission;
}
export type BoardmembersDocument = HydratedDocument<BoardMemebers>;
export declare const BoardMembersSchema: import("mongoose").Schema<BoardMemebers, import("mongoose").Model<BoardMemebers, any, any, any, import("mongoose").Document<unknown, any, BoardMemebers> & BoardMemebers & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BoardMemebers, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BoardMemebers>> & import("mongoose").FlatRecord<BoardMemebers> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
