const joi = require('@hapi/joi');

module.exports.userValidate = {    
    login: data => {
        const schema = joi.object({
            email: joi.string().required().min(7).max(50),
            password: joi.string().required().min(8).max(50)
        })
        return schema.validate(data);
    }
}