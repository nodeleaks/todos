require('dotenv').config();
const { ApolloServer, makeExecutableSchema } = require('apollo-server-lambda');
const resolvers = require('./src/resolvers');
const typeDefs = require('./src/typeDefs');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
})

const server = new ApolloServer({
  schema,
  formatError: (err) => err,
  context: async({ event, context }) => {
    return {
      functionName: context.functionName,
      event,
      context,
    }
  }
  
})

module.exports.api = async (event, context) => {
  const handler = server.createHandler({
    cors: {
      origin: '*',
    }
  })

  return handler(event, context);
};
