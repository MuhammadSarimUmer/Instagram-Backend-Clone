const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel