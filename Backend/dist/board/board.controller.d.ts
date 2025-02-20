import { CreateBoardDto } from './dto/board.dto';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getAllBoard(): Promise<Board[]>;
    getBoard(id: string): Promise<Board>;
    updateBoard(id: string, createBoardDto: CreateBoardDto): Promise<Board>;
    deleteBoard(id: string): Promise<void>;
}
