"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModule = void 0;
const common_1 = require("@nestjs/common");
const invite_controller_1 = require("./invite/invite.controller");
const invite_module_1 = require("./invite/invite.module");
const list_service_1 = require("./list/list.service");
const list_module_1 = require("./list/list.module");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const board_schema_1 = require("./schemas/board.schema");
const board_controller_1 = require("./board.controller");
const board_service_1 = require("./board.service");
const list_schema_1 = require("./list/schema/list.schema");
const invite_schema_1 = require("./invite/schema/invite.schema");
const invite_service_1 = require("./invite/invite.service");
const joinReq_schema_1 = require("./schemas/joinReq.schema");
const boardMembers_schema_1 = require("./schemas/boardMembers.schema");
let BoardModule = class BoardModule {
};
exports.BoardModule = BoardModule;
exports.BoardModule = BoardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            invite_module_1.InviteModule,
            list_module_1.ListModule,
            auth_module_1.AuthModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: board_schema_1.Board.name,
                    schema: board_schema_1.BoardSchema,
                },
                {
                    name: list_schema_1.List.name,
                    schema: list_schema_1.ListSchema,
                },
                {
                    name: invite_schema_1.Invite.name,
                    schema: invite_schema_1.InviteLinkSchema,
                },
                {
                    name: joinReq_schema_1.JoinReq.name,
                    schema: joinReq_schema_1.JoinReqSchema,
                },
                {
                    name: boardMembers_schema_1.BoardMemebers.name,
                    schema: boardMembers_schema_1.BoardMembersSchema,
                },
            ]),
        ],
        controllers: [invite_controller_1.InviteController, board_controller_1.BoardController],
        providers: [list_service_1.ListService, board_service_1.BoardService, invite_service_1.InviteService],
    })
], BoardModule);
//# sourceMappingURL=board.module.js.map