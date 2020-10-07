const { getlogin } = require('./getlogin')
const { createThumbnail } = require('./createThumbnail')
const { getSurveyResult } = require('./getSurveyResult')
const { createSurvey } = require('./createSurvey')
const { takeSurvey } = require('./takeSurvey')

exports.resolvers = {
    getlogin,
    createThumbnail,
    getSurveyResult,
    createSurvey,
    takeSurvey
}