//helper file that returns SQL queries for CREATE TABLE

function createSurveyTable() {
    return "CREATE TABLE survey (surveyID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, question1 TEXT, question2 TEXT, question3 TEXT)"
}

function createSurveyResultTable() {
    return "CREATE TABLE survey_result (surveyResultID INTEGER PRIMARY KEY AUTOINCREMENT, surveyID INTEGER, answer1 TEXT, answer2 TEXT, answer3 TEXT)"
}

module.exports = {
    createSurveyTable,
    createSurveyResultTable
}