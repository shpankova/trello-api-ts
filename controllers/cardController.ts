import { Request, Response, NextFunction } from "express";

import ApiError from "../exceptions/apiError";
import { cardValidation } from "../validation/card-validation";
import cardService from "../service/cardService";

class CardController {
  async createCard (req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = cardValidation(req.body);
      if (error) {
        return next(ApiError.BadRequest("Not valid data", error.details[0].message));
      }

      const card = await cardService.createCard(req.body);

      res.json({
        message: "Card added successfully!",
        body: {
          card
        }
      });
    } catch (err) {
      if (err.message === "Card exists") {
        next(ApiError.BadRequest("This card already exists"));
      } else { next(err); }
    }
  }

  async findCardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const card = await cardService.findCardById(id);

      return res.json({
        message: "Card found successfully!",
        body: { card }
      });
    } catch (err) {
      if (err.message === "Nothing was found") {
        next(ApiError.BadRequest("Nothing was found"));
      } else { next(err); }
    }
  }

  async updateCardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const { error } = cardValidation(req.body);
      if (error) {
        return next(ApiError.BadRequest("Not valid data", error.details[0].message));
      }
      const card = await cardService.updateCardById(req.body, id);
      res.json({
        message: "Card Updated Successfully!",
        body: {
          card
        }
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCardById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const card = await cardService.deleteCardById(id);
      res.json({
        message: "Card deleted successfully!",
        body: {
          card
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new CardController();
