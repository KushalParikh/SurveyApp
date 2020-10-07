const jwt = require('jsonwebtoken')

/**
 * Takes username and returns signed token
 * 
 * @param {string} username the username entered by user
 * @returns {string} jwt signed token
 */
function generateAccessToken(username) {
  return jwt.sign({
    data: username
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
}

/**
 * Takes username and returns signed token
 * 
 * @param {object} context 
 * @returns {object} user details
 */
async function authenticateToken(context) {
  try {
    const authHeader = context.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]
    const user_detail = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log('user: ', user_detail)
    return user_detail
  } catch (error) {
    console.log("error", error)
    return { message: error.message, code: error.code }
  }

}

module.exports = {
  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken
}
