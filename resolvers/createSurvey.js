const createTable = require("../util/createTable")
const dbConnection = require('../util/dbConnection')


/**
 * Takes title and questions to create new survey
 * 
 * @param {string} title title for survey
 * @param {string} questions 3 questions for survey
 * @returns {object} response or error sent by create query
 */
const createSurvey = async (title, question1, question2, question3) => {
    try {
        let tableQuery = await dbConnection.get("SELECT name FROM sqlite_master WHERE type='table' AND name='survey'")
        if (tableQuery.result !== undefined) {
            let sql = "INSERT INTO survey (title, question1, question2, question3) VALUES (?, ?, ?, ?)"
            let insertQuery = await dbConnection.run(sql, [title, question1, question2, question3])
            console.log("query: ", insertQuery)
            return insertQuery
        } else {
            let dbTable = createTable.createSurveyTable()
            let dbTableQuery = await dbConnection.create(dbTable)
            return dbTableQuery
        }
    } catch (error) {
        console.log("Error: ", error)
        throw (error)
    }
}

exports.createSurvey = createSurvey


