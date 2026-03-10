const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Admin Only" });
    next();
};

router.get('/:username', authMiddleware, userController.getProfile);
router.post('/follow/:id', authMiddleware, userController.followUser);
router.get('/all', authMiddleware, adminMiddleware, userController.getAllUsersAdmin);
router.get('/search', authMiddleware, userController.searchUsers);

module.exports = router;