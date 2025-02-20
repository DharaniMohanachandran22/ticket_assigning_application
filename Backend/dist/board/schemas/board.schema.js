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
exports.BoardSchema = exports.Board = exports.BoardVisiblity = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
var BoardVisiblity;
(function (BoardVisiblity) {
    BoardVisiblity["PUBLIC"] = "public";
    BoardVisiblity["PRIVATE"] = "private";
    BoardVisiblity["COMMERCIAL"] = "comercial";
})(BoardVisiblity || (exports.BoardVisiblity = BoardVisiblity = {}));
let Board = class Board {
};
exports.Board = Board;
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Board.prototype, "boardName", void 0);
__decorate([
    (0, mongoose_2.Prop)({ enum: BoardVisiblity, default: BoardVisiblity.PUBLIC }),
    __metadata("design:type", String)
], Board.prototype, "visiblity", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: mongoose_1.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Board.prototype, "createdByUser", void 0);
exports.Board = Board = __decorate([
    (0, mongoose_2.Schema)({
        timestamps: true,
    })
], Board);
exports.BoardSchema = mongoose_2.SchemaFactory.createForClass(Board);
//# sourceMappingURL=board.schema.js.map