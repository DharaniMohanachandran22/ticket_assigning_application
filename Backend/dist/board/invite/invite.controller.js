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
exports.InviteController = void 0;
const common_1 = require("@nestjs/common");
const invite_service_1 = require("./invite.service");
const mongoose_1 = require("mongoose");
const joinReq_schema_1 = require("../schemas/joinReq.schema");
const invite_dto_1 = require("./dto/invite.dto");
let InviteController = class InviteController {
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    async createInvite(createInviteLinkDto, boardId) {
        const invite = await this.inviteService.createInviteLink(createInviteLinkDto, new mongoose_1.Types.ObjectId(boardId));
        return invite;
    }
    async deleteInvite(id) {
        return this.inviteService.deleteInvite(id);
    }
    async joinBoard(boardId, accessToken, userId) {
        if (!boardId || !accessToken) {
            throw new common_1.NotFoundException('Board ID, access token, and board name are required.');
        }
        const message = await this.inviteService.joinBoard(accessToken, new mongoose_1.Types.ObjectId(userId), new mongoose_1.Types.ObjectId(boardId));
        return { message };
    }
    async handleJoinRequest(joinReqId, status) {
        if (![joinReq_schema_1.ReqStatus.ACCEPTED, joinReq_schema_1.ReqStatus.REJECTED].includes(status)) {
            throw new common_1.NotFoundException('Invalid status.');
        }
        return this.inviteService.handleJoinRequest(joinReqId, status);
    }
};
exports.InviteController = InviteController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('boardId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_dto_1.CreateInviteLinkDto, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "createInvite", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "deleteInvite", null);
__decorate([
    (0, common_1.Post)('join/:boardId/:accessToken'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('accessToken')),
    __param(2, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "joinBoard", null);
__decorate([
    (0, common_1.Patch)('join-request/:joinReqId'),
    __param(0, (0, common_1.Param)('joinReqId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId, String]),
    __metadata("design:returntype", Promise)
], InviteController.prototype, "handleJoinRequest", null);
exports.InviteController = InviteController = __decorate([
    (0, common_1.Controller)('invite'),
    __metadata("design:paramtypes", [invite_service_1.InviteService])
], InviteController);
//# sourceMappingURL=invite.controller.js.map