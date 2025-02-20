import { HydratedDocument, Types } from 'mongoose';
export declare enum BoardVisiblity {
    PUBLIC = "public",
    PRIVATE = "private",
    COMMERCIAL = "comercial"
}
export declare class Board {
    boardName: string;
    visiblity: BoardVisiblity;
    createdByUser: Types.ObjectId;
}
export type BoardDocument = HydratedDocument<Board>;
export declare const BoardSchema: import("mongoose").Schema<Board, import("mongoose").Model<Board, any, any, any, import("mongoose").Document<unknown, any, Board> & Board & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Board, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Board>> & import("mongoose").FlatRecord<Board> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
