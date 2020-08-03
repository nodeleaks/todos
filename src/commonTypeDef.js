import { gql } from 'apollo-server-lambda'

export const commonTypeDef = gql`

scalar DateTime

  type Query{
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`
