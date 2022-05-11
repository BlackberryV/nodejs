import Post from "./Post.js";

class PostService {
    async create(post) {
        await Post.create(post)
    }

    async getAll() {
        const posts = await Post.find()
        return posts
    }

    async getPostById(id) {
        if (!id) throw new Error('Id not written')
        const post = await Post.findById(id);
        return post
    }

    async update(post) {
        if (!post._id) throw new Error('Id not written')
        const updated = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updated
    }

    async delete(id) {
        if (!id) throw new Error('Id not written')
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}

export default new PostService();