import { BoardServicePGImpl } from "../interfaces/boardService.interface";
import { BoardRepositoryPGImpl } from "../interfaces/boardRepository.interface";
import ApiError from "../exceptions/apiError";

class BoardService {

    boardService: BoardServicePGImpl;

    constructor(boardService: BoardServicePGImpl) {
        this.boardService = boardService;
    }

    async createBoard(name: string, color: string, description: string, board_id: number ) {
        const board = await this.boardService.createBoard(name, color, description, board_id)
        return board
    }

    async findBoardById(id: string) {
        const { rows } = await this.boardService.findBoardById(id);

        if (!rows.length) {
            throw ApiError.BadRequest('Nothing was found')
        }
        return rows
    }

    async updateBoardById(name: string, color: string, description: string, id: string) {
        const { rows } = await this.boardService.updateBoardById(name, color, description, id)
        return rows
    }

    async deleteBoardById(id: string) {
        const board = await this.boardService.deleteBoardById(id);
        return board
    }
}

export default new BoardService(new BoardServicePGImpl(new BoardRepositoryPGImpl));
