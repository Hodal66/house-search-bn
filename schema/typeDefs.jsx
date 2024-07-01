const { gql } = require('apollo-server');

const typeDefs = gql`
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

  type Query {
    getHouses: [House]
    getHouse(id: ID!): House
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
  }
`;

module.exports = typeDefs;
