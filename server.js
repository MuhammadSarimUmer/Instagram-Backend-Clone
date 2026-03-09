const app = require('./src/app')
const connectDB = require('./src/db/db')
require('dotenv').config()


const PORT = 3000
async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log('Server has started')
        })
    }
    catch (err) {
        console.log('Server DID NOT START DUE TO :', err)
    }
}
startServer()
