const express = require('express');
const postUsecase = require('../usecases/postPulish.usecase');
const auth = require('../middleware/auth.middleware');
const getIdToken = require('../lib/getID')
const createError = require('http-errors')

const router = express.Router();

// Post /post/ auth
router.post('/', auth, async (req, res)=>{
    try {

        const userId = await getIdToken(req, res);
        const postData = {...req.body, user: userId}
        const postCreate = await postUsecase.createPost(postData);
        res.json({
            success:true,
            data: {post: postCreate}
        })
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    }
})

// Get /post 
router.get('/', async (req, res)=>{
    try {
        const posts = await postUsecase.getAllPost();
        res.json({
            success: true,
            data: { posts },
        });
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    };
});

//patch /post/:id auth
router.patch('/:id', auth, async(req, res)=>{
    try {
        const {id} = req.params;
        if(req.body.user){
            throw createError(423, "It is not possible to change the user.")
        }
        const postUpdated = await postUsecase.updatePostById(id, req.body);
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

// delete /post/:id auth
router.delete('/:id', auth, async (req, res)=>{
    try {
        const {id} = req.params;

        const usertoken = await getIdToken(req, res);
        const userId = usertoken._id
        const post = await postUsecase.getPostId(id);
        const postUserId = post.user._id;
        if(!postUserId===userId){
            console.log(userId);
            console.log(postUserId);
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