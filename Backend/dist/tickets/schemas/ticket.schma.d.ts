import { Schema, Document, HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schmas';
declare enum TicketStatus {
    TODO = "to-do",
    IN_PROGRESS = "inProgress",
    DONE = "done"
}
export declare const TicketSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    title: string;
    description: string;
    projectTitle: string;
    assignee: import("mongoose").Types.ObjectId;
    filePaths: string[];
    status: typeof TicketStatus;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    title: string;
    description: string;
    projectTitle: string;
    assignee: import("mongoose").Types.ObjectId;
    filePaths: string[];
    status: typeof TicketStatus;
}>> & import("mongoose").FlatRecord<{
    title: string;
    description: string;
    projectTitle: string;
    assignee: import("mongoose").Types.ObjectId;
    filePaths: string[];
    status: typeof TicketStatus;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Ticket extends Document {
    title: string;
    description: string;
    filePaths: string[];
    assignee: User;
    projectTitle: string;
    status: string;
}
export type TicketDocument = HydratedDocument<Ticket>;
export {};
