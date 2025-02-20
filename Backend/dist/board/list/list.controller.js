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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const list_dto_1 = require("./dto/list.dto");
let ListController = class ListController {
    constructor(listService) {
        this.listService = listService;
    }
    async createList(createListDto) {
        return this.listService.create(createListDto);
    }
    async getLits() {
        return this.listService.findAll();
    }
    async getListById(id) {
        return this.listService.findOne(id);
    }
    async updateList(id, createListDto) {
        return this.listService.update(id, createListDto);
    }
    async removeList(id) {
        return this.listService.remove(id);
    }
};
exports.ListController = ListController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "createList", null);
__decorate([
    (0, common_1.Get)('viewall'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getLits", null);
__decorate([
    (0, common_1.Get)('view'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "getListById", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "updateList", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "removeList", null);
exports.ListController = ListController = __decorate([
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService])
], ListController);
//# sourceMappingURL=list.controller.js.map