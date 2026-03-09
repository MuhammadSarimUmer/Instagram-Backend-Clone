const postModel = require('../models/posts.model')
const uploadFile = require('../services/upload.service')



async function createPost(req, res) {
    try {

        const { caption } = req.body
        const buffer = req.file.buffer.toString("base64")
        const uploadedFile = await uploadFile(buffer)
        const user = req.user.id
        const post = await postModel.create({
            user,
            image: uploadedFile.url,
            caption
        })
        res.status(201).json({
            message: "Post Created",
            id: post._id,
            image: post.image,
            caption: post.caption,
            user: req.user.id
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Server DID NOT Create Post",
            error: err.message
        })
    }
}
async function toggleLikePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const isLiked = post.likes.includes(userId);
        let updatedPost;

        if (isLiked) {

            updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            );
        } else {

            updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: userId } },
                { new: true }
            );
        }

        res.status(200).json({
            message: isLiked ? "Unliked" : "Liked",
            likesCount: updatedPost.likes.length,
            isLiked: !isLiked
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find().populate('user', 'username email');
        res.status(200).json({
            message: "Posts",
            posts
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}
async function getPostById(req, res) {
    try {
        const postId = req.params.id;
        const post = await postModel.findById(postId).populate('user', 'username email');
        res.status(200).json({
            message: "Post",
            post
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

async function getPostByUser(req, res) {
    try {
        const userId = req.params.id;
        const posts = await postModel.find({ user: userId }).populate('user', 'username email');
        res.status(200).json({
            message: "Posts",
            posts
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id;


        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }


        if (post.user.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Unauthorized: You can only delete your own posts"
            });
        }


        await postModel.findByIdAndDelete(postId);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}

async function updatePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await postModel.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Unauthorized: You can only update your own posts"
            });
        }

        const { caption } = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { caption },
            { new: true }
        );

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

module.exports = { createPost, toggleLikePost, getAllPosts, getPostById, getPostByUser, deletePost, updatePost };
