const { gql } = require("apollo-server");

const userRequestSchema = gql`
  type Query {
    getAllUsersRequested: [userRequestToBeReturned]
    getOneUserRequest(id: ID): userRequestToBeReturned
    getAllUsersRequestedPopulated: [userRequestCreatedPopulated]
  }

  type Mutation {
    createUserRequest(input: UserRequestInput): userRequestToBeReturned
    deleteUserRequest(id: ID): String!
  }
  input UserRequestInput {
    fullName: String!
    email: String!
    message: String!
    telephone: String!
    house_id: [ID]
    user_id: [ID]
  }
  type userRequestToBeReturned {
    fullName: String
    email: String
    message: String
    telephone: String
    house_id: [ID]!
    user_id: [ID]!
    # house_id: [MyHouseInputTobeReturned]!
    # user_id: [UserToBeReturned]!
    _id: ID!
  }
  type userRequestCreatedPopulated {
    fullName: String
    email: String
    message: String
    telephone: String
    house_id: [MyHouseInputTobeReturned]
    user_id: [UserToBeReturned]
  }
`;

module.exports = userRequestSchema;
