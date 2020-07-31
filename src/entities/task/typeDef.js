const { gql } = require('apollo-server-lambda');

const typeDef = gql`
  
  type Task {
    id: ID,
    summary: String,
    description: String,
    status: StatusEnum
    createdAt: String,
    updatedAt: String
  }

  enum StatusEnum {
    todo
    done
  }

  type Mutation {
    createTask (
      summary: String!,
      description: String,
      status: StatusEnum
    ): Task
  }

  type Query {
    tasks: [Task]
  }
  
`
module.exports = typeDef;
