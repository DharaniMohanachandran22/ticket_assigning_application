import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';

export enum ReqStatus {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  PENDING = 'Pending',
}

@Schema({
  timestamps: true,
})
export class JoinReq {
  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: InvitePermission, required: true })
  roleRequested: InvitePermission;

  @Prop({ enum: ReqStatus, required: true, default: ReqStatus.PENDING })
  status?: ReqStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sendBy: Types.ObjectId;

  @Prop({ required: true })
  inviteToken: string;
}

export type JoinReqDocument = HydratedDocument<JoinReq>;

export const JoinReqSchema = SchemaFactory.createForClass(JoinReq);
