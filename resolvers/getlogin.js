const helper = require('../util/helper')

/**
 * Takes username and password and returns token
 * 
 * @param {string} username username of the user
 * @param {string} password password of the user
 * @returns {object} object with user's token
 */
const getlogin = async (username, password) => {
    try {

        if (!username || !password)
            throw new Error("Username and password required.")

        const accessToken = await helper.generateAccessToken(username)
        let resultObject = {
            token: accessToken
        }
        console.log("result: ", resultObject)
        return resultObject

    } catch (error) {
        console.log("Error: ", error)
        throw (error)
    }
}

exports.getlogin = getlogin