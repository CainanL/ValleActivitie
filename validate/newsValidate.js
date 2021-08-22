const { allow } = require('@hapi/joi');
const joi = require('@hapi/joi');

module.exports = newsValidate = {
    create: data => {
        const schema = joi.object({
            posterId: joi.string().required(),
            title: joi.string().required().min(3).max(50),
            text: joi.string().required().min(10),
            imageLink: joi.string().allow('')
        })
        return schema.validate(data);
    },

    read: data => {
        const schema = joi.object({
            readerId: joi.string().required(),
            title: joi.string().allow('').min(3).max(50),
        })
        return schema.validate(data);
    },

    update: data => {
        const schema = joi.object({
            editerId: joi.string().required(),
            _id: joi.string().required(),
            title: joi.string().required().min(3).max(50),
            text: joi.string().required().min(10),
            imagLink: joi.string().allow('')
        })

        return schema.validate(data);
    },

    delete: data => {
        const schema = joi.object({
            _id: joi.string().required(),
            deleterId: joi.string().required()
        })
        return schema.validate(data);
    }
}