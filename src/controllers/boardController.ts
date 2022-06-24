import { Request, Response, NextFunction } from "express";

import boardService from '../service/board-service'

class BoardController {
    async createBoard(
        req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const {name, color, description} = req.body

            const board = await boardService.createBoard(name, color, description)
            res.status(201).send({
                message: "Board added successfully!",
                body: {
                    board: { name, color, description },
                },
            });
        } catch (e) {
            next(e)
        }

    };

    async findBoardById(req: Request,
        res: Response,
        next: NextFunction
        ) {
        try {
            const { id } = req.params;
            const board = await boardService.findBoardById(id)
            return res.json(board)
        } catch (e) {
           next(e)
        }
    };

    async updateBoardById(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, color, description } = req.body;
            const board = await boardService.updateBoardById(name, color, description, id)
            res.status(200).send({ message: "Board Updated Successfully!" });
        } catch (e) {
            next(e)
        }
    };

    async deleteBoardById(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const { id } = req.params;
            const board = await boardService.deleteBoardById(id)
            res.status(200).send({ message: "Board deleted successfully!" });
        } catch (e) {
            next(e)
        }
    } 
}

export default new BoardController();
