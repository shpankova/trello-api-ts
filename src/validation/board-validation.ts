import Joi from "joi"
export default function boardValidation (data: any) {

    const schema = Joi.object({
        name : Joi.string().max(40).required(),
        color : Joi.string().max(40).required(),
        description : Joi.string().required(),
        role: Joi.string().required(),
        board_id: Joi.number().integer()
        })
    return schema.validate(data)
}

