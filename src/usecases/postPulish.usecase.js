const postPublish = require('../models/postPublish.model');

async function createPost(postData){
    try {
        console.log(postData)
        const newPost = await postPublish.create(postData);
        console.log(newPost)
        return newPost;
        
    } catch (error) {
        console.error("Error creando el post:", error);
        throw new Error("No se pudo crear el post. Inténtalo de nuevo.");
    }
};

async function getAllPost(){
    const allPost = await postPublish.find().populate('user');
    return allPost;
};

async function getPostFilterTitle(wordTitle){
    try {
        const filterPost = await postPublish.find({title: {$regex: wordTitle, $options:'i'}})
        return filterPost
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            success: false,
            error: error.message
        });
    }
};

async function getPostId(id){
    const postById = await postPublish.findById(id);
    return postById
};

async function updatePostById(id, newPostData){
    newPostData.updated_at = new Date();
    const updatedPost = await postPublish.findByIdAndUpdate(id, newPostData, {new: true});
    return updatedPost;
};

async function deletePostById(id){
    const postDelete = await postPublish.findByIdAndDelete(id);
    return postDelete;
};

module.exports = {
    createPost,
    getPostId,
    getPostFilterTitle,
    getAllPost,
    updatePostById,
    deletePostById,
};