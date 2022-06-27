
import { BoardRepositoryPGImpl } from "../repository/boardRepository.interface";
import ApiError from "../exceptions/apiError";

class BoardService {

    boardRepository: BoardRepositoryPGImpl;

    constructor(boardRepository: BoardRepositoryPGImpl) {
        this.boardRepository = boardRepository;
    }

    async createBoard(name: string, color: string, description: string, board_id: number ) {
        const card = await this.boardRepository.findBoard(board_id);
        
        if (card.rows[0].exists) {
            throw ApiError.BadRequest('This board already exists')
        }

        const { rows } = await this.boardRepository.createBoard(name, color, description);
        return rows
    }

    async findBoardById(id: string) {
        const { rows } = await this.boardRepository.findBoardById(id);
        console.log(rows);
        
        if (!rows.length) {
            throw ApiError.BadRequest('Nothing was found')
        }
        return rows
    }

    async updateBoardById(name: string, color: string, description: string, id: string) {
        const { rows } = await this.boardRepository.updateBoardById(name, color, description, id)
        return rows
    }

    async deleteBoardById(id: string) {
        const board = await this.boardRepository.deleteBoardById(id);
        return board
    }
}

export default new BoardService(new BoardRepositoryPGImpl);
