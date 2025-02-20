import { BoardVisiblity } from '../schemas/board.schema';
export declare class CreateBoardDto {
    boardName: string;
    visiblity: BoardVisiblity;
    createdByUser: string;
}
