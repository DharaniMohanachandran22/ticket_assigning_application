import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TicketService } from './tickets.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // Get all tickets
  @Get('list')
  @UseGuards(AuthGuard)
  async getTickets() {
    return this.ticketService.getTickets();
  }

  @Get(':id/comments')
  async getCommentsForTicket(@Param('id') ticketId: string) {
    return this.ticketService.getCommentsForTicket(ticketId);
  }

  // Create a new ticket
  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    return this.ticketService.createTicket(createTicketDto, files?.files || []);
  }

  // Create a new comment
  @Post(':id/comments')
  @UseGuards(AuthGuard)
  async addComment(
    @Param('id') ticketId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    const user = req.user;
    createCommentDto.user = user._id.toString();
    return this.ticketService.addComment(ticketId, createCommentDto);
  }

  // Update an existing comment
  @Put('comments/:id')
  @UseGuards(AuthGuard)
  async updateComment(
    @Param('id') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req,
  ) {
    const user = req.user;
    const comment = await this.ticketService.getCommentById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (String(comment.user) !== user._id.toString()) {
      throw new Error('You are not authorized to edit this comment');
    }
    return this.ticketService.updateComment(commentId, updateCommentDto);
  }

  // Delete a comment
  @Delete('comments/:id')
  @UseGuards(AuthGuard)
  async deleteComment(@Param('id') commentId: string, @Request() req) {
    const user = req.user;
    const comment = await this.ticketService.getCommentById(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (String(comment.user) !== user._id.toString()) {
      throw new Error('You are not authorized to delete this comment');
    }

    return this.ticketService.deleteComment(commentId);
  }
}
