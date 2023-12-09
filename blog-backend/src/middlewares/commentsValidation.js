const Joi = require('joi');

const commentSchema = Joi.object({
    name : Joi.string(),
    comment : Joi.string(),
    email : Joi.string(),
    image : Joi.string(),
    post_id : Joi.number().required(),
    status : Joi.number().required(),
})

const validateComment = (req, res, next) => {
    const {error} = commentSchema.validate(req.body);
    if (error){
        return res.status(401).send(error.details[0].message)
    }
    next();
}

module.exports = validateComment;