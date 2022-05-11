import {Router} from "express";
import Post from "./Post.js";
import PostsController from "./PostsController.js";

const router = new Router()

router.post('/posts', PostsController.create)
router.get('/posts', PostsController.getAll)
router.get('/posts/:id', PostsController.getPostById)
router.put('/posts', PostsController.update)
router.delete('/posts/:id', PostsController.delete)

export default router;
