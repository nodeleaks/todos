const { gql } = require('apollo-server-lambda')

const typeDef = gql`
  
  type Task {
    id: ID,
    summary: String,
    description: String,
    status: StatusEnum
    createdAt: DateTime,
    updatedAt: DateTime
  }

  enum StatusEnum {
    todo
    done
  }

  extend type Mutation {
    createTask (
      summary: String!,
      description: String,
      status: StatusEnum
    ): Task  

    updateTask (
      id: ID!,
      status: StatusEnum!
    ): Task

    deleteTask (
      id: ID!
    ): Boolean
  }

  extend type Query {
    tasks (limit: Int, offset: Int): [Task]
  }
  
`
module.exports = typeDef
