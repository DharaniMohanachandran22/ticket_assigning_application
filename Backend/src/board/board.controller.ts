import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/board.dto';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get('list')
  async getAllBoard(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get('list:id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Put('update:id')
  async updateBoard(
    @Param('id') id: string,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return this.boardService.update(id, createBoardDto);
  }

  @Delete('remove:id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardService.remove(id);
  }
}
