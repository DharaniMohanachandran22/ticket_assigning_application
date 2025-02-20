import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Board, BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<BoardDocument>,
  ) {}

  //create new board
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createBoard = new this.boardModel(createBoardDto);
    return createBoard.save();
  }

  //get all boards
  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  //get board by id
  async findOne(id: string): Promise<Board> {
    const board = await this.boardModel.findById(id).exec();
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  //Update a board by ID
  async update(id: string, createBoardDto: CreateBoardDto): Promise<Board> {
    const board = await this.boardModel
      .findByIdAndUpdate(id, createBoardDto)
      .exec();
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  //Delete a board by ID
  async remove(id: string): Promise<void> {
    const result = await this.boardModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
