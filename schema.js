const { gql } = require('./gqlschemas/gql')
const { resolvers } = require('./resolvers')
const helper = require('./util/helper')
const {
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLID
} = require('graphql')

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getlogin: {
            type: gql['loginType'],
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                return resolvers.getlogin(args.username, args.password)
            }
        },
        createThumbnail: {
            type: gql['thumbnailType'],
            args: {
                url: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (_, args) => {
                return resolvers.createThumbnail(args.url)
            }
        },
        getSurveyResult: {
            type: gql['surveyResultType'],
            args: {
                surveyID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (_, args, context) => {
                console.log("ctx: ", context.headers)
                const token = await helper.authenticateToken(context)
                if (token.data) {
                    return await resolvers.getSurveyResult(args.surveyID)
                }
                else {
                    throw new Error(token.message)
                }
            }
        }
    })
})

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createSurvey: {
            type: gql['surveyType'],
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                question1: { type: new GraphQLNonNull(GraphQLString) },
                question2: { type: new GraphQLNonNull(GraphQLString) },
                question3: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, args, context) => {
                console.log("ctx: ", context.headers)
                const token = await helper.authenticateToken(context)
                if (token.data) {
                    return resolvers.createSurvey(args.title, args.question1, args.question2, args.question3)
                }
                else {
                    throw new Error(token.message)
                }
            }
        },
        takeSurvey: {
            type: gql['surveyType'],
            args: {
                surveyID: { type: new GraphQLNonNull(GraphQLID) },
                answer1: { type: new GraphQLNonNull(GraphQLString) },
                answer2: { type: new GraphQLNonNull(GraphQLString) },
                answer3: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_, args, context) => {
                console.log("ctx: ", context.headers)
                const token = await helper.authenticateToken(context)
                if (token.data) {
                    let result = resolvers.takeSurvey(args.surveyID, args.answer1, args.answer2, args.answer3)
                    return result
                }
                else {
                    throw new Error(token.message)
                }
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
})

exports.schema = schema
