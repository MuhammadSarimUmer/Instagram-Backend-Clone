const userModel = require('../models/user.model');
const postModel = require('../models/posts.model');
async function followUser(req, res) {
    try {
        const targetUserId = req.params.id;
        const loggedInUserId = req.user.id;

        if (targetUserId === loggedInUserId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        await userModel.findByIdAndUpdate(loggedInUserId, { $addToSet: { following: targetUserId } });
        await userModel.findByIdAndUpdate(targetUserId, { $addToSet: { followers: loggedInUserId } });

        res.status(200).json({ message: "Followed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getProfile(req, res) {
    try {
        const username = req.params.username;
        const user = await userModel.findOne({ username })
            .select('-password')
            .populate('followers', 'username')
            .populate('following', 'username');

        if (!user) return res.status(404).json({ message: "User not found" });

        const posts = await postModel.find({ user: user._id }).sort({ createdAt: -1 });

        res.status(200).json({ user, posts, postsCount: posts.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAllUsersAdmin(req, res) {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function searchUsers(req, res) {
    try {
        const query = req.query.username;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }


        const users = await userModel.find({
            username: { $regex: query, $options: 'i' }
        }).select('username email role');

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    followUser,
    getProfile,
    getAllUsersAdmin,
    searchUsers
};