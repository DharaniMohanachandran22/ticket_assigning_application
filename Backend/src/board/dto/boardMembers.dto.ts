import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { InvitePermission } from '../invite/schema/invite.schema';

export class CreateBoardMembers {
  @IsNotEmpty()
  @IsMongoId()
  boardId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsEnum(InvitePermission)
  @IsNotEmpty()
  role: InvitePermission;
}
