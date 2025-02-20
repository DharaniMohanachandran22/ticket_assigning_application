import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BoardVisiblity } from '../schemas/board.schema';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  boardName: string;

  @IsEnum(BoardVisiblity)
  visiblity: BoardVisiblity;

  @IsMongoId()
  @IsNotEmpty()
  createdByUser: string;
}
