import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Ticket, TicketDocument } from './schemas/ticket.schma';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // Create a new ticket
  async createTicket(
    createTicketDto: CreateTicketDto,
    files: Express.Multer.File[],
  ): Promise<any> {
    const ticketName = createTicketDto.title.replace(/\s+/g, '-');
    const assignee = createTicketDto.assignee;

    // Save multiple files and store their paths
    const filePaths = files
      ? files.map((file) => this.saveFile(file, ticketName))
      : [];

    const ticket = new this.ticketModel({
      ...createTicketDto,
      assignee,
      filePaths,
    });

    const savedTicket = await ticket.save();
    const populatedTicket = await this.ticketModel
      .findById(savedTicket._id)
      .populate({ path: 'assignee', select: 'username -_id' })
      .lean();

    return {
      ...populatedTicket,
      assignee: populatedTicket.assignee?.name || '',
    };
  }

  //Get all tickets
  async getTickets(): Promise<
    {
      _id: string;
      title: string;
      description: string;
      filePaths: string[];
      projectTitle: string;
      status: string;
      assignee: string;
    }[]
  > {
    const tickets = await this.ticketModel
      .find()
      .populate({ path: 'assignee', select: 'username -_id' }); // Populate assignee

    return tickets.map((ticket) => ({
      _id: String(ticket._id), // Ensure _id is a string
      title: ticket.title,
      description: ticket.description,
      filePaths: Array.isArray(ticket.filePaths) ? ticket.filePaths : [],
      projectTitle: ticket.projectTitle,
      status: ticket.status,
      assignee: (ticket.assignee as { name: string })?.name || '', // Ensure assignee is a string
    }));
  }

  // Add a comment to a ticket
  async addComment(
    ticketId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = new this.commentModel({
      ...createCommentDto,
      ticketId,
    });
    return comment.save();
  }

  // Update a comment
  async updateComment(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(
        commentId,
        { ...updateCommentDto, edited: true, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  // Delete a comment
  async deleteComment(commentId: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(commentId).exec();
  }

  // Get all comments for a ticket
  async getCommentsForTicket(ticketId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ ticketId })
      .populate('user', 'username') // Populate user details
      .exec();
  }

  // Get a single comment by ID (for update or delete)
  async getCommentById(commentId: string): Promise<Comment | null> {
    return this.commentModel.findById(commentId).exec();
  }

  // Save file to the local filesystem
  private saveFile(file: Express.Multer.File, ticketName: string): string {
    const uploadBaseDir = path.join(process.cwd(), 'uploads');
    const ticketFolder = path.join(uploadBaseDir, ticketName);
    if (!fs.existsSync(ticketFolder)) {
      fs.mkdirSync(ticketFolder, { recursive: true });
    }
    const filePath = path.join(ticketFolder, file.originalname);

    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}
