"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tickets_controller_1 = require("./tickets.controller");
const tickets_service_1 = require("./tickets.service");
const comment_schema_1 = require("./schemas/comment.schema");
const ticket_schma_1 = require("./schemas/ticket.schma");
const auth_module_1 = require("../auth/auth.module");
const user_schmas_1 = require("../auth/schemas/user.schmas");
let TicketModule = class TicketModule {
};
exports.TicketModule = TicketModule;
exports.TicketModule = TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: ticket_schma_1.Ticket.name, schema: ticket_schma_1.TicketSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schmas_1.User.name, schema: user_schmas_1.UserSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [tickets_controller_1.TicketController],
        providers: [tickets_service_1.TicketService],
    })
], TicketModule);
//# sourceMappingURL=tickets.module.js.map