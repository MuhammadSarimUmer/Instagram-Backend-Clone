const commentModel = require('../models/comment.model');

async function createComment(req, res) {
    try {
        const { text } = req.body;
        const comment = await commentModel.create({
            text,
            user: req.user.id,
            post: req.params.id
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAllComments(req, res) {
    try {
        const comments = await commentModel.find({ post: req.params.id })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await commentModel.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await commentModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateComment(req, res) {
    try {
        const comment = await commentModel.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updated = await commentModel.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getCommentById(req, res) {
    try {
        const comment = await commentModel.findById(req.params.id)
            .populate('user', 'username')
            .populate('post', 'title');
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { createComment, getAllComments, getCommentById, deleteComment, updateComment };