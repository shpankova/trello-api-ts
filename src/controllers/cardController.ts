import { Request, Response, NextFunction } from "express";
import { QueryResult } from 'pg';

import ApiError from "../exceptions/api-error";
import { cardValidation } from "../validation/card-validation"; 

import cardService from "../service/card-service";

class CardController {
    async createCard(
        req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const { board_id, name, description, estimate, status, due_date, labels, card_id } = req.body
            const { error } = cardValidation(req.body)
            if (error) {
                return next(ApiError.BadRequest('Not valid data', error.details[0].message))
            }
            
            const card = await cardService.createCard(board_id, name, description, estimate, status, due_date, labels, card_id)

            res.json({
                message: "Card added successfully!",
                body: {
                    card: { board_id, name, description, estimate, status, due_date, labels },
                },
            });
        } catch (e) {
            next(e)
        }

    };

    async findCardById(req: Request,
        res: Response,
        next: NextFunction
        ) {
        try {
            const { id } = req.params;
            const card = await cardService.findCardById(id)
            return res.json(card)
        } catch (e) {
           next(e)
        }
    };

    async updateCardById(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const { id } = req.params;
            const { board_id, name, description, estimate, status, due_date, labels } = req.body;

            const { error } = cardValidation(req.body)
            if (error) {
                return next(ApiError.BadRequest('Not valid data', error.details[0].message))
            }
            const card = await cardService.updateCardById(board_id, name, description, estimate, status, due_date, labels, id)
            res.json({message: "Card Updated Successfully!"});
        } catch (e) {
            next(e)
        }
    };

    async deleteCardById(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const { id } = req.params;
            const card = await cardService.deleteCardById(id)
            res.json({message: "Card deleted successfully!"});
        } catch (e) {
            next(e)
        }
    } 
}

export default new CardController();
