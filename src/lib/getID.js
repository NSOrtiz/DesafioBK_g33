const jwt = require('../lib/jwt');
const userUsecase = require('../usecases/user.usecase');


async function getIdToken(req,res){
    const token = req.headers.authorization;
    const payload = jwt.verify(token);
    const user = await userUsecase.getUserById(payload.id);

    return user
}

module.exports = getIdToken;