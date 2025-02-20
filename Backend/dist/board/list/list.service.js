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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const list_schema_1 = require("./schema/list.schema");
const mongoose_2 = require("mongoose");
let ListService = class ListService {
    constructor(ListModel) {
        this.ListModel = ListModel;
    }
    async create(createListDto) {
        const createList = new this.ListModel(createListDto);
        return createList.save();
    }
    async findAll() {
        return this.ListModel.find().exec();
    }
    async findOne(id) {
        const list = await this.ListModel.findById(id).exec();
        if (!list) {
            throw new common_1.NotFoundException(`List with ID ${id} not found`);
        }
        return list;
    }
    async update(id, createBoardDto) {
        const list = await this.ListModel.findByIdAndUpdate(id, createBoardDto).exec();
        if (!list) {
            throw new common_1.NotFoundException(`List with ID ${id} not found`);
        }
        return list;
    }
    async remove(id) {
        const list = await this.ListModel.deleteOne({ _id: id }).exec();
        if (list.deletedCount === 0) {
            throw new common_1.NotFoundException(`List with ID ${id} not found`);
        }
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(list_schema_1.List.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ListService);
//# sourceMappingURL=list.service.js.map