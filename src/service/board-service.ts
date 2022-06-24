import {pool} from "../db";

import {createBoard, findBoardById, updateBoardById, deleteBoardById, findBoard } from "../query/board-query"

class BoardService {
    async createBoard(name: string, color: string, description: string) {
        const { rows } = await pool.query(createBoard,
            [name, color, description]
        );
        return rows
    }

    async findBoardById(id: string) {
        const { rows } = await pool.query(findBoardById, [id]);
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
