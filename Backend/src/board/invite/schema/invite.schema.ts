import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum InviteStatus {
  ACTIVE = 'Active',
  DELETED = 'Deleted',
  EXPIRED = 'Expired',
}

export enum InvitePermission {
  ADMIN = 'Admin',
  MEMBER = 'Member',
  OBSERVER = 'Observer',
}

@Schema({
  timestamps: true,
})
export class Invite {
  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: Types.ObjectId;

  @Prop()
  inviteToken: string;

  @Prop({ type: Date })
  expireAt: Date;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ enum: InviteStatus, default: InviteStatus.ACTIVE })
  status: InviteStatus;

  @Prop({ enum: InvitePermission, required: true })
  permission: InvitePermission;
}

export type InviteDocument = HydratedDocument<Invite>;

export const InviteLinkSchema = SchemaFactory.createForClass(Invite);
