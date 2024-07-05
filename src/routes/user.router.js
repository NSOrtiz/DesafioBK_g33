const express = require('express');
const userUsecase = require('../usecases/user.usecase');
const auth = require('../middleware/auth.middleware'); 
const getIdToken = require('../lib/getID');
const createError = require('http-errors');

const router = express.Router();

router.post('/', async (req, res)=>{
    try {
        const userCreate = await userUsecase.createUser(req.body);
        res.json({
            success: true,
            data: {user: userCreate}
        });
        console.log('1')
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
        console.log('2')
    };
});

router.get('/:id', auth, async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await userUsecase.getUserById(id);
        res.json({
            success: true,
            data: { user },
        })
        console.log('3')
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
        console.log('4')
    };
});

router.patch('/:id', auth, async(req, res)=>{
    try {
        const {id} = req.params;
        const usertoken = await getIdToken(req, res);
        const userId = usertoken._id
        const strUserId = userId.toString();
        const strId = id.toString();
        if(strId!=strUserId){
            throw createError(401, "You can't edit this user.");
        }
        const userData = {...req.body, updated_at: Date.now}
        const userUpdated = await userUsecase.updateUserById(id, userData);
        res.json({
            success: true,
            data: { user: userUpdated }
        })
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    };
});

module.exports = router;