import { IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { InvitePermission } from '../schema/invite.schema';

export class CreateInviteLinkDto {
  @IsNotEmpty()
  @IsMongoId()
  boardId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: Types.ObjectId;

  @IsEnum(InvitePermission, {
    message: 'Permission must be Admin, Member, or Observer',
  })
  permission: InvitePermission;
}
