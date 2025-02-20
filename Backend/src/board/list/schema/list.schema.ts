import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class List {
  @Prop({ required: true })
  listName: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  boardId: Types.ObjectId;

  @Prop({ required: true })
  position: number;
}

export type ListDocument = HydratedDocument<List>;

export const ListSchema = SchemaFactory.createForClass(List);
