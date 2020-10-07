const createTable = require("../util/createTable")
const dbConnection = require('../util/dbConnection')

/**
 * Takes survey ID and returns all surveys answers for given surveyID
 * 
 * @param {number} surveyID survey ID for query
 * @returns {object} object with all surveys with given surveyID
 */
const getSurveyResult = async (surveyID) => {
    try {

        let tableQuery = await dbConnection.get("SELECT name FROM sqlite_master WHERE type='table' AND name='survey_result'")
        if (tableQuery.result !== undefined) {
            let sql = "select * from survey_result where surveyID = ?"
            let surveyDetails = await dbConnection.all(sql, [surveyID])
            console.log("query: ", surveyDetails.result)
            return { surveyDetails: surveyDetails.result }
        } else {
            let dbTable = createTable.createSurveyResultTable()
            let dbTableQuery = await dbConnection.create(dbTable)
            return dbTableQuery
        }

    } catch (error) {
        console.log("Error: ", error)
        throw (error)
    }
}

exports.getSurveyResult = getSurveyResult