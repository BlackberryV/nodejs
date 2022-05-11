import Post from "./Post.js";
import PostService from "./PostService.js";

class PostsController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body)
            res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll()
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getPostById(req, res) {
        try {
            const post = await PostService.getPostById(req.params.id)
            res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const post = req.body
            const updatedPost = await PostService.update(post)
            res.status(200).json(updatedPost)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new PostsController();