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
exports.InviteLinkSchema = exports.Invite = exports.InvitePermission = exports.InviteStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var InviteStatus;
(function (InviteStatus) {
    InviteStatus["ACTIVE"] = "Active";
    InviteStatus["DELETED"] = "Deleted";
    InviteStatus["EXPIRED"] = "Expired";
})(InviteStatus || (exports.InviteStatus = InviteStatus = {}));
var InvitePermission;
(function (InvitePermission) {
    InvitePermission["ADMIN"] = "Admin";
    InvitePermission["MEMBER"] = "Member";
    InvitePermission["OBSERVER"] = "Observer";
})(InvitePermission || (exports.InvitePermission = InvitePermission = {}));
let Invite = class Invite {
};
exports.Invite = Invite;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Board', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Invite.prototype, "boardId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Invite.prototype, "inviteToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Invite.prototype, "expireAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Invite.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: InviteStatus, default: InviteStatus.ACTIVE }),
    __metadata("design:type", String)
], Invite.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: InvitePermission, required: true }),
    __metadata("design:type", String)
], Invite.prototype, "permission", void 0);
exports.Invite = Invite = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Invite);
exports.InviteLinkSchema = mongoose_1.SchemaFactory.createForClass(Invite);
//# sourceMappingURL=invite.schema.js.map