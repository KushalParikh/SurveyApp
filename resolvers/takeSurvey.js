const createTable = require("../util/createTable")
const dbConnection = require('../util/dbConnection')


/**
 * Takes survey ID and returns all surveys answers for given surveyID
 * 
 * @param {number} surveyID survey ID for query
 * @param {string} answer takes 3 answers for survey
 * @returns {object} object with response or error sent by query
 */
const takeSurvey = async (surveyID, answer1, answer2, answer3) => {
    try {
        let tableQuery = await dbConnection.get("SELECT name FROM sqlite_master WHERE type='table' AND name='survey_result'")
        if (tableQuery.result !== undefined) {
            let sql = "INSERT INTO survey_result (surveyID, answer1, answer2, answer3) VALUES (?, ?, ?, ?)"
            let insertQuery = await dbConnection.run(sql, [surveyID, answer1, answer2, answer3])
            console.log("query: ", insertQuery)
            return insertQuery
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

exports.takeSurvey = takeSurvey

