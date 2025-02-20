import { Board, BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/board.dto';
export declare class BoardService {
    private readonly boardModel;
    constructor(boardModel: Model<BoardDocument>);
    create(createBoardDto: CreateBoardDto): Promise<Board>;
    findAll(): Promise<Board[]>;
    findOne(id: string): Promise<Board>;
    update(id: string, createBoardDto: CreateBoardDto): Promise<Board>;
    remove(id: string): Promise<void>;
}
