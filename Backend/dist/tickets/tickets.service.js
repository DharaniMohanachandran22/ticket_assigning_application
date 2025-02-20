"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const fs = require("fs");
const path = require("path");
const ticket_schma_1 = require("./schemas/ticket.schma");
let TicketService = class TicketService {
    constructor(ticketModel, commentModel) {
        this.ticketModel = ticketModel;
        this.commentModel = commentModel;
    }
    async createTicket(createTicketDto, files) {
        const ticketName = createTicketDto.title.replace(/\s+/g, '-');
        const assignee = createTicketDto.assignee;
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
    async getTickets() {
        const tickets = await this.ticketModel
            .find()
            .populate({ path: 'assignee', select: 'username -_id' });
        return tickets.map((ticket) => ({
            _id: String(ticket._id),
            title: ticket.title,
            description: ticket.description,
            filePaths: Array.isArray(ticket.filePaths) ? ticket.filePaths : [],
            projectTitle: ticket.projectTitle,
            status: ticket.status,
            assignee: ticket.assignee?.name || '',
        }));
    }
    async addComment(ticketId, createCommentDto) {
        const comment = new this.commentModel({
            ...createCommentDto,
            ticketId,
        });
        return comment.save();
    }
    async updateComment(commentId, updateCommentDto) {
        return this.commentModel
            .findByIdAndUpdate(commentId, { ...updateCommentDto, edited: true, updatedAt: new Date() }, { new: true })
            .exec();
    }
    async deleteComment(commentId) {
        await this.commentModel.findByIdAndDelete(commentId).exec();
    }
    async getCommentsForTicket(ticketId) {
        return this.commentModel
            .find({ ticketId })
            .populate('user', 'username')
            .exec();
    }
    async getCommentById(commentId) {
        return this.commentModel.findById(commentId).exec();
    }
    saveFile(file, ticketName) {
        const uploadBaseDir = path.join(process.cwd(), 'uploads');
        const ticketFolder = path.join(uploadBaseDir, ticketName);
        if (!fs.existsSync(ticketFolder)) {
            fs.mkdirSync(ticketFolder, { recursive: true });
        }
        const filePath = path.join(ticketFolder, file.originalname);
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schma_1.Ticket.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TicketService);
//# sourceMappingURL=tickets.service.js.map