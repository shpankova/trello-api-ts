import { Request, Response, NextFunction } from "express";

import ApiError from "../exceptions/apiError";
import { boardValidation } from "../validation/board-validation";
import boardService from "../service/boardService";

class BoardController {
  async createBoard (req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = boardValidation(req.body);
      if (error) {
        return next(ApiError.BadRequest("Not valid data", error.details[0].message));
      }
      const board = await boardService.createBoard(req.body);
      res.json({
        message: "Board added successfully!",
        body: {
          board
        }
      });
    } catch (err) {
      if (err.message === "Board exists") {
        next(ApiError.BadRequest("This board already exists"));
      } else {
        next(err);
      }
    }
  }

  async findBoardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const board = await boardService.findBoardById(id);
      return res.json({
        message: "Board found successfully!",
        body: { board }
      });
    } catch (err) {
      if (err.message === "Nothing was found") {
        next(ApiError.BadRequest("Nothing was found"));
      } else {
        next(err);
      }
    }
  }

  async updateBoardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error } = boardValidation(req.body);
      if (error) {
        return next(ApiError.BadRequest("Not valid data", error.details[0].message));
      }
      const board = await boardService.updateBoardById(req.body, id);
      res.status(200).send({
        message: "Board Updated Successfully!",
        body: {
          board
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteBoardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const board = await boardService.deleteBoardById(id);
      res.status(200).send({
        message: "Board deleted successfully!",
        body: {
          board
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new BoardController();
