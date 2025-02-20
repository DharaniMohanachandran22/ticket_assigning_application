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
exports.InviteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const invite_schema_1 = require("./schema/invite.schema");
const board_schema_1 = require("../schemas/board.schema");
const joinReq_schema_1 = require("../schemas/joinReq.schema");
const boardMembers_schema_1 = require("../schemas/boardMembers.schema");
const config_1 = require("@nestjs/config");
let InviteService = class InviteService {
    constructor(inviteLinkModel, boardModel, joinReqModel, boardMembersModel, configService) {
        this.inviteLinkModel = inviteLinkModel;
        this.boardModel = boardModel;
        this.joinReqModel = joinReqModel;
        this.boardMembersModel = boardMembersModel;
        this.configService = configService;
    }
    async createInviteLink(createInviteLinkDto, boardId) {
        const baseUrl = this.configService.get('BASE_URL');
        const inviteToken = (0, uuid_1.v4)();
        const newInvite = new this.inviteLinkModel({
            ...createInviteLinkDto,
            inviteToken,
            expireAt: new Date(Date.now() + 60 * 60 * 1000),
        });
        newInvite.save();
        return {
            url: `${baseUrl}/invite/join/${boardId}/${inviteToken}`,
        };
    }
    async deleteInvite(id) {
        const result = await this.inviteLinkModel.deleteOne({
            _id: new mongoose_2.Types.ObjectId(id),
        });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Invite with ID ${id} not found.`);
        }
    }
    async joinBoard(inviteToken, userId, boardId) {
        const invite = await this.inviteLinkModel.findOne({ inviteToken }).exec();
        if (!invite)
            throw new common_1.NotFoundException('Invite not found');
        if (invite.expireAt && new Date(invite.expireAt) < new Date()) {
            throw new common_1.NotFoundException('The token is expried!!');
        }
        const existingMember = await this.boardMembersModel
            .findOne({ boardId, userId })
            .exec();
        if (existingMember)
            throw new common_1.NotFoundException('User is already exist in the board');
        const board = await this.boardModel.findById(boardId).exec();
        if (!board)
            throw new common_1.NotFoundException('Board not found');
        const isPublic = board.visiblity === 'public';
        const joinReq = new this.joinReqModel({
            boardId,
            userId,
            roleRequested: invite.permission,
            status: isPublic ? joinReq_schema_1.ReqStatus.ACCEPTED : joinReq_schema_1.ReqStatus.PENDING,
            sendBy: invite.createdBy,
            inviteToken,
        });
        await joinReq.save();
        if (isPublic) {
            await this.addBoardMember(boardId, userId, invite.permission);
            return 'User successfully joined the public board!';
        }
        else {
            return 'User request sent. Waiting for admin approval.';
        }
    }
    async handleJoinRequest(joinReqId, status) {
        const joinReq = await this.joinReqModel.findById(joinReqId).exec();
        if (!joinReq)
            throw new common_1.NotFoundException('Join request not found');
        if (joinReq.status !== joinReq_schema_1.ReqStatus.PENDING) {
            throw new common_1.NotFoundException('Request is already processed.');
        }
        joinReq.status = status;
        await joinReq.save();
        if (status === joinReq_schema_1.ReqStatus.ACCEPTED) {
            await this.addBoardMember(joinReq.boardId, joinReq.userId, joinReq.roleRequested);
            return 'User successfully joined the private board!';
        }
        return 'Join request rejected.';
    }
    async addBoardMember(boardId, userId, role) {
        const boardMember = new this.boardMembersModel({
            boardId,
            userId,
            role,
        });
        await boardMember.save();
    }
};
exports.InviteService = InviteService;
exports.InviteService = InviteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invite_schema_1.Invite.name)),
    __param(1, (0, mongoose_1.InjectModel)(board_schema_1.Board.name)),
    __param(2, (0, mongoose_1.InjectModel)(joinReq_schema_1.JoinReq.name)),
    __param(3, (0, mongoose_1.InjectModel)(boardMembers_schema_1.BoardMemebers.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], InviteService);
//# sourceMappingURL=invite.service.js.map