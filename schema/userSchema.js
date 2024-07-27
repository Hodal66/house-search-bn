const { gql } = require("apollo-server");
const userSchema = gql`
  # All About Users Inputs and Types
  input UserInput {
    fullName: String!
    email: String!
    telephone: String!
    password: String!
  }

  type UserToBeReturned {
    id: ID
    fullName: String
    email: String
    telephone: String
    password: String
    house:[ID]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    signIn(email: String!, password: String!): AuthData
    getAllUsers:[UserToBeReturned]
  }

  type Mutation {
    # All Mutation About SignUp
    signUp(input: UserInput): UserToBeReturned
    deleteUser(id: ID!): String
  }
`;
module.exports = userSchema;
