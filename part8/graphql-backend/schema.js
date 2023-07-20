const typeDefs = `
type User {
  username: String!
  friends: [Person!]!
  id: ID!
}

type Token {
  value: String!
}

type Address {
  street: String!
  city: String!
}

enum YesNo {
  YES
  NO
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person]!
  findPerson(name: String!): Person
  me: User
}

type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
  
  addAsFriend(
    name: String!
  ): User

  editPhone(
    name: String!
    phone: String!
  ): Person

  createUser(
    username: String!
    favoriteGenre: String!
    ): User

  login(
    username: String!
    password: String!
  ): Token
}

type Subscription {
  personAdded: Person!
}
`
module.exports = typeDefs
