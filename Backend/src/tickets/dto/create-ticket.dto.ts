import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  projectTitle: string;

  @IsNotEmpty()
  @IsMongoId()
  assignee: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filePaths?: string[];

  @IsNotEmpty()
  @IsString()
  status: string;
}
