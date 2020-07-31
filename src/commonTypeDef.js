const { gql } = require('apollo-server-lambda')

const commonTypeDef = gql`

scalar DateTime

  type Query{
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

module.exports = commonTypeDef
