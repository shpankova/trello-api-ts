import ApiError from "../exceptions/apiError";
import { QueryResult } from 'pg';


import { BoardRepositoryPGImpl } from "./boardRepository.interface";


interface Board {
    name: string;
    color: string;
    description: string;
    role: string;
    board_id: number;
    exists: boolean;
    id: string;
    
    
    
}

interface BoardService {
    createBoard(name: string, color: string, description: string, board_id: number): Promise<QueryResult<Board>>;
    findBoardById(id: string): Promise<QueryResult<Board>>;
    updateBoardById(name: string, color: string, description: string, id: string) : Promise<QueryResult<Board>>;
    deleteBoardById(id: string): Promise<QueryResult<Board>>;
}

export class BoardServicePGImpl implements BoardService {

    boardRepository: BoardRepositoryPGImpl;

    constructor(boardRepository: BoardRepositoryPGImpl) {
        this.boardRepository = boardRepository;
    }

    async createBoard(name: string, color: string, description: string, board_id: number ): Promise<QueryResult<Board>> {
        const board = await this.boardRepository.findBoard(board_id);
        
        if (board.rows[0].exists) {
            throw ApiError.BadRequest('This board already exists')
        }

        return this.boardRepository.createBoard(name, color, description);
    }

    async findBoardById(id: string): Promise<QueryResult<Board>> {
        return await this.boardRepository.findBoardById(id);
    }

    async updateBoardById(name: string, color: string, description: string, id: string) : Promise<QueryResult<Board>> {
        return await this.boardRepository.updateBoardById(name, color, description, id)
    }

    async deleteBoardById(id: string): Promise<QueryResult<Board>> {
        return await this.boardRepository.deleteBoardById(id);
    }

}
