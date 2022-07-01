import Joi from "@hapi/joi";

export const registrationValidatation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().max(255),
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
    });

    return schema.validate(data)
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
    });

    return schema.validate(data)
}

export const productValidation = (data) => {
    const shema = Joi.object({
        name: Joi.string().min(6).max(128).required(),
         description: Joi.string().min(64).max(4096).required(),
         price: Joi.string().required().regex(/^[0-9]{0,9}$/),
         sale: Joi.string().required().regex(/^[0-9]{0,9}$/),
         category: Joi.string().required(),
         hidden: Joi.string(),
         runningOut: Joi.string(),
         new: Joi.string(),
         customers_choice: Joi.string(),
         show_in_index_slider: Joi.string(),
         show_in_index_catalog: Joi.string(),
         images: Joi.array(),
         date: Joi.date(),
         
    })

    return shema.validate(data)
}