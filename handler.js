require('dotenv').config()
const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda')
const db = require('./src/db/config/database')
const commonTypeDef = require('./src/commonTypeDef')
const task = require('./src/entities/task')

const schema = makeExecutableSchema({
  typeDefs: [
    commonTypeDef,
    task.typeDef
  ],
  resolvers: [
    task.resolvers
  ],
  resolverValidationOptions: { requireResolversForResolveType: false }
})

const server = new ApolloServer({
  schema,
  formatError: (err) => {
    let newError = null

    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      newError = {
        key: err.path,
        message: err.message
      }
    }

    return newError || err
  },
  context: async ({ event, context }) => {
    db.init()

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      db
    }
  }

})

module.exports.api = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*'
    }
  })

  return handler(event, context, callback)
}
