const ImageKit = require('@imagekit/nodejs')
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function uploadFiles(file) {

    const result = await imagekit.files.upload({
        file,
        fileName: "file_" + Date.now(),
        folder: "files/backend"
    })
    return result
}
module.exports = uploadFiles