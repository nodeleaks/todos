require('dotenv').config()
import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda'
import commonTypeDef from './src/commonTypeDef'
import * as task from './src/entities/task'
import {db} from './src/db/config/dbConnection'

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
  formatError: (err) => err,
  context: async ({ event, context }) => {

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      db
    }
  }

})

export const api = (event, context, callback) => {
  const handler = server.createHandler({
    cors: {
      origin: '*'
    }
  })

  return handler(event, context, callback)
}
