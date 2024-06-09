const express = require('express');
const userUsecase = require('../usecases/user.usecase');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

//POST /user -- registro de usuarios 
router.post('/', async (req, res)=>{
    try {
        const userCreate = await userUsecase.createUser(req.body);
        res.json({
            success: true,
            data: {user: userCreate}
        });
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    };
});

//Get /user/:id --obtenr informacion de usuario por medio de id. 
router.get('/:id', auth, async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await userUsecase.getUserById(id);
        res.json({
            success: true,
            data: { koder },
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