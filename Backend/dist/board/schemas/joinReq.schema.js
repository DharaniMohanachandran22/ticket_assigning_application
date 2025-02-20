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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinReqSchema = exports.JoinReq = exports.ReqStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invite_schema_1 = require("../invite/schema/invite.schema");
var ReqStatus;
(function (ReqStatus) {
    ReqStatus["ACCEPTED"] = "Accepted";
    ReqStatus["REJECTED"] = "Rejected";
    ReqStatus["PENDING"] = "Pending";
})(ReqStatus || (exports.ReqStatus = ReqStatus = {}));
let JoinReq = class JoinReq {
};
exports.JoinReq = JoinReq;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Board', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JoinReq.prototype, "boardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JoinReq.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: invite_schema_1.InvitePermission, required: true }),
    __metadata("design:type", String)
], JoinReq.prototype, "roleRequested", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ReqStatus, required: true, default: ReqStatus.PENDING }),
    __metadata("design:type", String)
], JoinReq.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], JoinReq.prototype, "sendBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], JoinReq.prototype, "inviteToken", void 0);
exports.JoinReq = JoinReq = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], JoinReq);
exports.JoinReqSchema = mongoose_1.SchemaFactory.createForClass(JoinReq);
//# sourceMappingURL=joinReq.schema.js.map