const createError = require('http-errors');
const userUsecase = require('../usecases/user.usecase');
const jwt = require('../lib/jwt');

async function auth(req, res, next){
    try {
        const token = req.headers.authorization; 
        if(!token){
            throw createError(401, 'login required')
        }
        const payload = jwt.verify(token);
        const userAuthorized = await userUsecase.getUserById(payload.id);
        req.userAuthorized = userAuthorized;
        next();
    } catch (error) {
        res.status(401)
        res.json({
            success: false,
            error: error.message,
        });
    };
};

module.exports = auth; 
