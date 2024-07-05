const express = require('express');
const postUsecase = require('../usecases/postPulish.usecase');
const auth = require('../middleware/auth.middleware');
const getIdToken = require('../lib/getID');
const createError = require('http-errors');

const router = express.Router();

router.post('/', auth, async (req, res)=>{
    try {
        const userId = await getIdToken(req, res);
        //console.log(userId)
        const postData = {...req.body, user: userId}
        //console.log(postData)
        const postCreate = await postUsecase.createPost(postData);
        console.log(postCreate)
        res.json({
            success:true,
            data: {post: postCreate}
        })
        console.log('1a')
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
        console.log('2b')
    }
})

router.get('/', async (req, res)=>{
    try {
        const value = req.query.title;
        if(!value){
            const posts = await postUsecase.getAllPost();
            res.json({
                success: true,
                data: { posts },
            });
            console.log('3c')
        } else {
            const posts = await postUsecase.getPostFilterTitle(value);
                res.json({
                    success: true,
                    data: { posts },
                });
        }
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
        console.log('4d')
    };
});

router.patch('/:id', auth, async(req, res)=>{
    try {
        const {id} = req.params;
        if(req.body.user){
            throw createError(423, "It is not possible to change the user.")
        }
        const postData = {...req.body, updated_at: Date.now}
        const postUpdated = await postUsecase.updatePostById(id, postData);
        res.json({
            success: true,
            data: { post: postUpdated }
        })
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    };
});

router.delete('/:id', auth, async (req, res)=>{
    try {
        const {id} = req.params;
        const usertoken = await getIdToken(req, res);
        const userId = usertoken._id
        const post = await postUsecase.getPostId(id);
        const postUserId = post.user._id;
        const strPosId = postUserId.toString()
        const strUserId = userId.toString()
        if(strPosId != strUserId){
            throw createError(401, "You can't delete other user post.")
        }
        const postDelete = await postUsecase.deletePostById(id);
        res.json({
            success: true,
            data: {post: postDelete}
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