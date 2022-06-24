import Joi from "joi"

interface Data {
    board_id: number;
    name: string;
    description: string;
    estimate: string;
    status: string;
    due_date: string;
    labels: string;
    card_id: number;
}

export const cardValidation = (data: Data) => {
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
    return schema.validate(data)
}

