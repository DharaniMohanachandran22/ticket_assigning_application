import { IsEnum, IsMongoId, IsNotEmpty, IsUUID } from 'class-validator';
import { Types } from 'mongoose';
import { ReqStatus } from '../schemas/joinReq.schema';
import { InvitePermission } from '../invite/schema/invite.schema';

export class CreateJoinRedDto {
  @IsNotEmpty()
  @IsMongoId()
  boardId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(InvitePermission)
  roleRequested: InvitePermission;

  @IsNotEmpty()
  @IsEnum(ReqStatus)
  status: ReqStatus;

  @IsMongoId()
  @IsNotEmpty()
  sendBy: Types.ObjectId;

  @IsUUID()
  @IsNotEmpty()
  inviteToken: string;
}
