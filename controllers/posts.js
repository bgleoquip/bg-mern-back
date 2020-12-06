import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/posts.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    console.log("getPosts")

    try {
        const postMessages = await PostMessage.find();
                // console.log(postMessages)
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getPost = async (req, res) => { 
//     console.log("getPost")
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createPost = async (req, res) => {
    const { title, complete } = req.body;
    console.log("createPost")
    // console.log(title, complete)
    const findPost = await PostMessage.findOne({title:title});
    // console.log(findPost)
    if(findPost){
        res.status(409).json({ message: "Title already in use " });
    } else {
        const newPostMessage = new PostMessage({ title, complete });
        try {
            await newPostMessage.save();
            res.status(201).json(newPostMessage );
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }
}

// export const updatePost = async (req, res) => {
//     console.log("updatePost")

//     const { id } = req.params;
//     const { title, message, creator, selectedFile, tags } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

export const deletePost = async (req, res) => {
    console.log("deletePost")
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    res.status(200).json({_id:id, message: "Post deleted successfully." });
}

export const completePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const updatedPost = await PostMessage.findOneAndUpdate({_id:id}, { complete:true });
    // const post = await PostMessage.findById({_id:id});
    console.log("completePost",updatedPost)

    res.status(200).json(updatedPost);
    // res.json(updatedPost);
}


export default router;