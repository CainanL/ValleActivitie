const joi = require('@hapi/joi');

module.exports = userValidate = {
    login: data => {
        const schema = joi.object({
            email: joi.string().required().min(7).max(50),
            password: joi.string().required().min(8).max(50)
        })
        return schema.validate(data);
    },

    register: data => {
        const schema = joi.object({
            email: joi.string().required().min(7).max(50),
            password: joi.string().required().min(8).max(50),
            name: joi.string().required().min(6).max(100),
            admin: joi.boolean()
        })
        return schema.validate(data);
    },

    edit: data => {
        const schema = joi.object({
            _id: joi.string().required(),
            password: joi.string().allow('').min(8).max(50),
            name: joi.string().required().min(6).max(100),
            admin: joi.boolean()
        })

        return schema.validate(data);
    },

    delete: data => {
        const schema = joi.object({
            _id: joi.string().required()
        })
        return schema.validate(data);
    },

    token: data => {
        const schema = joi.object({
            token: joi.string().required()
        })
        return schema.validate(data);
    }
}