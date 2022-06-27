import Joi, { ValidationResult } from "joi"

interface Board {
    name: string;
    color: string;
    description: string;
    role: string;
    board_id: number;
}

interface Card {
    board_id: number;
    name: string;
    description: string;
    estimate: string;
    status: string;
    due_date: string;
    labels: string;
    card_id: number;
}


interface Validation {
    boardValidation(board: Board): ValidationResult<Board>;
    cardValidation(card: Card): ValidationResult<Card>;
}

export class ValidationPGImpl implements Validation {
    boardValidation(board: Board): ValidationResult<Board> {
        const schema = Joi.object({
            name : Joi.string().max(40).required(),
            color : Joi.string().max(40).required(),
            description : Joi.string().required(),
            role: Joi.string().required(),
            board_id: Joi.number().integer()
            })
       return schema.validate(board)
        
    }
    cardValidation(card: Card): ValidationResult<Card>{
        const schema = Joi.object({
            board_id: Joi.number().integer(),
            name : Joi.string().max(40).required(),
            description : Joi.string().required(),
            estimate: Joi.string().required(),
            status: Joi.string().max(40).required(),
            due_date: Joi.date().timestamp().required(),
            labels: Joi.string().max(40).required(),
            card_id: Joi.number().integer()
            })
        return schema.validate(card)
    }
}
