import { HydratedDocument, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum BoardVisiblity {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COMMERCIAL = 'comercial',
}

@Schema({
  timestamps: true,
})
export class Board {
  @Prop({ required: true })
  boardName: string;

  @Prop({ enum: BoardVisiblity, default: BoardVisiblity.PUBLIC })
  visiblity: BoardVisiblity;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdByUser: Types.ObjectId;
}

export type BoardDocument = HydratedDocument<Board>;

export const BoardSchema = SchemaFactory.createForClass(Board);
