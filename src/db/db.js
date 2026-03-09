const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('db has connected')
    }
    catch (err) {
        console.log('DB DID NOT CONNECT DUE TO :', err)
    }



}

module.exports = connectDB