import { ListService } from './list.service';
import { CreateListDto } from './dto/list.dto';
import { List } from './schema/list.schema';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    createList(createListDto: CreateListDto): Promise<List>;
    getLits(): Promise<List[]>;
    getListById(id: string): Promise<List>;
    updateList(id: string, createListDto: CreateListDto): Promise<List>;
    removeList(id: string): Promise<void>;
}
