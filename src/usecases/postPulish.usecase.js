
const postPublish = require('../models/postPublish.model');

async function createPost(postData){
    
    const newPost = await postPublish.create(postData);
    return newPost;
};

async function getAllPost(){
    const allPost = await postPublish.find().populate('user');
    return allPost;
};

async function updatePostById(id, newPostData){
    const updatedPost = await postPublish.findByIdAndUpdate(id, newPostData, {new: true});
    return updatedPost;
};

async function deletePostById(id){
    const postDelete = await postPublish.findByIdAndDelete(id);
    return postDelete;
};

module.exports = {
    createPost,
    getAllPost,
    updatePostById,
    deletePostById,
};