const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { schema } = require('./schema')
require("dotenv").config();
const app = express()
const { response } = require('express')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const rootValue = (request, response, graphQLParams) => {
    let headers = request.headers
    return { ip: request.ip, origin: headers.origin, response: response, graphQLParams: graphQLParams }
}

app.use('/', graphqlHTTP.graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    rootValue: rootValue(request, response, graphQLParams),
    graphiql: true,
    pretty: true
})))

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000!'))

exports.app = app


