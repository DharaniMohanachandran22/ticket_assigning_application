import { HydratedDocument, Types } from 'mongoose';
export declare class List {
    listName: string;
    boardId: Types.ObjectId;
    position: number;
}
export type ListDocument = HydratedDocument<List>;
export declare const ListSchema: import("mongoose").Schema<List, import("mongoose").Model<List, any, any, any, import("mongoose").Document<unknown, any, List> & List & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, List, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<List>> & import("mongoose").FlatRecord<List> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
