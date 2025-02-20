import { Schema, Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schmas';

export const CommentSchema = new Schema(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export class Comment extends Document {
  ticketId: string;
  comment: string;
  user: User; // Reference to User
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
}
