import {pool} from "../db";

import {createBoard, findBoardById, updateBoardById, deleteBoardById, findBoard } from "../query/board-query"
import ApiError from "../exceptions/api-error";

class BoardService {
    async createBoard(name: string, color: string, description: string, board_id: number ) {
        const card = await pool.query( findBoard,
            [board_id]
        );
        if (card.rows[0].exists) {
            throw ApiError.BadRequest('This board already exists')
        }

        const { rows } = await pool.query(createBoard,
            [name, color, description]
        );
        return rows
    }

    async findBoardById(id: string) {
        const { rows } = await pool.query(findBoardById, [id]);
        if (!rows.length) {
            throw ApiError.BadRequest('Nothing was found')
        }
        return rows
    }

    async updateBoardById(name: string, color: string, description: string, id: string) {
        const { rows } = await pool.query(updateBoardById,
            [name, color, description, id]
        );
        return rows
    }

    async deleteBoardById(id: string) {
        const board = await pool.query(deleteBoardById, [id]);
        return board
    }
}

export default new BoardService();
