import { List, ListDocument } from './schema/list.schema';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/list.dto';
export declare class ListService {
    private readonly ListModel;
    constructor(ListModel: Model<ListDocument>);
    create(createListDto: CreateListDto): Promise<List>;
    findAll(): Promise<List[]>;
    findOne(id: string): Promise<List>;
    update(id: string, createBoardDto: CreateListDto): Promise<List>;
    remove(id: string): Promise<void>;
}
