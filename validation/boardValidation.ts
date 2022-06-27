import Joi from "joi"

interface Data {
    name: string;
    color: string;
    description: string;
    role: string;
    board_id: number;
}

export const boardValidation = (data: Data) => {
    const schema = Joi.object({
        name : Joi.string().max(40).required(),
        color : Joi.string().max(40).required(),
        description : Joi.string().required(),
        role: Joi.string().required(),
        board_id: Joi.number().integer()
        })
    return schema.validate(data)
}

