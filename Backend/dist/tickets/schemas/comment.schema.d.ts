import { Schema, Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schmas';
export declare const CommentSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    ticketId: import("mongoose").Types.ObjectId;
    user: import("mongoose").Types.ObjectId;
    edited: boolean;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    ticketId: import("mongoose").Types.ObjectId;
    user: import("mongoose").Types.ObjectId;
    edited: boolean;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    comment: string;
    ticketId: import("mongoose").Types.ObjectId;
    user: import("mongoose").Types.ObjectId;
    edited: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Comment extends Document {
    ticketId: string;
    comment: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    edited: boolean;
}
