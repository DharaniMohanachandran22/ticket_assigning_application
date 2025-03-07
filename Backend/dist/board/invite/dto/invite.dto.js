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
exports.CreateInviteLinkDto = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const invite_schema_1 = require("../schema/invite.schema");
class CreateInviteLinkDto {
}
exports.CreateInviteLinkDto = CreateInviteLinkDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInviteLinkDto.prototype, "boardId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInviteLinkDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(invite_schema_1.InvitePermission, {
        message: 'Permission must be Admin, Member, or Observer',
    }),
    __metadata("design:type", String)
], CreateInviteLinkDto.prototype, "permission", void 0);
//# sourceMappingURL=invite.dto.js.map