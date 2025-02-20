import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { TicketService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getTickets(): Promise<{
        _id: string;
        title: string;
        description: string;
        filePaths: string[];
        projectTitle: string;
        status: string;
        assignee: string;
    }[]>;
    getCommentsForTicket(ticketId: string): Promise<import("./schemas/comment.schema").Comment[]>;
    createTicket(createTicketDto: CreateTicketDto, files: {
        files?: Express.Multer.File[];
    }): Promise<any>;
    addComment(ticketId: string, createCommentDto: CreateCommentDto, req: any): Promise<import("./schemas/comment.schema").Comment>;
    updateComment(commentId: string, updateCommentDto: UpdateCommentDto, req: any): Promise<import("./schemas/comment.schema").Comment>;
    deleteComment(commentId: string, req: any): Promise<void>;
}
