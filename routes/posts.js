import express from 'express';

import { getPosts,  createPost,  completePost, deletePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id/completePost', completePost);
// router.get('/:id', getPost);
// router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;