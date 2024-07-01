const { gql } = require('apollo-server');

const typeDefs = gql`

#All About House Content
  type House {
    id: ID!
    location: String
    status: String
    price: Float
    size: Float
    description: String
    image: String
    link: String
    numberOfBeds: Int
    images: [String]
  }
  type Message {
    id: ID!
    fullName: String!
    email: String!
    description: String!
    telephone: String!
  }

  type Query {
    getHouses: [House]
    getHouse(id: ID!): House
    getMessages: [Message]
    getMessage(id: ID!): Message
  }

  type Mutation {
    addHouse(
      location: String!,
      status: String!,
      price: Float!,
      size: Float!,
      description: String!,
      image: String!,
      link: String!,
      numberOfBeds: Int!,
      images: [String!]
    ): House

    updateHouse(
      id: ID!,
      location: String,
      status: String,
      price: Float,
      size: Float,
      description: String,
      image: String,
      link: String,
      numberOfBeds: Int,
      images: [String]
    ): House

    deleteHouse(id: ID!): String
    
#All about Message
    addMessage(
      fullName: String!,
      email: String!,
      description: String!,
      telephone: String!): Message

    updateMessage(
      id: ID!,
      fullName: String,
      email: String,
      description: String,
      telephone: String): Message

    deleteMessage(id: ID!): String
  }
`;

module.exports = typeDefs;
