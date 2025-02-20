import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty()
  @IsString()
  listName: string;

  @IsMongoId()
  @IsNotEmpty()
  boardId: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
