"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModule = void 0;
const common_1 = require("@nestjs/common");
const invite_service_1 = require("./invite.service");
const invite_controller_1 = require("./invite.controller");
const mongoose_1 = require("@nestjs/mongoose");
const invite_schema_1 = require("./schema/invite.schema");
const board_schema_1 = require("../schemas/board.schema");
const boardMembers_schema_1 = require("../schemas/boardMembers.schema");
const joinReq_schema_1 = require("../schemas/joinReq.schema");
let InviteModule = class InviteModule {
};
exports.InviteModule = InviteModule;
exports.InviteModule = InviteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: invite_schema_1.Invite.name,
                    schema: invite_schema_1.InviteLinkSchema,
                },
                {
                    name: board_schema_1.Board.name,
                    schema: board_schema_1.BoardSchema,
                },
                {
                    name: boardMembers_schema_1.BoardMemebers.name,
                    schema: boardMembers_schema_1.BoardMembersSchema,
                },
                {
                    name: joinReq_schema_1.JoinReq.name,
                    schema: joinReq_schema_1.JoinReqSchema,
                },
            ]),
        ],
        providers: [invite_service_1.InviteService],
        controllers: [invite_controller_1.InviteController],
    })
], InviteModule);
//# sourceMappingURL=invite.module.js.map