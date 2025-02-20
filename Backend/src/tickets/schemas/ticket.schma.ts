import { Schema, Document, HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schmas';

enum TicketStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export const TicketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  filePaths: [{ type: String }], // Store the file path
  assignee: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  projectTitle: { type: String, required: true },
  status: {
    type: String,
    enum: [TicketStatus],
    default: 'to-do',
  },
});

export class Ticket extends Document {
  title: string;
  description: string;
  filePaths: string[];
  assignee: User;
  projectTitle: string;
  status: string;
}

export type TicketDocument = HydratedDocument<Ticket>;
