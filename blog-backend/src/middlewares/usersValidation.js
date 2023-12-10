const Joi = require('joi');

const userSchema = Joi.object({
    name : Joi.string().required(),
    lastname : Joi.string(),
    username : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    image : Joi.string(),
    status : Joi.number().required(),
    kind : Joi.number().required(),
})

const validateUser = (req, res, next) =>{
    const {error} = userSchema.validate(req.body);
    if (error){
        return res.status(401).send(error.details[0].message)
    }
    next();
}

module.exports = validateUser;