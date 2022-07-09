import Joi from "@hapi/joi";
import objectId from "joi-objectid/index.js";

export const registrationValidatation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required().max(255),
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
        role: Joi.string().required()
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
         new: Joi.string(),
         customers_choice: Joi.string(),
         show_in_index_catalog: Joi.string(),
         images: Joi.array(),
         availability: Joi.string().valid('available', 'running', 'out', 'waiting').required().default('available')
    })

    return shema.validate(data)
}

export const orderValidation = (data) => {
    const shema = Joi.object({
        session: Joi.string().required(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        status: Joi.string().valid('pending', 'delivering', 'failed', 'submitted').required().default('available')

    })

    return shema.validate(data)
}


export const slideValidation = (data) => {
    const shema = Joi.object({
        title: Joi.string().required().max(64),
        button: Joi.string().required().max(16),
        description: Joi.string().required().max(128),
        link: Joi.string().required(),
    })

    return shema.validate(data)
}


export const featureValidation = (data) => {
    const shema = Joi.object({
        product: objectId(Joi),
        featureKeys: Joi.array().items(Joi.string()),
        featureValues: Joi.array().items(Joi.string()),
    });

    return shema.validate(data)
}

export const categoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required().max(64),
        parentId: objectId(Joi, 'Категории с таким идентификатором не существует')
    });

    return schema.validate(data)
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
        product: Joi.string().required(),
    })

    return shema.validate(data)
}