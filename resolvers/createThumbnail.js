const sharp = require('sharp');
const axios = require('axios')

/**
 * Takes public url and returns buffer of same image in 50x50 resolution
 * 
 * @param {string} url takes public url
 * @returns {Buffer} buffer of image 
 */
const createThumbnail = async (url) => {
    try {
        let image = await axios({ url: url, responseType: 'arraybuffer' })
        let imageBuffer = Buffer.from(image.data, 'binary')
        let thumbnailImage = await sharp(imageBuffer).resize(50, 50).toBuffer()
        let thumbnailBuffer = Buffer.from(thumbnailImage).toString('base64')
        let resultObject = {
            thumbnail: thumbnailBuffer
        }
        return resultObject
    } catch (error) {
        console.log("Error: ", error)
        throw (error)
    }
}

exports.createThumbnail = createThumbnail