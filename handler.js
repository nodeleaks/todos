import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import db from './src/db/models'

import commonTypeDef from './src/commonTypeDef'
import * as task from './src/entities/task'
require('dotenv').config()

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

export const apiES7 = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*'
    }
  })

  return handler(event, context, callback)
}
