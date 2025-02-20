"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.TicketSchema = void 0;
const mongoose_1 = require("mongoose");
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["TODO"] = "to-do";
    TicketStatus["IN_PROGRESS"] = "inProgress";
    TicketStatus["DONE"] = "done";
})(TicketStatus || (TicketStatus = {}));
exports.TicketSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    filePaths: [{ type: String }],
    assignee: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    projectTitle: { type: String, required: true },
    status: {
        type: String,
        enum: [TicketStatus],
        default: 'to-do',
    },
});
class Ticket extends mongoose_1.Document {
}
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.schma.js.map