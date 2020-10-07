// common SQL functions that takes queries, executes them and returns response or error

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./dbase/surveyDB.db');

function get(query) {
    return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
            if (err) {
                console.log("Error: ", err)
                resolve({ error: err, message: err.message, result: null })
                return
            }
            resolve({ error: null, message: "Query executed successfully.", result: row })
        })
    })
}

function all(query, values) {
    return new Promise((resolve, reject) => {
        db.all(query, [values], (err, rows) => {
            if (err) {
                console.log("Error: ", err)
                resolve({ error: err, message: err.message, result: null })
            }
            resolve({ error: null, message: "Query executed successfully.", result: rows })
        })

    })
}

function run(query, values) {
    return new Promise((resolve, reject) => {
        db.run(query, [...values], (err) => {
            if (err) {
                console.log("Error: ", err)
                resolve({ error: err, message: err.message, result: null })
                return
            }
            resolve({ error: null, message: "Query executed successfully." })
        })
    })
}

function create(query) {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.log("Error: ", err)
                resolve({ error: err, message: err.message, result: null })
                return
            }
            resolve({ error: null, message: "Table created successfully." })
        })
    })
}

module.exports = {
    get: get,
    run: run,
    create: create,
    all: all
}


