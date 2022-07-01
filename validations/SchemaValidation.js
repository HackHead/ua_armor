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
         running_out: Joi.string(),
         new: Joi.string(),
         customers_choice: Joi.string(),
         show_in_index_slider: Joi.string(),
         show_in_index_catalog: Joi.string(),
         images: Joi.array(),
         date: Joi.date(),
    })

    return shema.validate(data)
}

export const mailValidation = (data) => {
    const shema = Joi.object({
        name: Joi.string().min(6).max(128).required(),
        message: Joi.string().min(8).max(4096).required(),
        email: Joi.string().min(6).max(320).required().email()
         
    })

    return shema.validate(data)
}

export const commentValidation = (data) => {
    const shema = Joi.object({
        name: Joi.string().min(2).max(128).required(),
        message: Joi.string().min(8).max(4096).required(),
        email: Joi.string().min(6).max(320).required().email(),
        rate: Joi.string().regex(/^[0-9]{0,9}$/),
        productId: Joi.string().required(),
    })

    return shema.validate(data)
}