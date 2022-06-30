import { pool } from "../db";

import { createBoard, findBoardById, updateBoardById, deleteBoardById, findBoard } from "../query/boardQuery";
import { Board, ResBoard } from "../types/boardType";

class BoardService {
  async createBoard (board: Board): Promise<ResBoard> {
    const boards = await pool.query(findBoard,
      [board.board_id]
    );

    if (boards.rows[0].exists) {
      throw new Error("Board exists");
    }

    const createBoards = await pool.query(createBoard,
      [board.name, board.color, board.description]);

    return createBoards.rows[0];
  }

  async findBoardById (id: string): Promise<ResBoard> {
    const board = await pool.query(findBoardById, [id]);

    if (!board.rows[0]) {
      throw new Error("Nothing was found");
    }

    return board.rows[0];
  }

  async updateBoardById (board: Board, id: string): Promise<ResBoard> {
    const updateBoard = await pool.query(updateBoardById,
      [board.name, board.color, board.description, id]
    );
    return updateBoard.rows[0];
  }

  async deleteBoardById (id: string): Promise<ResBoard> {
    const board = await pool.query(deleteBoardById, [id]);
    return board.rows[0];
  }
}

export default new BoardService();
