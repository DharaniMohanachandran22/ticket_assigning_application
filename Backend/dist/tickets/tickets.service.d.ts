import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TicketDocument } from './schemas/ticket.schma';
export declare class TicketService {
    private readonly ticketModel;
    private readonly commentModel;
    constructor(ticketModel: Model<TicketDocument>, commentModel: Model<Comment>);
    createTicket(createTicketDto: CreateTicketDto, files: Express.Multer.File[]): Promise<any>;
    getTickets(): Promise<{
        _id: string;
        title: string;
        description: string;
        filePaths: string[];
        projectTitle: string;
        status: string;
        assignee: string;
    }[]>;
    addComment(ticketId: string, createCommentDto: CreateCommentDto): Promise<Comment>;
    updateComment(commentId: string, updateCommentDto: UpdateCommentDto): Promise<Comment>;
    deleteComment(commentId: string): Promise<void>;
    getCommentsForTicket(ticketId: string): Promise<Comment[]>;
    getCommentById(commentId: string): Promise<Comment | null>;
    private saveFile;
}
