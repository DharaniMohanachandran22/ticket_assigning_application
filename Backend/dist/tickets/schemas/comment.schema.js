"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    ticketId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Ticket', required: true },
    comment: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    edited: { type: Boolean, default: false },
}, { timestamps: true });
class Comment extends mongoose_1.Document {
}
exports.Comment = Comment;
//# sourceMappingURL=comment.schema.js.map