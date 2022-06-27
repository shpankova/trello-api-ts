import { pool } from "../db";
import { QueryResult } from 'pg';

import {createBoard, findBoardById, updateBoardById, deleteBoardById, findBoard } from "../query/boardQuery"

interface Board {
    name: string;
    color: string;
    description: string;
    role: string;
    board_id: number;
    exists: boolean;
    id: string
    
}

interface BoardRepository {
    findBoard(board_id: number): Promise<QueryResult<Board>>;
    createBoard(name: string, color: string, description: string): Promise<QueryResult<Board>>;
    updateBoardById(name: string, color: string, description: string, id: string) : Promise<QueryResult<Board>>;
    deleteBoardById(id: string): Promise<QueryResult<Board>>;
    findBoardById(id: string): Promise<QueryResult<Board>>;
}

export class BoardRepositoryPGImpl implements BoardRepository {

    createBoard(name: string, color: string, description: string): Promise<QueryResult<Board>> {
        return pool.query(createBoard, [name, color, description]);
    }

    findBoard(board_id: number): Promise<QueryResult<Board>> {
        return pool.query(findBoard, [board_id]);
    }

    findBoardById(id: string): Promise<QueryResult<Board>>{
        return pool.query(findBoardById, [id]);
    }


    updateBoardById(name: string, color: string, description: string, id: string) : Promise<QueryResult<Board>> {
        return pool.query(updateBoardById, [name, color, description, id]);
    }

    deleteBoardById(id: string): Promise<QueryResult<Board>>{
        return pool.query(deleteBoardById, [id]);
    }

}

export class BoardRepositoryTypeorm implements BoardRepository {
    createBoard(): Promise<QueryResult<Board>> {
        return 
    }
    findBoard(): Promise<QueryResult<Board>> {
        return 
    }
    findBoardById(id: string): Promise<QueryResult<Board>>{
        return 
    }

    updateBoardById(name: string, color: string, description: string, id: string) : Promise<QueryResult<Board>> {
        return
    }
    deleteBoardById(id: string): Promise<QueryResult<Board>>{
        return 

    }

}

