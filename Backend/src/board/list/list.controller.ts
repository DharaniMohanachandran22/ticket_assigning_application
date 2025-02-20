import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/list.dto';
import { List } from './schema/list.schema';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  async createList(@Body() createListDto: CreateListDto): Promise<List> {
    return this.listService.create(createListDto);
  }

  @Get('viewall')
  async getLits(): Promise<List[]> {
    return this.listService.findAll();
  }

  @Get('view')
  async getListById(@Param('id') id: string): Promise<List> {
    return this.listService.findOne(id);
  }

  @Put('update')
  async updateList(
    @Param('id') id: string,
    createListDto: CreateListDto,
  ): Promise<List> {
    return this.listService.update(id, createListDto);
  }

  @Delete('remove')
  async removeList(@Param('id') id: string): Promise<void> {
    return this.listService.remove(id);
  }
}
