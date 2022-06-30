import Joi, { ValidationResult } from "joi";
import { Board } from "../types/boardType";

export function boardValidation (board: Board): ValidationResult<Board> {
  const schema = Joi.object({
    name: Joi.string().max(40).required(),
    color: Joi.string().max(40).required(),
    description: Joi.string().required(),
    role: Joi.string().required(),
    board_id: Joi.number().integer()
  });
  return schema.validate(board);
}
