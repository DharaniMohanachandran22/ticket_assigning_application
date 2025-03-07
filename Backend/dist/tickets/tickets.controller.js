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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const tickets_service_1 = require("./tickets.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async getTickets() {
        return this.ticketService.getTickets();
    }
    async getCommentsForTicket(ticketId) {
        return this.ticketService.getCommentsForTicket(ticketId);
    }
    async createTicket(createTicketDto, files) {
        return this.ticketService.createTicket(createTicketDto, files?.files || []);
    }
    async addComment(ticketId, createCommentDto, req) {
        const user = req.user;
        createCommentDto.user = user._id.toString();
        return this.ticketService.addComment(ticketId, createCommentDto);
    }
    async updateComment(commentId, updateCommentDto, req) {
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
    async deleteComment(commentId, req) {
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
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getCommentsForTicket", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'files', maxCount: 5 }])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "addComment", null);
__decorate([
    (0, common_1.Put)('comments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteComment", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketService])
], TicketController);
//# sourceMappingURL=tickets.controller.js.map