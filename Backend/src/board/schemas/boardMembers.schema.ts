import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';

@Schema({
  timestamps: true,
})
export class BoardMemebers {
  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: InvitePermission, required: true })
  role: InvitePermission;
}

export type BoardmembersDocument = HydratedDocument<BoardMemebers>;

export const BoardMembersSchema = SchemaFactory.createForClass(BoardMemebers);
