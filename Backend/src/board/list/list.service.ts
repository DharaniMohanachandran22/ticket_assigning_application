import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(List.name) private readonly ListModel: Model<ListDocument>,
  ) {}

  //create list
  async create(createListDto: CreateListDto): Promise<List> {
    const createList = new this.ListModel(createListDto);
    return createList.save();
  }

  //get all list
  async findAll(): Promise<List[]> {
    return this.ListModel.find().exec();
  }

  //get list by Id
  async findOne(id: string): Promise<List> {
    const list = await this.ListModel.findById(id).exec();
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  //update list
  async update(id: string, createBoardDto: CreateListDto): Promise<List> {
    const list = await this.ListModel.findByIdAndUpdate(
      id,
      createBoardDto,
    ).exec();
    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
    return list;
  }

  //Delete list
  async remove(id: string): Promise<void> {
    const list = await this.ListModel.deleteOne({ _id: id }).exec();
    if (list.deletedCount === 0) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }
}
