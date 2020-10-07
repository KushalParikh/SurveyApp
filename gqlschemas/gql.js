//GraphQL types file for schema

const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList
} = require('graphql')

let gql = {}
const resolvers = require('../resolvers')

gql['loginType'] = new GraphQLObjectType({
    name: 'loginType',
    description: 'Login Token Type',
    fields: () => ({
        token: { type: new GraphQLNonNull(GraphQLString) },
    })
})

gql['thumbnailType'] = new GraphQLObjectType({
    name: 'thumbnailType',
    description: 'Thumbnail Type',
    fields: () => ({
        thumbnail: { type: GraphQLNonNull(GraphQLString) }
    })
})

gql['surveyResultType'] = new GraphQLObjectType({
    name: 'surveyResultType',
    description: 'Survey Result Type',
    fields: () => ({
        surveyDetails: { type: new GraphQLList(gql['surveyType']) },
    })
})

gql['surveyType'] = new GraphQLObjectType({
    name: 'surveyType',
    description: 'Survey Type',
    fields: () => ({
        surveyID: { type: GraphQLID },
        title: { type: GraphQLString },
        question1: { type: GraphQLString },
        question2: { type: GraphQLString },
        question3: { type: GraphQLString },
        answer1: { type: GraphQLString },
        answer2: { type: GraphQLString },
        answer3: { type: GraphQLString },
        message: { type: GraphQLString }
    })
})

exports.gql = gql