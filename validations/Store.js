import Joi from "@hapi/joi";
export const storeQueryValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().max(255).email(),
        password: Joi.string().min(6).required().max(1024),
    });

    return schema.validate(data)
}
