const Joi = require('joi');

const postSchema = Joi.object({
    title : Joi.string().required(),
    brief : Joi.string(),
    content : Joi.string(),
    image : Joi.string(),
    status : Joi.number().required(),
    user_id : Joi.number().required(),
})

const validatePost = (req, res, next) => {
    const {error} = postSchema.validate(req.body);
    if (error){
        return res.status(401).send(error.details[0].message)
    }
    next();
}

module.exports = validatePost;