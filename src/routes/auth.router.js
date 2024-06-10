const express = require('express');
const authUseCase = require('../usecases/auth.usecase');

const router = express.Router();
router.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body;
        const token = await authUseCase.login(email, password);
        res.json({
            success: true,
            data: {token}
        });
    } catch (error) {
        res.status(error.status || 500)
        res.json({
            error: error.message,
        });
    }
});

module.exports = router
