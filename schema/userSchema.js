const { gql } = require("apollo-server");
const userSchema = gql`
  # All About Users Inputs and Types
  input UserInput {
    fullName: String!
    email: String!
    telephone: String!
    password: String!
    role: String!
  }

  type UserToBeReturned {
    _id: ID
    fullName: String
    email: String
    telephone: String
    password: String
    role: String
    house_id: [MyHouseInputTobeReturned]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type populatedUserData {
    fullName: String
    password: String
    telephone: String
    email: String
    role: String
    _id: ID!
    house_id: [MyHouseInputTobeReturned]!
  }

  type Query {
    getAllUsers: [UserToBeReturned]
    getAllUserDetails: [populatedUserData!]
  }

  type Mutation {
    # All Mutation About SignUp
    signUp(input: UserInput): UserToBeReturned
    signIn(email: String!, password: String!): AuthData
    deleteUser(id: ID!): String
  }
`;
module.exports = userSchema;
